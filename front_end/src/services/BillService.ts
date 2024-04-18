import http from "./axios";

const createBill = (data: any) => {
    return http.post(`/bills`, data)
}

const getBillDetailById = (id: string) => {
    return http.get(`/bills/${id}`,)
}

const BillService = { createBill, getBillDetailById }

export default BillService