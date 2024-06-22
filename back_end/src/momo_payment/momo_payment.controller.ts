import { Body, Controller, HttpCode, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { Public } from 'src/common/decorators';
import { config } from 'src/momo_payment/config';
import { createHmac } from 'crypto';
import axios, { AxiosRequestConfig } from 'axios';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { format } from 'date-fns';
import { Response } from 'express';

@Controller('api/v1/momo-payment')
export class MomoPaymentController {
    @Public()
    @Post('payment')
    @HttpCode(HttpStatus.OK)
    async createPayment(@Req() req: Request, @Res() res: Response, @Body() data: CreatePaymentDto) {
        let {
            accessKey,
            secretKey,
            partnerCode,
            redirectUrl,
            ipnUrl,
            requestType,
            extraData,
            orderGroupId,
            autoCapture,
            lang
        } = config

        const { amount, orderInfo } = data
        var now = new Date();
        var orderId = format(now, 'HHmmss')
        var requestId = orderId;

        var rawSignature =
            'accessKey=' +
            accessKey +
            '&amount=' +
            amount +
            '&extraData=' +
            extraData +
            '&ipnUrl=' +
            ipnUrl +
            '&orderId=' +
            orderId +
            '&orderInfo=' +
            orderInfo +
            '&partnerCode=' +
            partnerCode +
            '&redirectUrl=' +
            redirectUrl +
            '&requestId=' +
            requestId +
            '&requestType=' +
            requestType;

        var signature = createHmac('sha256', secretKey).update(rawSignature).digest('hex')

        const requestBody = JSON.stringify({
            partnerCode: partnerCode,
            partnerName: 'Test',
            storeId: 'MomoTestStore',
            requestId: requestId,
            amount: amount,
            orderId: orderId,
            orderInfo: orderInfo,
            redirectUrl: redirectUrl,
            ipnUrl: ipnUrl,
            lang: lang,
            requestType: requestType,
            autoCapture: autoCapture,
            extraData: extraData,
            orderGroupId: orderGroupId,
            signature: signature,
        });

        const options: AxiosRequestConfig = {
            method: 'POST',
            url: 'https://test-payment.momo.vn/v2/gateway/api/create',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(requestBody),
            },
            data: requestBody,
        };

        try {
            const response = await axios(options)
            const payUrl: string = response.data.payUrl
            res.status(200).json({ payUrl })
        } catch (error) {
            res.status(500).json({ error })
        }
    }
}
