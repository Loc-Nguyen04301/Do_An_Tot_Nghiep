import { Injectable } from '@nestjs/common';
import { CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update-bill.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BillsService {
  constructor(private prisma: PrismaService) { }

  async create(createBillDto: CreateBillDto) {
    const { address, customer_name, email, note, phone_number } = createBillDto
    const bill = await this.prisma.bill.create({ data: { address, customer_name, email, phone_number, note } })
    return bill
  }

}
