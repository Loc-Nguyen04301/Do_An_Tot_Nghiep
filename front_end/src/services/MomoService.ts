import http from "./axios";

const navigateMomoPay = (data: {
    amount: number
    orderInfo: string
    orderId: string
}
) => {
    return http.post("/momo-payment/payment", data)
}

const checkTransactionStatus = (data: {
    orderId: string
}
) => {
    return http.post("/momo-payment/check-status-transaction", data)
}

const MomoService = { navigateMomoPay, checkTransactionStatus }

export default MomoService