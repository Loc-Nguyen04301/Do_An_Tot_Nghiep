import React, { useEffect, useMemo, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { NavLink } from 'react-router-dom'
import { RoutePath } from '../../routes'
import clsx from 'clsx'
import { RightOutlined } from '@ant-design/icons';
import { convertNumbertoMoney, formatDate, getBillId } from '../../utils'
import { useAppDispatch } from '../../redux-toolkit/hook'
import { resetCart } from '../../redux-toolkit/cartSlice'
import BillService from '../../services/BillService'
import { PaymentMethod } from '../../types'
import { useAlertDispatch } from '../../contexts/AlertContext'

interface IBill {
    id: number;
    customer_name: string;
    address: string;
    phone_number: string;
    email: string;
    note: string;
    user_id: number | null;
    created_at: string;
    order_status: string;
    payment_status: boolean;
    return_status: string;
    update_at: string;
    payment_method: string;
    items: IItem[];
}

interface IItem {
    product: { name: string, new_price: number };
    quantity: number;
}

const OrderComplete = () => {
    const [bill, setBill] = useState<IBill>()
    const [billMethod, setBillMethod] = useState<string>("")
    const [totalPrice, setTotalPrice] = useState<number>(0)

    const billId = getBillId()

    const dispatch = useAppDispatch()
    const dispatchAlert = useAlertDispatch()

    const getBillDetail = async (id: string) => {
        try {
            if (id) {
                const res = await BillService.getBillDetailById(id)
                setBill(res.data.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        dispatch(resetCart())
    }, [dispatch])

    useEffect(() => {
        if (billId) getBillDetail(billId)
    }, [billId])

    useEffect(() => {
        if (!bill) dispatchAlert({ loading: true })
        else dispatchAlert({ loading: false })
    }, [bill])

    useEffect(() => {
        if (bill) {
            switch (bill.payment_method) {
                case PaymentMethod.BANK_TRANSFER:
                    setBillMethod("Chuyển khoản ngân hàng")
                    break;
                case PaymentMethod.SHIPCOD:
                    setBillMethod("Trả tiền sau khi nhận hàng")
                    break;
                case PaymentMethod.VNPAY:
                    setBillMethod("Thanh toán cổng VNPay")
                    break;
            }
        }
    }, [bill])

    useEffect(() => {
        if (bill) {
            const totalPrice: number = bill.items.reduce((accumulator: number, currentItem: IItem) => {
                const { product, quantity } = currentItem;
                const { new_price } = product;

                const subtotal: number = new_price * quantity;

                return accumulator + subtotal;
            }, 0);
            setTotalPrice(totalPrice)
        }
    }, [bill])

    return (
        <>
            <Helmet>
                <title>Hoàn tất thanh toán - THOL</title>
                <meta name='description' content='Beginner friendly page for learning React Helmet.' />
            </Helmet>
            <div className="max-w-[1140px] container mx-auto py-12">
                <div className='mb-12 text-center flex justify-between items-baseline w-3/4 mx-auto'>
                    <NavLink to={RoutePath.CartPage} className={({ isActive }) => clsx("mx-5 text-3xl hover:text-main-orange-color max-[475px]:hidden", isActive && "text-main-orange-color")}>SHOPPING CART</NavLink>
                    <span className='relative bottom-[5px] max-[475px]:hidden'>
                        <RightOutlined className='text-text-gray' />
                    </span>
                    <NavLink to={RoutePath.CheckoutPage} className={({ isActive }) => clsx("mx-5 text-3xl hover:text-main-orange-color", isActive && "text-main-orange-color")}>CHECKOUT DETAILS</NavLink>
                    <span className='relative bottom-[5px] max-[475px]:hidden'>
                        <RightOutlined className='text-text-gray' />
                    </span>
                    <div className={clsx("mx-5 text-3xl text-main-orange-color")}>ORDER COMPLETE</div>
                </div>
                <div className='grid grid-cols-12 gap-7 px-5'>
                    <div className='max-md:col-span-12 col-span-7 text-category-title'>
                        {(bill && bill.payment_method === PaymentMethod.BANK_TRANSFER)
                            ?
                            <div className='mb-4'>
                                <h2 className="font-bold text-2xl mb-4">Thông tin chuyển khoản ngân hàng</h2>
                                <h3 className="font-bold text-xl mb-3">NGUYEN GIA LOC:</h3>
                                <ul className="list-disc text-lg">
                                    <li className="ml-5 mb-1">Ngân hàng:
                                        <strong className='ml-1'>VIETINBANK</strong>
                                    </li>
                                    <li className='ml-5'>Số tài khoản:
                                        <strong className='ml-1'>103870480417</strong>
                                    </li>
                                </ul>
                                <div className='mx-auto w-[400px]'>
                                    <img src='https://img.vietqr.io/image/970415-103870480417-print.png?amount=10000&addInfo=MUA%20HANG%20TAI%20LOC%20NGUYEN&accountName=NGUYEN%20GIA%20LOC' />
                                </div>
                            </div>
                            :
                            (bill && bill.payment_method === PaymentMethod.SHIPCOD)
                                ?
                                <p className='mb-4 text-lg'>Trả tiền sau khi nhận hàng </p>
                                :
                                <></>
                        }
                        <ul>
                            <h2 className="font-bold text-2xl mb-4">Chi tiết đơn hàng</h2>
                            <li className='flex justify-between py-2 border-b-2'>
                                <strong className='tracking-wider'>SẢN PHẨM</strong>
                                <strong className='tracking-wider'>TỔNG</strong>
                            </li>
                            {bill && bill.items &&
                                <ul>
                                    {bill.items.map(item =>
                                        <li className='flex justify-between gap-3 py-2 border-b' key={item.product.name}>
                                            <span>{item.product.name} <strong className='ml-1'>× {item.quantity}</strong> </span>
                                            <strong>{convertNumbertoMoney(item.quantity * item.product.new_price)}</strong>
                                        </li>
                                    )}
                                </ul>}
                            <li className='flex justify-between py-2 border-b'>
                                <strong>Tổng số phụ:</strong>
                                <strong>{convertNumbertoMoney(totalPrice)}</strong>
                            </li>
                            <li className='flex justify-between py-2 border-b'>
                                <strong>Phương thức thanh toán</strong>
                                <span>Chuyển khoản ngân hàng</span>
                            </li>
                            <li className='flex justify-between py-2'>
                                <strong>Tổng cộng:</strong>
                                <strong>{convertNumbertoMoney(totalPrice)}</strong>
                            </li>
                        </ul>

                    </div>
                    {
                        bill &&
                        <div className='max-md:col-span-12 col-span-5'>
                            <div className="px-7 py-6 bg-[rgba(0,0,0,0.02)]">
                                <p className="mb-5 text-[#7a9c59] text-lg font-bold">
                                    Cảm ơn bạn. Đơn hàng của bạn đã được nhận.
                                </p>
                                <ul className="list-disc text-category-title text-lg">
                                    <li className="ml-5 mb-2">
                                        Mã đơn hàng:
                                        <strong className='ml-1'>{bill.id}</strong>
                                    </li>
                                    <li className="ml-5 mb-2">
                                        Người nhận:
                                        <strong className='ml-1'>{bill.customer_name}</strong>
                                    </li>
                                    <li className="ml-5 mb-2">
                                        Số điện thoại:
                                        <strong className='ml-1'>{bill.phone_number}</strong>
                                    </li>
                                    <li className="ml-5 mb-2">
                                        Địa chỉ:
                                        <strong className='ml-1'>{bill.address}</strong>
                                    </li>
                                    <li className="ml-5 mb-2">
                                        Ngày:
                                        <strong className='ml-1'>{formatDate(bill.created_at)}</strong>
                                    </li>
                                    <li className="ml-5 mb-2">
                                        Tổng cộng:
                                        <strong className='ml-1'>
                                            <span className="">{convertNumbertoMoney(totalPrice)} </span>
                                        </strong>
                                    </li>
                                    <li className="ml-5 mb-2">
                                        Phương thức thanh toán:
                                        <strong className='ml-1'>{billMethod}</strong>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}

export default OrderComplete