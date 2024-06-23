import { BadRequestException, ForbiddenException, Injectable, Req } from '@nestjs/common';
import { CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update-bill.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { ReturnStatus } from '@prisma/client';
import { BillParams } from 'src/types';
import { AppGateway } from 'src/app.gateway';
import { MailService } from '../mail/mail.service';

const saltOrRounds = 10;
@Injectable()
export class BillsService {
  constructor(private prisma: PrismaService, private appGateway: AppGateway, private mailService: MailService) { }

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
      // update notification bill state
      if (bill.id) await tr.notifiBill.create({ data: { bill_id: bill.id } })
      // phát thông điệp đến client 
      await this.appGateway.sendBillNotification(bill)

      const shortCartItemsData = shortCartItems.map((item => { return { bill_id: bill.id, product_id: item.product_id, quantity: item.quantity, total_price: item.total_price } }))
      await Promise.all(shortCartItemsData.map(async (cartItem) => {
        // create each item in bill
        const item = await tr.item.create({ data: cartItem })
        if (!item) throw new BadRequestException('Không tạo được sản phẩm trong đơn hàng');
        const product = await tr.product.findUnique({
          where: { id: cartItem.product_id },
        });
        if (product) {
          await tr.product.update({ where: { id: cartItem.product_id }, data: { available: { decrement: cartItem.quantity } } })
        }
        else {
          throw new BadRequestException('Không tìm thấy sản phẩm này trong hệ thống');
        }
      }))

      return bill
    })

    if (bill) await this.mailService.sendMailCreateBill({
      bill_id: bill.id,
      subject: `Xác nhận đơn hàng #${bill.id} từ THOL`,
      to: bill.email,
      customer_name: bill.customer_name
    })
    return { billId: bill.id }
  }

  async update(updateBillDto: UpdateBillDto, id: number) {
    const bill = await this.prisma.bill.update({
      where: { id: id },
      data: {
        ...updateBillDto
      }
    })

    if (updateBillDto.reason_cancelled) { 
      // const updateReasonBill = await this.prisma.
    }

    return bill
  }

  async findOne(id: number) {
    const bill = await this.prisma.bill.findUnique(
      {
        where: { id: id },
        include: {
          items: {
            select: {
              product: { select: { name: true, new_price: true, old_price: true, image: true } },
              quantity: true,
              total_price: true
            }
          },
          user: {
            select: {
              username: true,
              phone_number: true,
              email: true
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
    page_size,
    from_date,
    to_date
  }: BillParams) {
    page_index = page_index || 0;
    page_size = page_size || 5;
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
    if (from_date && to_date) {
      whereClause = {
        ...whereClause,
        created_at: {
          gte: from_date,
          lte: to_date
        }
      };
    } else if (from_date) {
      whereClause = {
        ...whereClause,
        created_at: {
          gte: from_date
        }
      };
    } else if (to_date) {
      whereClause = {
        ...whereClause,
        created_at: {
          lte: to_date
        }
      };
    }

    const records = await this.prisma.bill.count({
      where: {
        ...whereClause,
      },
      orderBy: {
        created_at: "desc"
      },
    })

    const bills = await this.prisma.bill.findMany({
      where: {
        ...whereClause,
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
    })

    const total_pages = Math.ceil(records / page_size);

    return { bills: bills, metadata: { page_index, page_size, total_pages, records } }
  }

  async findAllAdmin({
    customer_name,
    address,
    phone_number,
    order_status,
    payment_status,
    return_status,
    from_date,
    to_date
  }: BillParams) {
    customer_name = customer_name || null
    address = address || null
    phone_number = phone_number || null
    order_status = order_status || null
    payment_status = payment_status
    return_status = return_status || ReturnStatus.NONE
    if (isNaN(from_date.getTime())) from_date = null
    if (isNaN(to_date.getTime())) to_date = null

    let whereClause = {}
    if (customer_name) {
      whereClause = {
        ...whereClause, customer_name: {
          contains: customer_name,
          mode: "insensitive"
        }
      };
    }
    if (address) {
      whereClause = {
        ...whereClause, address: {
          contains: address,
          mode: "insensitive"
        }
      };
    }
    if (phone_number) {
      whereClause = {
        ...whereClause, phone_number: {
          contains: phone_number,
          mode: "insensitive"
        }
      };
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
    if (from_date && to_date) {
      whereClause = {
        ...whereClause,
        created_at: {
          gte: from_date,
          lte: to_date
        }
      };
    } else if (from_date) {
      whereClause = {
        ...whereClause,
        created_at: {
          gte: from_date
        }
      };
    } else if (to_date) {
      whereClause = {
        ...whereClause,
        created_at: {
          lte: to_date
        }
      };
    }

    const bills = await this.prisma.bill.findMany({
      where: {
        ...whereClause,
      },
      orderBy: {
        created_at: "desc"
      },
    })

    return { bills, total: bills.length }
  }

  async findAllNotification() {
    let bills: any[] = [];
    bills = await this.prisma.notifiBill.findMany({
      select: {
        bill: {
          select: {
            id: true,
            user_id: true,
            customer_name: true,
            created_at: true
          }
        },
        is_read: true
      },
      orderBy: {
        bill: {
          created_at: "desc"
        }
      }
    })

    const unread_records = await this.prisma.notifiBill.count({ where: { is_read: false } })

    bills = bills.map(({ bill, is_read }) => ({
      ...bill,
      is_read
    }));
    return { bills, unread_records }
  }

  async isReadBill(billId: number) {
    await this.prisma.notifiBill.update({
      where: {
        bill_id: billId
      },
      data: {
        is_read: true
      }
    })

    return
  }
}
