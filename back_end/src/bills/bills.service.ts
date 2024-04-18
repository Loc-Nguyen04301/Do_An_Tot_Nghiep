import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update-bill.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

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
}
