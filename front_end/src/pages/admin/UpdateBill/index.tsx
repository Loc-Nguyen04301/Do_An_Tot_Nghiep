import React, { useEffect, useState } from 'react'
import {
    ArrowLeftOutlined
} from '@ant-design/icons';
import { useAlertDispatch } from '@/contexts/AlertContext'
import BillService from '@/services/BillService'
import { IBill } from '@/types'
import { useNavigate, useParams } from 'react-router-dom'
import { Typography } from 'antd'
import * as yup from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { format } from "date-fns"
import { convertNumbertoMoney } from '@/utils';

var DATETIME_FORMAT = 'dd-MM-yyyy HH:mm'

const schema = yup
    .object().shape({
        name: yup.string().required('Yêu cầu nhập tên sản phẩm'),
        brand: yup.string().required('Yêu cầu nhập tên thương hiệu'),
        description: yup.string().required('Yêu cầu mô tả sản phẩm'),
        old_price: yup.number(),
        new_price: yup.number().required('Yêu cầu nhập giá mới'),
        available: yup.number()
    })

const UpdateBill = () => {
    const [selectedBill, setSelectedBill] = useState<IBill>()

    const dispatchAlert = useAlertDispatch()
    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
        const getBillDetail = async (id: number) => {
            dispatchAlert({ loading: true })
            try {
                const res = await BillService.getBillDetailById(id)
                setSelectedBill(res.data.data)
                dispatchAlert({ loading: false })
            } catch (error) {
                console.log(error)
            }
        }

        if (params.id) getBillDetail(Number(params.id))
    }, [params.id])

    const handleSubmit = () => {

    }

    console.log({ selectedBill })
    return (
        selectedBill &&
        <>
            <Typography.Title level={3} className='text-center'>Cập nhật đơn hàng</Typography.Title>
            <Typography.Title level={4}>
                <ArrowLeftOutlined className='cursor-pointer hover:text-main-orange-color' onClick={() => navigate(-1)} />
            </Typography.Title>
            <form onSubmit={handleSubmit}>
                <div className="my-2">
                    <div className="font-semibold tracking-wide">Mã đơn hàng</div>
                    <input className="w-1/2 h-[35px] border-[1px] border-[#adadad] rounded-sm" type={"text"} defaultValue={selectedBill.id} disabled />
                </div>
                <div className="my-2">
                    <div className="font-semibold tracking-wide">Ngày mua</div>
                    <input className="w-1/2 h-[35px] border-[1px] border-[#adadad] rounded-sm" type={"text"} defaultValue={format(selectedBill.created_at, DATETIME_FORMAT)} disabled />
                </div>
                <div className="my-2">
                    <div className="font-semibold tracking-wide">Tên khách hàng</div>
                    <input className="w-1/2 h-[35px] border-[1px] border-[#adadad] rounded-sm" type={"text"} defaultValue={selectedBill.customer_name} disabled />
                </div>
                <div className="my-2">
                    <div className="font-semibold tracking-wide">Địa chỉ giao hàng</div>
                    <input className="w-1/2 h-[35px] border-[1px] border-[#adadad] rounded-sm" type={"text"} defaultValue={selectedBill.address} disabled />
                </div>
                <div className="my-2">
                    <div className="font-semibold tracking-wide">Số điện thoại</div>
                    <input className="w-1/2 h-[35px] border-[1px] border-[#adadad] rounded-sm" type={"text"} defaultValue={selectedBill.phone_number} disabled />
                </div>
                <div className="my-2">
                    <div className="font-semibold tracking-wide">Trạng thái đơn hàng</div>
                    <input className="w-1/2 h-[35px] border-[1px] border-[#adadad] rounded-sm" type={"text"} defaultValue={selectedBill.order_status} disabled />
                </div>
                <div className="my-2">
                    <div className="font-semibold tracking-wide">Trạng thái thanh toán</div>
                    <input className="w-1/2 h-[35px] border-[1px] border-[#adadad] rounded-sm" type={"text"} defaultValue={selectedBill.payment_status} disabled />
                </div>
                <div className="my-2">
                    <div className="font-semibold tracking-wide">Phương thức thanh toán</div>
                    <input className="w-1/2 h-[35px] border-[1px] border-[#adadad] rounded-sm" type={"text"} defaultValue={selectedBill.payment_method} disabled />
                </div>
                <div className="my-2">
                    <div className="font-semibold tracking-wide">Tổng tiền</div>
                    <input className="w-1/2 h-[35px] border-[1px] border-[#adadad] rounded-sm" type={"text"} defaultValue={convertNumbertoMoney(selectedBill.total_amount)} disabled />
                </div>
                <div className="my-2">
                    <div className="font-semibold tracking-wide">Ghi chú</div>
                    <textarea className="w-1/2 min-h-[100px] border-[1px] border-[#adadad] rounded-sm" defaultValue={selectedBill.note} disabled />
                </div>
            </form>
        </>
    )
}

export default UpdateBill