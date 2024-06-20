import http from "./axios";

const navigateVNPay = (data: {
    amount: number,
    orderInfo: string;
}
) => {
    return http.post("/payment/create_payment_url", data)
}

const VNPayService = { navigateVNPay }

export default VNPayService