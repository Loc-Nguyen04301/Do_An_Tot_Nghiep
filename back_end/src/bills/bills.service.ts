import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update-bill.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Item } from './entities/item.entity';

@Injectable()
export class BillsService {
  constructor(private prisma: PrismaService) { }

  async create(createBillDto: CreateBillDto) {
    var bill: any;
    const { address, customer_name, email, note, phone_number, user_id, shortCartItems } = createBillDto

    if (user_id) {
      bill = await this.prisma.bill.create({ data: { address, customer_name, email, phone_number, note, user_id } })
    }

    const shortCartItemsData = shortCartItems.map((item => { return { bill_id: bill.id, product_id: item.product_id, quantity: item.quantity } }))
    shortCartItemsData.forEach(async (cartItem) => {
      const product = await this.prisma.product.findUnique({
        where: { id: cartItem.product_id },
      });
      if (product) {
        const newAvailable = product.available - cartItem.quantity;
        await this.prisma.product.update({ where: { id: cartItem.product_id }, data: { available: newAvailable } })
      }
    })

    return { bill: { ...bill, shortCartItemsData } }
  }
}
