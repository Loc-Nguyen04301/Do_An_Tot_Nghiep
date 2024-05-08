import http from "./axios";
import { CreateBillDto } from "../pages/Checkout";

const createBill = (data: CreateBillDto) => {
    return http.post(`/bills`, data)
}

const getBillDetailById = (id: string) => {
    return http.get(`/bills/${id}`,)
}

const BillService = { createBill, getBillDetailById }

export default BillService