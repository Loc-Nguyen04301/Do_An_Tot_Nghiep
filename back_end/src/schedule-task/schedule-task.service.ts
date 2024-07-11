import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from 'src/prisma/prisma.service';
import { format } from 'date-fns';
import { OrderStatus, Transaction } from '@prisma/client';

const fromDate = format(new Date(), 'yyyy-MM-dd')

@Injectable()
export class ScheduleTaskService {
    constructor(private prisma: PrismaService) { }

    @Cron(CronExpression.EVERY_5_MINUTES)
    async getTransactions() {
        try {
            console.log("START FETCHING TRANSACTIONS EVERY_5_MINUTES")
            // get latest 100 transactions
            const res = await axios({
                headers: { "Authorization": `${process.env.CASSO_API_KEY}` },
                method: 'GET',
                url: `${process.env.CASSO_TRANSACTION_URL}`,
                params: {
                    "sort": "DESC",
                    "page": 1,
                    "pageSize": 100,
                    "fromDate": fromDate
                }
            })

            // save transaction in database
            const transactions = res.data.data.records

            await Promise.all(
                transactions.map(async (transaction: Transaction) => {
                    await this.prisma.transaction.upsert({
                        where: { id: transaction.id },
                        update: {},
                        create: {
                            id: transaction.id,
                            description: transaction.description,
                            amount: transaction.amount,
                            when: new Date(transaction.when)
                        },
                    })
                })
            )
            console.log("SUCCESS FETCHING DATA FROM API CASSO")
        } catch (error) {
            console.error('ERROR FETCHING DATA FROM API CASSO', error);
        }
    }

    @Cron(CronExpression.EVERY_5_MINUTES)
    async updateStatusPaymentBill() {
        try {
            console.log("START UPDATE PAYMENT STATUS EVERY_5_MINUTES")
            const today = new Date();
            const startOfDay = new Date(today.setHours(0, 0, 0, 0));
            const endOfDay = new Date(today.setHours(23, 59, 59, 999));

            const need_checking_bill_list = await this.prisma.bill.findMany({
                where: {
                    payment_status: false,
                    order_status: OrderStatus.PROCESSING,
                    created_at: {
                        gte: startOfDay,
                        lt: endOfDay,
                    },
                }
            })
            const need_checking_transaction_list = await this.prisma.transaction.findMany({
                where: {
                    when: {
                        gte: startOfDay,
                        lt: endOfDay,
                    },
                }
            })

            await Promise.all(need_checking_bill_list.map(async (bill) => {
                for (const transaction of need_checking_transaction_list) {
                    if (transaction.description.includes(String(bill.id))) {
                        await this.prisma.bill.update({
                            where: {
                                id: bill.id
                            },
                            data: {
                                payment_status: true
                            }
                        })
                        break;
                    }
                }
            }))
        } catch (error) {
            console.error('ERROR UPDATE PAYMENT STATUS ', error);
        }
    }
}