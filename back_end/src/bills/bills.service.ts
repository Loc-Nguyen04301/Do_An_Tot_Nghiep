import { BadRequestException, ForbiddenException, Injectable, Req } from '@nestjs/common';
import { CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update-bill.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { OrderStatus } from '@prisma/client';
import { BillParams } from 'src/types';
import { AppGateway } from 'src/app.gateway';
import { MailService } from '../mail/mail.service';
import { CreateBillShippingDto } from 'src/bills/dto/create-shipping.dto';

const saltOrRounds = 10;
@Injectable()
export class BillsService {
  constructor(private prisma: PrismaService,
    private appGateway: AppGateway,
    private mailService: MailService) { }

  hashData(data: string) {
    return bcrypt.hash(data, saltOrRounds);
  }

  async create(createBillDto: CreateBillDto) {
    const { address, customer_name, email, note, phone_number, user_id, payment_method, total_amount, shortCartItems, order_status, payment_status } = createBillDto
    const billData = { customer_name, address, phone_number, email, note, user_id, payment_method, order_status, payment_status, total_amount }

    // check available product
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
      const shortCartItemsData = shortCartItems.map((item => {
        return {
          bill_id: bill.id,
          product_id: item.product_id,
          price: item.price,
          quantity: item.quantity,
          total_price: item.total_price
        }
      }))
      // create each item in bill
      await Promise.all(shortCartItemsData.map(async (cartItem) => {
        const item = await tr.item.create({ data: cartItem })
        if (!item) throw new BadRequestException('Không lưu được sản phẩm trong đơn hàng');
        const updateAvailableProduct = await tr.product.update({
          where: { id: cartItem.product_id },
          data: {
            available: { decrement: cartItem.quantity }
          }
        })
        if (!updateAvailableProduct) throw new BadRequestException('Không cập nhật được số lượng tồn kho của sản phẩm');
      }))

      return bill
    })

    if (bill) {
      // create notification bill
      await this.prisma.notifiBill.create({ data: { bill_id: bill.id } })

      // emit real-time message to client 
      this.appGateway.sendBillNotification(bill)
      const billCount = await this.prisma.bill.count()
      this.appGateway.updateBillCount(billCount)

      // send information of success order to gmail 
      await this.mailService.sendMailCreateBill({
        bill_id: bill.id,
        subject: `Xác nhận đơn hàng #${bill.id} từ THOL`,
        to: bill.email,
        customer_name: bill.customer_name
      })
    }

    return { billId: bill.id }
  }

  async update(updateBillDto: UpdateBillDto, id: number) {
    const { reason_cancelled, ...restUpdateBillDto } = updateBillDto
    const bill = await this.prisma.bill.update({
      where: { id: id },
      data: {
        ...restUpdateBillDto,
      }
    })

    // create or update reason for cancelled bill
    if (reason_cancelled && restUpdateBillDto.order_status === OrderStatus.CANCELLED) {
      const updateReasonBill = await this.prisma.reasonCancelledBill.upsert({
        where: {
          bill_id: bill.id
        },
        update: {
          reason_cancelled
        },
        create: {
          bill_id: bill.id,
          reason_cancelled
        }
      })
      if (!updateReasonBill) throw new BadRequestException('Không cập nhật được lý do hủy đơn hàng');

      // send information of cancelled order to gmail 
      await this.mailService.sendMailRejectBill({
        bill_id: bill.id,
        customer_name: bill.customer_name,
        subject: `Xác nhận hủy đơn hàng #${bill.id} từ THOL`,
        to: bill.email,
        reason: reason_cancelled
      })
    }
    // delete reason for cancelled bill
    else {
      const updateReasonBill = await this.prisma.reasonCancelledBill.delete({
        where: {
          bill_id: bill.id
        }
      })
      if (!updateReasonBill) throw new BadRequestException('Không xóa được lý do hủy đơn');
    }

    return bill
  }

  async getBillDetailById(id: number) {
    const bill = await this.prisma.bill.findUnique(
      {
        where: { id: id },
        include: {
          items: {
            select: {
              product: { select: { name: true, image: true } },
              quantity: true,
              price: true,
              total_price: true
            }
          },
          user: {
            select: {
              username: true,
              phone_number: true,
              email: true
            }
          },
          ReasonCancelledBill: {
            select: {
              reason_cancelled: true
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
    page_index,
    page_size,
    from_date,
    to_date
  }: BillParams) {
    page_index = page_index || 0;
    page_size = page_size || 5;

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
    from_date,
    to_date
  }: BillParams) {
    customer_name = customer_name || null
    address = address || null
    phone_number = phone_number || null
    order_status = order_status || null
    payment_status = payment_status
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

    const revenue = bills.reduce((sum, bill) => sum + bill.total_amount, 0)

    return { bills, total: bills.length, revenue }
  }

  async findAllNotification() {
    let billNotis: any[] = [];
    billNotis = await this.prisma.notifiBill.findMany({
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

    billNotis = billNotis.map(({ bill, is_read }) => ({
      ...bill,
      is_read
    }));
    return { billNotis, unread_records }
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

  async getShipping(id: number) {
    const shippingBill = await this.prisma.shippingBill.findUnique({
      where: {
        bill_id: id
      }
    })

    if (!shippingBill) throw new BadRequestException('Không lấy được thông tin đơn giao hàng')
    return shippingBill
  }

  async createShipping(createBillShippingDto: CreateBillShippingDto) {
    const { bill_id, ghn_order_code } = createBillShippingDto
    const shippingBill = await this.prisma.shippingBill.upsert({
      where: { bill_id },
      create: {
        bill_id,
        ghn_order_code,
        shipping_status: "READY_TO_PICK"
      },
      update: {
        ghn_order_code,
        shipping_status: "READY_TO_PICK"
      }
    });

    if (!shippingBill) throw new BadRequestException('Không lưu được thông tin đơn giao hàng')
    return shippingBill
  }

  async cancelShipping(cancelBillShippingDto: { order_codes: string }) {
    const cancelBill = await this.prisma.shippingBill.update({
      where: {
        ghn_order_code: cancelBillShippingDto.order_codes
      },
      data: {
        shipping_status: 'CANCEL'
      }
    });

    if (!cancelBill) throw new BadRequestException('Không cập nhật được thông tin đơn giao hàng')
    return cancelBill
  }
}
