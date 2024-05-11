import { CreatePaymentDto } from "@/types";
import http from "./axios";

const navigateVNPay = (data: CreatePaymentDto) => {
    return http.post("/payment/create_payment_url", data)
}

const VNPayService = { navigateVNPay }

export default VNPayService