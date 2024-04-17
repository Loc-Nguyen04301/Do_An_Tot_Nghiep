import React from 'react'
import { Helmet } from 'react-helmet-async'
import { NavLink } from 'react-router-dom'
import { RoutePath } from '../../routes'
import clsx from 'clsx'
import { RightOutlined } from '@ant-design/icons';
import { convertNumbertoMoney } from '../../utils'

const OrderComplete = () => {
    const payment_method = 2
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
                        {payment_method === 2
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
                            <p className='mb-4 text-lg'>Trả tiền sau khi nhận hàng </p>
                        }
                        <ul>
                            <h2 className="font-bold text-2xl mb-4">Chi tiết đơn hàng</h2>
                            <li className='flex justify-between py-2 border-b-2'>
                                <strong className='tracking-wider'>SẢN PHẨM</strong>
                                <strong className='tracking-wider'>TỔNG</strong>
                            </li>
                            <ul>
                                <li className='flex justify-between py-2 border-b'>
                                    <span>HYDRO WHEY - 100% Hydrolyzed Isolate Tinh Khiết<strong className='ml-1'>× 3</strong> </span>
                                    <strong>{convertNumbertoMoney(6900000)}</strong>
                                </li>
                                <li className='flex justify-between py-2 border-b'>
                                    <span>HYDRO WHEY - 100% Hydrolyzed Isolate Tinh Khiết<strong className='ml-1'>× 3</strong> </span>
                                    <strong>{convertNumbertoMoney(6900000)}</strong>
                                </li>
                                <li className='flex justify-between py-2 border-b'>
                                    <span>HYDRO WHEY - 100% Hydrolyzed Isolate Tinh Khiết<strong className='ml-1'>× 3</strong> </span>
                                    <strong>{convertNumbertoMoney(6900000)}</strong>
                                </li>
                                <li className='flex justify-between py-2 border-b'>
                                    <span>HYDRO WHEY - 100% Hydrolyzed Isolate Tinh Khiết<strong className='ml-1'>× 3</strong> </span>
                                    <strong>{convertNumbertoMoney(6900000)}</strong>
                                </li>
                            </ul>
                            <li className='flex justify-between py-2 border-b'>
                                <strong>Tổng số phụ:</strong>
                                <strong>{convertNumbertoMoney(6900000)}</strong>
                            </li>
                            <li className='flex justify-between py-2 border-b'>
                                <strong>Phương thức thanh toán</strong>
                                <span>Chuyển khoản ngân hàng</span>
                            </li>
                            <li className='flex justify-between py-2'>
                                <strong>Tổng cộng:</strong>
                                <strong>{convertNumbertoMoney(6900000)}</strong>
                            </li>
                        </ul>

                    </div>
                    <div className='max-md:col-span-12 col-span-5'>
                        <div className="px-7 py-6 bg-[rgba(0,0,0,0.02)]">
                            <p className="mb-5 text-[#7a9c59] text-lg font-bold">
                                Cảm ơn bạn. Đơn hàng của bạn đã được nhận.
                            </p>
                            <ul className="list-disc text-category-title text-lg">
                                <li className="ml-5 mb-2">
                                    Người nhận:
                                    <strong className='ml-1'>Nguyen Van A</strong>
                                </li>
                                <li className="ml-5 mb-2">
                                    Số điện thoại:
                                    <strong className='ml-1'>0915677049</strong>
                                </li>
                                <li className="ml-5 mb-2">
                                    Địa chỉ:
                                    <strong className='ml-1'>Xã Đồng Tâm, huyện Hiệp Lực, TP.Hà Nội </strong>
                                </li>
                                <li className="ml-5 mb-2">
                                    Mã đơn hàng:
                                    <strong className='ml-1'>3436</strong>
                                </li>
                                <li className="ml-5 mb-2">
                                    Ngày:
                                    <strong className='ml-1'>15 Tháng Tư, 2024</strong>
                                </li>
                                <li className="ml-5 mb-2">
                                    Tổng cộng:
                                    <strong className='ml-1'>
                                        <span className="">{convertNumbertoMoney(5250000)} </span>
                                    </strong>
                                </li>
                                <li className="ml-5 mb-2">
                                    Phương thức thanh toán:
                                    <strong className='ml-1'>Chuyển khoản ngân hàng</strong>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OrderComplete