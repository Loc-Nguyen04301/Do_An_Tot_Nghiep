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
import { useAppDispatch } from '@/redux-toolkit/hook';
import { markReadBill } from '@/redux-toolkit/billNotiSlice';

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

    const dispatch = useAppDispatch()
    const dispatchAlert = useAlertDispatch()
    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
        const getBillDetail = async (id: number) => {
            dispatchAlert({ loading: true })
            try {
                const res = await BillService.getBillDetailById(id)
                await BillService.isReadBill(id)
                setSelectedBill(res.data.data)
                dispatchAlert({ loading: false })
            } catch (error) {
                console.log(error)
            }
        }

        if (params.id) {
            getBillDetail(Number(params.id)).then(() => {
                dispatch(markReadBill({ id: Number(params.id) }))
            })
        }
    }, [params.id])

    const handleSubmit = () => {

    }

    return (
        selectedBill &&
        <>
            <Typography.Title level={3} className='text-center'>Cập nhật đơn hàng</Typography.Title>
            <Typography.Title level={4}>
                <ArrowLeftOutlined className='cursor-pointer hover:text-main-orange-color' onClick={() => navigate(-1)} />
            </Typography.Title>
            <div className='grid grid-cols-2 gap-5'>
                <form onSubmit={handleSubmit} className='col-span-1'>
                    <div className='p-6 bg-white'>
                        <h1 className='text-center font-semibold text-2xl'>Thông tin đơn hàng</h1>
                        <div className="my-2">
                            <div className="font-semibold tracking-wide">Mã đơn hàng</div>
                            <input className="w-full h-[35px] border-[1px] border-[#adadad] rounded-sm" type={"text"} defaultValue={selectedBill.id} disabled />
                        </div>
                        <div className="my-2">
                            <div className="font-semibold tracking-wide">Ngày mua</div>
                            <input className="w-full h-[35px] border-[1px] border-[#adadad] rounded-sm" type={"text"} defaultValue={format(selectedBill.created_at, DATETIME_FORMAT)} disabled />
                        </div>
                        <div className="my-2">
                            <div className="font-semibold tracking-wide">Tên khách hàng</div>
                            <input className="w-full h-[35px] border-[1px] border-[#adadad] rounded-sm" type={"text"} defaultValue={selectedBill.customer_name} disabled />
                        </div>
                        <div className="my-2">
                            <div className="font-semibold tracking-wide">Địa chỉ giao hàng</div>
                            <input className="w-full h-[35px] border-[1px] border-[#adadad] rounded-sm" type={"text"} defaultValue={selectedBill.address} disabled />
                        </div>
                        <div className="my-2">
                            <div className="font-semibold tracking-wide">Số điện thoại</div>
                            <input className="w-full h-[35px] border-[1px] border-[#adadad] rounded-sm" type={"text"} defaultValue={selectedBill.phone_number} disabled />
                        </div>
                        <div className="my-2">
                            <div className="font-semibold tracking-wide">Trạng thái đơn hàng</div>
                            <input className="w-full h-[35px] border-[1px] border-[#adadad] rounded-sm" type={"text"} defaultValue={selectedBill.order_status} disabled />
                        </div>
                        <div className="my-2">
                            <div className="font-semibold tracking-wide">Trạng thái thanh toán</div>
                            <input className="w-full h-[35px] border-[1px] border-[#adadad] rounded-sm" type={"text"} defaultValue={selectedBill.payment_status} disabled />
                        </div>
                        <div className="my-2">
                            <div className="font-semibold tracking-wide">Phương thức thanh toán</div>
                            <input className="w-full h-[35px] border-[1px] border-[#adadad] rounded-sm" type={"text"} defaultValue={selectedBill.payment_method} disabled />
                        </div>
                        <div className="my-2">
                            <div className="font-semibold tracking-wide">Ghi chú</div>
                            <textarea className="w-full min-h-[100px] border-[1px] border-[#adadad] rounded-sm" defaultValue={selectedBill.note} disabled />
                        </div>
                    </div>
                </form>
                <div className='col-span-1'>
                    <div className='p-6 border-2 border-border-color bg-white' key={selectedBill.id}>
                        <h1 className='text-center font-semibold text-2xl'>Danh sách sản phẩm</h1>
                        {selectedBill.items.map((item, index) =>
                            <div className='py-6 border-b border-border-color' key={`${selectedBill.id}-${index}`} >
                                <div className='flex justify-between items-center gap-2'>
                                    <div className='flex gap-2'>
                                        <img src={item.product.image} width={80} />
                                        <div className='flex flex-col justify-center'>
                                            <span>{item.product.name} </span>
                                            <span className='text-sm font-semibold'>x {item.quantity}</span>
                                        </div>
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <div>
                                            {
                                                item.product.old_price != 0 &&
                                                <del className='text-category-title mr-2'>{convertNumbertoMoney(item.product.old_price)}</del>
                                            }
                                            <span className='text-main-orange-color'>{convertNumbertoMoney(item.product.new_price)}</span>
                                        </div>
                                    </div>
                                </div>
                                <p className='text-right'>
                                    <span className='mr-2 text-nowrap'>Thành tiền:</span>
                                    <span className='text-main-orange-color font-semibold'>{convertNumbertoMoney(item.total_price)}</span>
                                </p>
                            </div>
                        )}
                        <div className='py-6 text-right'>
                            <span className='px-2'>Tổng cộng:</span>
                            <span className='px-2 text-main-orange-color text-xl font-semibold'>{convertNumbertoMoney(selectedBill.total_amount)}</span>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default UpdateBill