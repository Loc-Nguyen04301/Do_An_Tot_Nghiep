export const config = {
    accessKey: 'F8BBA842ECF85',
    secretKey: 'K951B6PE1waDMi640xX08PD3vg6EkVlz',
    partnerCode: 'MOMO',
    redirectUrl: `${process.env.FRONT_END_URL}/order-complete`,
    ipnUrl: `${process.env.SERVER_URL}/api/v1/momo-payment/callback`,
    requestType: 'captureWallet',
    extraData: '',
    orderGroupId: '',
    autoCapture: true,
    lang: 'vi',
}