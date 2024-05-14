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
    const { address, customer_name, email, note, phone_number, user_id, payment_method, total_amount, shortCartItems, order_status, payment_status } = createBillDto
    const billData = { customer_name, address, phone_number, email, note, user_id, payment_method, order_status, payment_status, total_amount }

    // check available item in database
    await Promise.all(shortCartItems.map(async (cartItem) => {
      const product = await this.prisma.product.findUnique({
        where: { id: cartItem.product_id },
      });
      if (product.available < cartItem.quantity) throw new BadRequestException(`Số lượng ${product.name} không đủ`)
    }))

    const bill = await this.prisma.$transaction(async (tr) => {
      // create bill
      const bill = await tr.bill.create({ data: billData })
      if (!bill) throw new BadRequestException('Không tạo được đơn hàng');

      const shortCartItemsData = shortCartItems.map((item => { return { bill_id: bill.id, product_id: item.product_id, quantity: item.quantity, total_price: item.total_price } }))
      await Promise.all(shortCartItemsData.map(async (cartItem) => {
        // create each item in bill
        const item = await tr.item.create({ data: cartItem })
        if (!item) throw new BadRequestException('Không tạo được sản phẩm trong đơn hàng');
        const product = await tr.product.findUnique({
          where: { id: cartItem.product_id },
        });
        if (product) {
          const newAvailable = product.available - cartItem.quantity;
          await tr.product.update({ where: { id: cartItem.product_id }, data: { available: newAvailable } })
        }
      }))

      return bill
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
              quantity: true,
              total_price: true
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
    payment_status = payment_status
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
    if (typeof (payment_status) === 'boolean') {
      whereClause = { ...whereClause, payment_status };
    }
    if (return_status) {
      whereClause = { ...whereClause, return_status };
    }

    const filtersDate: any[] = []
    // const notUndefined = 1
    // const fromDate = notUndefined ? new Date('2024-05-03 00:00:00') : undefined;
    // const toDate = notUndefined ? new Date('2024-05-08 23:59:59') : undefined;
    // if (fromDate) {
    //   filtersDate.push({ created_at: { gte: fromDate } });
    // }
    // if (toDate) {
    //   filtersDate.push({ created_at: { lte: toDate } });
    // }
    // console.log(filtersDate)

    const [bills, records] = await Promise.all([
      this.prisma.bill.findMany({
        where: {
          ...whereClause,
          AND: filtersDate,
        },
        include: {
          items: {
            select: {
              product: { select: { name: true, new_price: true, old_price: true, image: true } },
              quantity: true,
              total_price: true
            }
          }
        },
        orderBy: {
          created_at: "desc"
        },
        skip,
        take,
      }),
      this.prisma.bill.count({
        where: {
          ...whereClause,
          AND: filtersDate
        },
      })
    ]);

    const total_pages = Math.ceil(records / page_size);

    return { bills: bills, metadata: { page_index, page_size, total_pages, records } }
  }
}
