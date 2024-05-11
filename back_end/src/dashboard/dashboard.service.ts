import { Injectable } from '@nestjs/common';
import { CreateDashboardDto } from './dto/create-dashboard.dto';
import { UpdateDashboardDto } from './dto/update-dashboard.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Item } from '@prisma/client';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) { }

  async countDashboard() {
    const listBill = await this.prisma.bill.findMany()
    const revenueCount = listBill.reduce((total, bill) => { return total + bill.total_amount }, 0)
    const [billCount, productCount, userCount] = await Promise.all([
      this.prisma.bill.count(),
      this.prisma.product.count(),
      this.prisma.user.count()
    ]);

    return { billCount, productCount, userCount, revenueCount }
  }

  async listProductSoldOut() {
    let listProductSoldOut = await this.prisma.$queryRaw`
     SELECT
        p.id,
        p.name,
        p.brand,
        p.new_price,
        p.image,
        SUM(i.quantity) AS total_quantity_sold
    FROM
        "Product"  p
    JOIN
        "Item" i ON p.id = i.product_id
    GROUP BY
        p.id
    ORDER BY total_quantity_sold desc;
  ` as any

    listProductSoldOut = listProductSoldOut.map((product: any) => ({
      ...product,
      total_quantity_sold: Number(product.total_quantity_sold),
    }));

    return { listProductSoldOut }
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
