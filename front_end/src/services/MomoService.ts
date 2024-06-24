import http from "./axios";

const navigateMomoPay = (data: {
    amount: number
    orderInfo: string
    orderId: string
}
) => {
    return http.post("/momo-payment/payment", data)
}

const MomoService = { navigateMomoPay }

export default MomoService