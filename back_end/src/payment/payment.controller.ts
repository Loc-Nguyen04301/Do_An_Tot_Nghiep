import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { Response } from 'express';
import { stringify } from 'qs';
import { createHmac } from 'crypto';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { Public } from 'src/common/decorators';

@Controller('api/v1/payment')
export class PaymentController {

    @Public()
    @Post('create_payment_url')
    createPayment(@Req() req: Request, @Res() res: Response, @Body() data: CreatePaymentDto) {
        const ipAddr = req.headers['x-forwarded-for']
        const tmnCode = 'SF01IC83';
        const secureHash = 'VWIZWAGNZBILVBUJNQJDFPLDHSUSUFYA';
        let vnpUrl = 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html';
        const now = new Date();
        var amount = data.amount;
        var bankCode = data.bankCode;

        const vnpParams: any = {};
        vnpParams['vnp_Version'] = '2.1.0';
        vnpParams['vnp_Command'] = 'pay';
        vnpParams['vnp_TmnCode'] = tmnCode;
        vnpParams['vnp_Amount'] = amount * 100;
        vnpParams['vnp_BankCode'] = bankCode;
        vnpParams['vnp_CreateDate'] = '20240429180200';
        vnpParams['vnp_CurrCode'] = 'VND';
        vnpParams['vnp_IpAddr'] = ipAddr;
        vnpParams['vnp_Locale'] = 'vn';
        vnpParams['vnp_OrderInfo'] = "Thanhtoandonhang";
        vnpParams['vnp_OrderType'] = "other";
        vnpParams['vnp_ReturnUrl'] = "https://localhost:3000";
        vnpParams['vnp_ExpireDate'] = "20240429181200";
        vnpParams['vnp_TxnRef'] = "1";
        vnpParams['vnp_SecureHash'] = secureHash;

        vnpUrl += '?' + stringify(vnpParams, { encode: false });
        console.log(vnpUrl)
        res.redirect(vnpUrl)
    }
}
