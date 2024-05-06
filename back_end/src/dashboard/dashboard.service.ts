import { Injectable } from '@nestjs/common';
import { CreateDashboardDto } from './dto/create-dashboard.dto';
import { UpdateDashboardDto } from './dto/update-dashboard.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Item } from '@prisma/client';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) { }

  async countDashboard() {
    const listItem = await this.prisma.item.findMany()
    let revenueCount = 0

    for (const item of listItem) {
      const product = await this.prisma.product.findUnique({ where: { id: item.product_id } });
      const subtotal = item.quantity * product.new_price;
      revenueCount += subtotal;
    }

    const [billCount, productCount, userCount] = await Promise.all([
      this.prisma.bill.count(),
      this.prisma.product.count(),
      this.prisma.user.count()
    ]);
    return { billCount, productCount, userCount, revenueCount }
  }

  // create(createDashboardDto: CreateDashboardDto) {
  //   return 'This action adds a new dashboard';
  // }

  // findAll() {
  //   return `This action returns all dashboard`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} dashboard`;
  // }

  // update(id: number, updateDashboardDto: UpdateDashboardDto) {
  //   return `This action updates a #${id} dashboard`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} dashboard`;
  // }
}
