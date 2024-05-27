import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { NavLink, useNavigate } from 'react-router-dom'
import { RoutePath } from '@/routes'
import { RightOutlined } from '@ant-design/icons';
import { convertNumbertoMoney, setBillId, setPaymentURL } from '@/utils';
import clsx from 'clsx';
import { useAppSelector } from '@/redux-toolkit/hook';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useAlertDispatch } from '@/contexts/AlertContext';
import BillService from '@/services/BillService';
import { Collapse, CollapseProps } from 'antd';
import { PaymentMethod } from '@/types';
import VNPayService from '@/services/VNPayService';
import VietQRService from '@/services/VietQRService';
import { format } from "date-fns"

import "./Checkout.scss"

var DATETIME_FORMAT = 'yyyyMMddHHmmss'

interface FormData {
    customer_name?: string;
    address?: string;
    phone_number?: string;
    email?: string;
    note?: string;
}

export interface CreateBillDto extends FormData {
    user_id?: number;
    payment_method: string;
    total_amount?: number;
}

const schema = yup
    .object({
        customer_name: yup.string().required('Customer name is required'),
        address: yup.string().required('Address is required'),
        phone_number: yup.string().required('Phone number is required').min(10, 'Phone number is 10 characters').max(10, 'Phone number is 10 characters'),
        email: yup.string().required('Email is required').email('Must be a valid email'),
        note: yup.string()
    })

