import http from "./axios";

const createBill = (data: any) => {
    return http.post(`/bills`, data)
}

const BillService = { createBill }

export default BillService