import { Body, Controller, HttpCode, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { Public } from 'src/common/decorators';
import { config } from 'src/momo_payment/config';
import { createHmac } from 'crypto';
import axios, { AxiosRequestConfig } from 'axios';
import { CreatePaymentDto } from './dto/create-payment.dto';
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
            lang,
        } = config
        const { amount, orderInfo, orderId } = data
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
            accessKey: accessKey,
            requestId: requestId,
            amount: amount,
            orderId: orderId,
            orderInfo: orderInfo,
            redirectUrl: redirectUrl,
            ipnUrl: ipnUrl,
            extraData: extraData,
            requestType: requestType,
            lang: lang,
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
            const data = response.data
            res.status(200).json({ data })
        } catch (error) {
            res.status(500).json({ error })
        }
    }

    @Public()
    @Post('callback')
    @HttpCode(200)
    async createIpnUrl(@Req() req: Request) {
        console.log('callback: ');
        console.log(req.body);
    }

    // check transaction status when not callback api is called
    @Public()
    @Post('check-status-transaction')
    @HttpCode(200)
    async checkTransactionStatus(@Res() res: Response, @Body() { orderId }: { orderId: number }) {
        const { accessKey, secretKey, partnerCode } = config
        const rawSignature = `accessKey=${accessKey}&orderId=${orderId}&partnerCode=${partnerCode}&requestId=${orderId}`

        const signature = createHmac('sha256', secretKey).update(rawSignature).digest('hex');

        const requestBody = JSON.stringify({
            partnerCode: partnerCode,
            requestId: orderId,
            orderId: orderId,
            lang: 'vi',
            signature: signature,
        });
        const options: AxiosRequestConfig = {
            method: 'POST',
            url: 'https://test-payment.momo.vn/v2/gateway/api/query',
            headers: {
                'Content-Type': 'application/json',
            },
            data: requestBody,
        };
        try {
            const result = await axios(options);
            return res.status(200).json(result.data);
        } catch (error) {
            res.status(500).json({ error })
        }
    }
}
