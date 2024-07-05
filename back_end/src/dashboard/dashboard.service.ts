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
    const [billCount, productCount, userCount, itemCount, reviewCount] = await Promise.all([
      this.prisma.bill.count(),
      this.prisma.product.count(),
      this.prisma.user.count(),
      this.prisma.item.count(),
      this.prisma.review.count()
    ]);

    return { billCount, productCount, userCount, reviewCount, itemCount, revenueCount }
  }

  async listProductSoldOut() {
    let listProductSoldOut = await this.prisma.$queryRaw`
     SELECT
        p.id,
        p.name,
        p.brand,
        p.old_price,
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

    return listProductSoldOut
  }

  async getRevenue(year: number) {
    const startDate = new Date(`${year}-01-01T00:00:00.000Z`);
    const endDate = new Date(`${year + 1}-01-01T00:00:00.000Z`);

    const bills = await this.prisma.bill.findMany({
      where: {
        created_at: {
          gte: startDate,
          lt: endDate,
        },
      },
    })

    const groupedBillsByMonth = Array.from({ length: 12 }, (_, index) => {
      const month = index + 1
      const billsByMonth = bills.filter(bill => new Date(bill.created_at).getMonth() === index)
      const record = billsByMonth.length
      const revenue = billsByMonth.reduce((sum, bill) => sum + bill.total_amount, 0)
      return { month, record, revenue }
    });

    const recordArray = groupedBillsByMonth.map((item) => item.record)
    const revenueArray = groupedBillsByMonth.map((item) => item.revenue)

    const totalRecords = bills.length
    const totalRevenue = bills.reduce((sum, bill) => sum + bill.total_amount, 0)

    return { groupedBillsByMonth, recordArray, revenueArray, totalRecords, totalRevenue }
  }
}
