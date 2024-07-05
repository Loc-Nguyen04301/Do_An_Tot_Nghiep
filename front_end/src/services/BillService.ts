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
    from_date?: string,
    to_date?: string,
}

interface UpdateBillDto {
    customer_name?: string,
    address?: string,
    phone_number?: string,
    user_id?: number,
    order_status?: string
    payment_status?: boolean
    note?: string
    reason_cancelled?: string
}

const createBill = (data: CreateBillDto) => {
    return http.post(`/bills`, data)
}

const updateBill = (data: UpdateBillDto, id: number) => {
    return http.patch(`/bills/${id}`, data)
}

const getBillDetailById = (id: number) => {
    return http.get(`/bills/${id}`,)
}

const getBill = ({ params }: { params?: BillParams }) => {
    return http.get(`/bills`, { params } as AxiosRequestConfig)
}

const getBillAdmin = ({ params }: { params?: BillParams }) => {
    return http.get(`/bills/findAllAdmin`, { params } as AxiosRequestConfig)
}

const getBillNotification = () => {
    return http.get(`/bills/notification`)
}

const isReadBill = (id: number) => {
    return http.patch(`/bills/isread/${id}`)
}

const BillService = { createBill, getBillDetailById, getBill, getBillAdmin, getBillNotification, isReadBill, updateBill }

export default BillService