const Checkout = () => {
    const { user } = useAppSelector(state => state.auth)
    const [paymentMethod, setPaymentMethod] = useState<string>(PaymentMethod.SHIPCOD)

    const items: CollapseProps['items'] = [
        {
            key: PaymentMethod.SHIPCOD,
            label:
                <div className='flex gap-3 items-center'>
                    <input type={"radio"} checked={paymentMethod === PaymentMethod.SHIPCOD} readOnly />
                    <span className='font-bold'>Trả tiền mặt khi nhận hàng</span>
                </div>,
            children:
                <p>Trả tiền mặt khi nhận hàng</p>,
            showArrow: false,
        },
        {
            key: PaymentMethod.BANK_TRANSFER,
            label:
                <div className='flex gap-3 items-center'>
                    <input type={"radio"} checked={paymentMethod === PaymentMethod.BANK_TRANSFER} readOnly />
                    <span className='font-bold'>Chuyển khoản ngân hàng</span>
                </div>,
            children:
                <p>Thực hiện thanh toán vào ngay tài khoản ngân hàng của chúng tôi.
                    Đơn hàng sẽ đươc giao sau khi tiền đã chuyển.
                </p>,
            showArrow: false,
        },
        {
            key: PaymentMethod.VNPAY,
            label:
                <div className='flex gap-3 items-center'>
                    <input type={"radio"} checked={paymentMethod === PaymentMethod.VNPAY} readOnly />
                    <span className='font-bold'>Thanh toán cổng VNPay</span>
                </div>,
            children: <p>Thực hiện thanh toán thanh toán qua cổng VNPay</p>,
            showArrow: false,
        },
    ];

    const { register, handleSubmit, formState: { errors }, getValues, watch } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            customer_name: user?.username,
            phone_number: user?.phone_number,
            email: user?.email
        }
    });

    const { totalAmount, cartItems } = useAppSelector(state => state.cart)
    const dispatchAlert = useAlertDispatch()
    const navigate = useNavigate()

    const shortCartItems = cartItems.map((item) => {
        return { product_id: item.id, quantity: item.quantity, total_price: item.totalPrice }
    })

    const onSubmit = async (data: FormData) => {
        dispatchAlert({ loading: true })
        setTimeout(async () => {
            try {
                const createBillDto = { ...data, shortCartItems, user_id: user?.id, payment_method: paymentMethod, total_amount: totalAmount } as CreateBillDto
                const res = await BillService.createBill(createBillDto)
                setBillId(res.data.data.billId)
                if (paymentMethod === PaymentMethod.VNPAY) {
                    const res = await VNPayService.navigateVNPay({
                        amount: totalAmount,
                    })
                    // redirect đến cổng thanh toán VNPAY
                    window.location.replace(res.data.vnpUrl)
                    return;
                }
                else if (paymentMethod === PaymentMethod.BANK_TRANSFER) {
                    const now = new Date()
                    const createdAt = format(now, DATETIME_FORMAT)
                    const res = await VietQRService.createPaymentQR({ amount: 10000, addInfo: `${data.customer_name} CHUYEN KHOAN MUA HANG ${createdAt}` })
                    setPaymentURL(res.data.data.qrDataURL)
                    dispatchAlert({ loading: false })
                    navigate(RoutePath.OrderComplete)
                }
                else if (paymentMethod === PaymentMethod.SHIPCOD) {
                    dispatchAlert({ loading: false })
                    navigate(RoutePath.OrderComplete)
                }
            } catch (error: any) {
                dispatchAlert({ errors: error.message })
            }
        }, 2000)
    };

    const onChange = (key: string | string[]) => {
        if (key.length > 0)
            setPaymentMethod(key[0])
    };

    return (
        <>
            <Helmet>
                <title>Thanh toán - THOL</title>
                <meta name='description' content='Beginner friendly page for learning React Helmet.' />
            </Helmet>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="max-w-[1140px] container mx-auto py-12">
                    <div className='mb-12 flex justify-center items-baseline w-3/4 mx-auto'>
                        <NavLink to={RoutePath.CartPage} className={({ isActive }) => clsx("mx-5 text-3xl hover:text-main-orange-color max-[475px]:hidden", isActive && "text-main-orange-color")}>SHOPPING CART</NavLink>
                        <span className='relative bottom-[5px] max-[475px]:hidden'>
                            <RightOutlined className='text-text-gray' />
                        </span>
                        <NavLink to={RoutePath.CheckoutPage} className={({ isActive }) => clsx("mx-5 text-3xl hover:text-main-orange-color", isActive && "text-main-orange-color")}>CHECKOUT DETAILS</NavLink>
                    </div>
                    <div className='grid grid-cols-12 gap-7 px-5'>
                        <div className='col-span-7 border-t-2 border-border-color'>
                            <div>
                                <h1 className='mt-8 text-category-title text-lg '>
                                    THÔNG TIN THANH TOÁN
                                </h1>
                                <div className="my-2">
                                    <div className="label-email tracking-wide leading-6 font-semibold">Tên người nhận hàng</div>
                                    <input className="w-full h-[35px] border-[1px] border-[#adadad] rounded-sm" type={"text"} {...register('customer_name')} disabled={!!user?.username} />
                                    {errors.email && <p className="text-red-500">{errors.customer_name?.message}</p>}
                                </div>
                                <div className="my-2">
                                    <div className="label-email tracking-wide leading-6 font-semibold">Địa chỉ giao hàng</div>
                                    <input className="w-full h-[35px] border-[1px] border-[#adadad] rounded-sm" type={"text"} {...register('address')} />
                                    {errors.email && <p className="text-red-500">{errors.address?.message}</p>}
                                </div>
                                <div className="my-2">
                                    <div className="label-email tracking-wide leading-6 font-semibold">Số điện thoại</div>
                                    <input className="w-full h-[35px] border-[1px] border-[#adadad] rounded-sm" type={"text"} {...register('phone_number')} disabled={!!user?.phone_number} />
                                    {errors.email && <p className="text-red-500">{errors.phone_number?.message}</p>}
                                </div>
                                <div className="my-2">
                                    <div className="label-email tracking-wide leading-6 font-semibold">Địa chỉ email</div>
                                    <input className="w-full h-[35px] border-[1px] border-[#adadad] rounded-sm" type={"email"} {...register('email')} disabled={!!user?.email} />
                                    {errors.email && <p className="text-red-500">{errors.email?.message}</p>}
                                </div>
                                <h1 className='mt-12 text-category-title text-lg'>
                                    THÔNG TIN BỔ SUNG
                                </h1>
                                <div className="my-2">
                                    <div className="tracking-wide leading-6 font-semibold">Ghi chú đơn hàng (tuỳ chọn)</div>
                                    <textarea className="w-full h-[80px] border-[1px] border-[#adadad] rounded-sm" title='abc' {...register('note')} />
                                </div>
                                <div className='mt-5'>
                                    <button className='w-1/4 bg-button-red-color py-2 hover:shadow-checkout-btn'>
                                        <span className='text-white font-semibold tracking-wide' onSubmit={handleSubmit(onSubmit)}>Đặt hàng</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className='col-span-5'>
                            <div className='border-2 border-main-orange-color py-4 px-8'>
                                <h1 className='text-category-title text-lg font-semibold'>ĐƠN HÀNG CỦA BẠN</h1>
                                <div className='mt-5'>
                                    <div className='text-category-title tracking-wide border-b py-2 flex justify-between'>
                                        <span>Tạm tính</span>
                                        <span className='font-extrabold text-black'>{convertNumbertoMoney(totalAmount)}</span>
                                    </div>
                                    <div className='text-category-title tracking-wide border-b-[2px] py-2 flex justify-between'>
                                        <span>Tổng</span>
                                        <span className='font-extrabold text-black'>{convertNumbertoMoney(totalAmount)}</span>
                                    </div>
                                </div>
                                <Collapse className='mt-7 payment-accordion' activeKey={paymentMethod} ghost items={items} accordion onChange={onChange} />
                                <div className='my-5'>
                                    <p className='text-[#777777] text-sm'>Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

export default Checkout