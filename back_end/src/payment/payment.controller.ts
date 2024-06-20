import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Res, UseInterceptors } from '@nestjs/common';
import { Response } from 'express';
import { createHmac } from 'crypto';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { Public } from 'src/common/decorators';
import { format } from 'date-fns'
import { resolveUrlString } from 'src/utils';

@Controller('api/v1/payment')
export class PaymentController {

    @Public()
    @Post('create_payment_url')
    @HttpCode(HttpStatus.OK)
    createPayment(@Req() req: Request, @Res() res: Response, @Body() data: CreatePaymentDto) {
        let tmnCode = process.env.TMN_CODE;
        let secretKey = process.env.SECRET_KEY
        let vnpUrl = 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html';
        let returnUrl = `${process.env.FRONT_END_URL}/order-complete`
        let now = new Date();

        let DATETIME_FORMAT = 'yyyyMMddHHmmss'
        let createDate = format(now, DATETIME_FORMAT)
        let orderId = format(now, 'HHmmss')

        let amount = data.amount;
        let bankCode = data.bankCode
        let orderInfo = data.orderInfo

        let vnpParams: any = {};
        vnpParams['vnp_Version'] = '2.1.0';
        vnpParams['vnp_Command'] = 'pay';
        vnpParams['vnp_TmnCode'] = tmnCode;
        vnpParams['vnp_Amount'] = amount * 100;
        vnpParams['vnp_BankCode'] = bankCode;
        vnpParams['vnp_CreateDate'] = createDate
        vnpParams['vnp_CurrCode'] = 'VND';
        vnpParams['vnp_IpAddr'] = '127.0.0.1';
        vnpParams['vnp_Locale'] = 'vn';
        vnpParams['vnp_OrderInfo'] = orderInfo;
        vnpParams['vnp_OrderType'] = "other";
        vnpParams['vnp_ReturnUrl'] = returnUrl;
        vnpParams['vnp_TxnRef'] = orderId;

        const redirectUrl = new URL(
            resolveUrlString(
                'https://sandbox.vnpayment.vn',
                'paymentv2/vpcpay.html',
            ),
        );

        Object.entries(vnpParams)
            .sort(([key1], [key2]) => key1.toString().localeCompare(key2.toString()))
            .forEach(([key, value]) => {
                if (!value || value === '' || value === undefined || value === null) {
                    return;
                }

                redirectUrl.searchParams.append(key, value.toString());
            });

        let signed = createHmac("SHA512", secretKey).update(Buffer.from(redirectUrl.search.slice(1).toString(), 'utf-8')).digest('hex');
        redirectUrl.searchParams.append('vnp_SecureHash', signed);

        vnpUrl = redirectUrl.toString()
        res.json({
            vnpUrl
        })
    }
}
