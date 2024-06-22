export const config = {
    accessKey: 'F8BBA842ECF85',
    secretKey: 'K951B6PE1waDMi640xX08PD3vg6EkVlz',
    partnerCode: 'MOMO',
    redirectUrl: `${process.env.FRONT_END_URL}/order-complete`,
    ipnUrl: 'https://83c6-42-114-249-217.ngrok-free.app/api/v1/momo-payment/callback',
    requestType: 'captureWallet',
    extraData: '',
    orderGroupId: '',
    autoCapture: true,
    lang: 'vi',
}