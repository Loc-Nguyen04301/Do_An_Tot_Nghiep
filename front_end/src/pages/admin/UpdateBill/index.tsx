import React, { useEffect, useState } from 'react'
import {
    ArrowLeftOutlined
} from '@ant-design/icons';
import { useAlertDispatch } from '@/contexts/AlertContext'
import BillService from '@/services/BillService'
import { IBill } from '@/types'
import { useNavigate, useParams } from 'react-router-dom'
import { Select, Typography } from 'antd'
import * as yup from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { format } from "date-fns"
import { convertNumbertoMoney, phoneRegExp } from '@/utils';
import { useAppDispatch } from '@/redux-toolkit/hook';
import { markReadBill } from '@/redux-toolkit/billNotiSlice';
import { OrderStatus, PaymentMethod } from '@/types';

var DATETIME_FORMAT = 'dd-MM-yyyy HH:mm'

const schema = yup
    .object().shape({
        address: yup.string().required('Address is required'),
        phone_number: yup.string().required('Phone number is required').length(10, "Phone number is not valid").matches(phoneRegExp, 'Phone number is not valid'),
    })

const UpdateBill = () => {
    const [selectedBill, setSelectedBill] = useState<IBill>()
    const [disabled, setDisabled] = useState(false)
    const [orderStatus, setOrderStatus] = useState<string>()
    const [paymentStatus, setPaymentStatus] = useState<boolean>()
    const [paymentMethod, setPaymentMethod] = useState<string>()

    const { register, handleSubmit, formState: { errors }, getValues } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            address: selectedBill?.address,
            phone_number: selectedBill?.phone_number,
        }
    });

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

    useEffect(() => {
        setOrderStatus(selectedBill?.order_status)
        setPaymentStatus(selectedBill?.payment_status)
        setPaymentMethod(selectedBill?.payment_method)
    }, [selectedBill])

    const handleChangeOrderStatus = (value: string) => {
        setOrderStatus(value)
    };

    const handleChangePaymentStatus = (value: string) => {
        setPaymentStatus(Boolean(value))
    }

    const handleChangePaymentMethod = (value: string) => {
        setPaymentMethod(value)
    }

    const onSubmit = async (data: any) => {
        dispatchAlert({ loading: true })
        const newData = { ...data, order_status: orderStatus, payment_status: paymentStatus, payment_method: paymentMethod }
        try {
            if (selectedBill) {
                const res = await BillService.updateBill(newData, selectedBill.id)
                dispatchAlert({ loading: false })
                dispatchAlert({ success: res.data.message })
                setDisabled(true)
                setTimeout(() => {
                    window.location.reload()
                }, 2000)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        selectedBill &&
        <>
            <Typography.Title level={3} className='text-center'>Cập nhật đơn hàng</Typography.Title>
            <Typography.Title level={4}>
                <ArrowLeftOutlined className='cursor-pointer hover:text-main-orange-color' onClick={() => navigate(-1)} />
            </Typography.Title>
            <div className='grid grid-cols-2 gap-5'>
                <form onSubmit={onSubmit} className='col-span-1'>
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
                            <input className="w-full h-[35px] border-[1px] border-[#adadad] rounded-sm" type={"text"} defaultValue={selectedBill.address} {...register('address')} />
                            {errors.address && <p className="text-red-500 text-center">{errors.address.message}</p>}
                        </div>
                        <div className="my-2">
                            <div className="font-semibold tracking-wide">Số điện thoại</div>
                            <input className="w-full h-[35px] border-[1px] border-[#adadad] rounded-sm" type={"text"} defaultValue={selectedBill.phone_number} {...register('phone_number')} />
                            {errors.phone_number && <p className="text-red-500 text-center">{errors.phone_number.message}</p>}
                        </div>
                        <div className="my-2">
                            <div className="font-semibold tracking-wide">Trạng thái đơn hàng</div>
                            <Select
                                className="w-full"
                                value={orderStatus}
                                onChange={handleChangeOrderStatus}
                                options={[
                                    { value: OrderStatus.PROCESSING, label: 'Đang xử lý' },
                                    { value: OrderStatus.SUCCESS, label: 'Hoàn thành' },
                                    { value: OrderStatus.CANCELLED, label: 'Hủy bỏ' },
                                ]}
                            />
                        </div>
                        <div className="my-2">
                            <div className="font-semibold tracking-wide">Trạng thái thanh toán</div>
                            <Select
                                className="w-full"
                                value={paymentStatus == true ? 'Đã thanh toán' : 'Chờ thanh toán'}
                                onChange={handleChangePaymentStatus}
                                options={[
                                    { value: true, label: 'Đã thanh toán' },
                                    { value: false, label: 'Chờ thanh toán' },
                                ]}
                            />
                            <div className="my-2">
                                <div className="font-semibold tracking-wide">Phương thức thanh toán</div>
                                <Select
                                    className="w-full"
                                    value={paymentMethod}
                                    onChange={handleChangePaymentMethod}
                                    options={[
                                        { value: PaymentMethod.SHIPCOD, label: 'Ship COD' },
                                        { value: PaymentMethod.BANK_TRANSFER, label: 'Chuyển khoản' },
                                        { value: PaymentMethod.VNPAY, label: 'Thanh toán cổng VNPay' },
                                    ]}
                                />
                            </div>
                            <div className="my-2">
                                <div className="font-semibold tracking-wide">Ghi chú</div>
                                <textarea className="w-full min-h-[100px] border-[1px] border-[#adadad] rounded-sm" defaultValue={selectedBill.note} disabled />
                            </div>
                            <div className='text-center'>
                                {!disabled &&
                                    <button className='w-[100px] rounded-md bg-main-orange-color py-2 hover:shadow-checkout-btn' onClick={handleSubmit(onSubmit)}>
                                        <span className='text-white font-semibold tracking-wide'>Lưu</span>
                                    </button>
                                }
                            </div>
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