import { BadRequestException, ForbiddenException, Injectable, Req } from '@nestjs/common';
import { CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update-bill.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { Bill, ReturnStatus } from '@prisma/client';
import { BillParams } from 'src/types';

const saltOrRounds = 10;
@Injectable()
export class BillsService {
  constructor(private prisma: PrismaService) { }

  hashData(data: string) {
    return bcrypt.hash(data, saltOrRounds);
  }

  async create(createBillDto: CreateBillDto) {
    const { address, customer_name, email, note, phone_number, user_id, payment_method, shortCartItems } = createBillDto

    const data: any = { customer_name, address, phone_number, email, payment_method, note }
    if (user_id !== null && user_id !== undefined) {
      data.user_id = user_id;
    }
    const bill = await this.prisma.bill.create({ data: data })
    if (!bill) throw new BadRequestException('Can not create a bill');

    const shortCartItemsData = shortCartItems.map((item => { return { bill_id: bill.id, product_id: item.product_id, quantity: item.quantity } }))
    shortCartItemsData.forEach(async (cartItem) => {
      const item = await this.prisma.item.create({ data: cartItem })
      if (!item) throw new BadRequestException('Can not create a item');
      const product = await this.prisma.product.findUnique({
        where: { id: cartItem.product_id },
      });
      if (product) {
        const newAvailable = product.available - cartItem.quantity;
        await this.prisma.product.update({ where: { id: cartItem.product_id }, data: { available: newAvailable } })
      }
    })

    return { billId: bill.id }
  }

  async findOne(id: number) {
    const bill = await this.prisma.bill.findUnique(
      {
        where: { id: id },
        include: {
          items: {
            select: {
              product: { select: { name: true, new_price: true } },
              quantity: true
            }
          }
        }
      })
    return bill
  }

  async findAll({
    user_id,
    order_status,
    payment_status,
    return_status,
    page_index,
    page_size
  }: BillParams) {
    user_id = user_id || null
    page_index = page_index || 0;
    page_size = page_size || 5;
    order_status = order_status || null
    payment_status = payment_status || null
    return_status = return_status || ReturnStatus.NONE

    const take = page_size as number
    const skip = page_index * page_size as number

    let whereClause = {}
    if (user_id) {
      whereClause = { ...whereClause, user_id };
    }
    if (order_status) {
      whereClause = { ...whereClause, order_status };
    }
    if (payment_status) {
      whereClause = { ...whereClause, payment_status };
    }
    if (return_status) {
      whereClause = { ...whereClause, return_status };
    }

    const [bills, records] = await Promise.all([
      this.prisma.bill.findMany({
        where: {
          ...whereClause
        },
        skip,
        take,
      }),
      this.prisma.bill.count({
        where: whereClause
      })
    ]);

    const total_pages = Math.ceil(records / page_size);

    return { bills: bills, metadata: { page_index, page_size, total_pages, records } }
  }
}
