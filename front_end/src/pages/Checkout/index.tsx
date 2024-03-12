import React from 'react'
import { Helmet } from 'react-helmet-async'
import { Link, NavLink } from 'react-router-dom'
import { RoutePath } from '../../routes'
import { RightOutlined } from '@ant-design/icons';
import "../Login/Login.scss"
import { convertNumbertoMoney } from '../../helpers';
import clsx from 'clsx';

const Checkout = () => {
    const onSubmit = async () => {

    };

    return (
        <>
            <Helmet>
                <title>Thanh toán - THOL</title>
                <meta name='description' content='Beginner friendly page for learning React Helmet.' />
            </Helmet>
            <div className="max-w-[1140px] container mx-auto py-12">
                <div className='mb-12 text-center'>
                    <NavLink to={RoutePath.CartPage} className={({ isActive }) => clsx("mx-5 text-3xl hover:text-main-orange-color max-[475px]:hidden", isActive && "text-main-orange-color")}>SHOPPING CART</NavLink>
                    <span className='relative bottom-[5px] max-[475px]:hidden'>
                        <RightOutlined className='text-text-gray' />
                    </span>
                    <NavLink to={RoutePath.CheckoutPage} className={({ isActive }) => clsx("mx-5 text-3xl hover:text-main-orange-color", isActive && "text-main-orange-color")}>CHECKOUT DETAILS</NavLink>
                </div>
                <div className='grid grid-cols-12 gap-7 px-5'>
                    <div className='col-span-7 border-t-2 border-border-color'>
                        <div>
                            <form>
                                <h1 className='mt-8 text-category-title text-lg font-semibold'>THÔNG TIN THANH TOÁN</h1>
                                <div className="my-3">
                                    <div className="label-email font-semibold tracking-wide">Tên</div>
                                    <input className="w-full h-[35px] border-[1px] border-[#adadad] rounded-sm" type={"text"} />
                                </div>
                                <div className="my-3">
                                    <div className="label-email  font-semibold tracking-wide">Địa chỉ</div>
                                    <input className="w-full h-[35px] border-[1px] border-[#adadad] rounded-sm" type={"text"} />
                                </div>
                                <div className="my-3">
                                    <div className="label-email  font-semibold tracking-wide">Số điện thoại</div>
                                    <input className="w-full h-[35px] border-[1px] border-[#adadad] rounded-sm" type={"number"} />
                                </div>
                                <div className="my-3">
                                    <div className="label-email  font-semibold tracking-wide">Địa chỉ email</div>
                                    <input className="w-full h-[35px] border-[1px] border-[#adadad] rounded-sm" type={"email"} />
                                </div>
                                <h1 className='mt-8 text-category-title text-lg font-semibold'>THÔNG TIN BỔ SUNG </h1>
                                <div className="my-3">
                                    <div className="font-semibold tracking-wide">Ghi chú đơn hàng (tuỳ chọn)</div>
                                    <input className="w-full h-[35px] border-[1px] border-[#adadad] rounded-sm" type={"text"} />
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className='col-span-5'>
                        <div className='border-2 border-main-orange-color py-4 px-8'>
                            <h1 className='text-category-title text-lg font-semibold'>ĐƠN HÀNG CỦA BẠN</h1>
                            <div className='mt-5'>
                                <div className='text-category-title tracking-wide border-b-[1px] py-1 flex justify-between'>
                                    <span>Tạm tính</span>
                                    <span className='font-extrabold text-black'>{convertNumbertoMoney(10000000)}</span>
                                </div>
                                <div className='text-category-title tracking-wide border-b-[3px] py-1 flex justify-between'>
                                    <span>Tổng</span>
                                    <span className='font-extrabold text-black'>{convertNumbertoMoney(10000000)}</span>
                                </div>
                            </div>
                            <div className='mt-5'>
                                <Link to={RoutePath.CheckoutPage}>
                                    <button className='w-1/3 bg-button-red-color py-2 hover:shadow-checkout-btn'>
                                        <span className='text-white font-semibold tracking-wide'>Đặt hàng</span>
                                    </button>
                                </Link>
                            </div>
                            <div className='my-5'>
                                <p className='text-[#777777] text-sm'>Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </>
    )
}

export default Checkout