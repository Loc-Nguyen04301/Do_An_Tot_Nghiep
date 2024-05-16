import http from "./axios";
import { CreateBillDto } from "@/pages/Checkout";
import { AxiosRequestConfig } from "axios";

interface BillParams {
    customer_name?: string,
    address?: string,
    phone_number?: string,
    user_id?: number,
    page_index?: number
    page_size?: number
    order_status?: string
    payment_status?: boolean
    return_status?: string
}

const createBill = (data: CreateBillDto) => {
    return http.post(`/bills`, data)
}

const getBillDetailById = (id: string) => {
    return http.get(`/bills/${id}`,)
}

const getBill = ({ params }: { params?: BillParams }) => {
    return http.get(`/bills`, { params } as AxiosRequestConfig)
}

const getBillAdmin = ({ params }: { params?: BillParams }) => {
    return http.get(`/bills/findAllAdmin`, { params } as AxiosRequestConfig)
}

const BillService = { createBill, getBillDetailById, getBill, getBillAdmin }

export default BillService