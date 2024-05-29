import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { RoutePath } from '@/routes'
import { RightOutlined, DeleteOutlined } from '@ant-design/icons';
import { ConfigProvider, Modal, Table, TableProps } from 'antd';
import { convertNumbertoMoney } from '@/utils';
import { useAppDispatch, useAppSelector } from '@/redux-toolkit/hook';
import { addItemToCart, IProductItem, removeItemToCart, deleteItemToCart } from '@/redux-toolkit/cartSlice';
import { useAlertDispatch } from '@/contexts/AlertContext';
import clsx from 'clsx';

import "./Cart.scss"

const Cart = () => {
    const { cartItems, totalAmount } = useAppSelector((state) => state.cart)
    const data: IProductItem[] = cartItems;
    const [isModalOpen, setIsModalOpen] = useState(false);

    const dispatch = useAppDispatch()
    const dispatchAlert = useAlertDispatch()

    const navigate = useNavigate()

    const removeItem = (product: any) => {
        dispatchAlert({ loading: true })
        setTimeout(() => {
            dispatch(removeItemToCart(product))
            dispatchAlert({ loading: false })
        }, 1000)
    }

    const addItem = (product: any) => {
        dispatchAlert({ loading: true })
        setTimeout(() => {
            dispatch(addItemToCart(product))
            dispatchAlert({ loading: false })
        }, 1000)
    }

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = (product: any) => {
        dispatchAlert({ success: "Xóa sản phẩm thành công" })
        dispatch(deleteItemToCart(product))
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleNavigateCheckout = () => {
        if (cartItems.length === 0) {
            dispatchAlert({ loading: true })
            setTimeout(() => {
                dispatchAlert({ loading: false })
            }, 3000)
        }
        else {
            navigate(RoutePath.CheckoutPage)
        }
    }

    const columns: TableProps<IProductItem>['columns'] = [
        {
            title: "SẢN PHẨM",
            key: "name",
            render: (_, record) => <div>
                <Link to={`${RoutePath.DetailProduct}/${record.id}`} className='hover:text-[#334862] text-base'>
                    <div className='flex items-center max-xs:flex-col max-xs:text-center gap-2'>
                        <img src={record.image} width={70} />
                        <div>{record.name}</div>
                    </div>
                </Link>
            </div>
        },
        {
            title: 'ĐƠN GIÁ',
            key: 'price',
            render: (_, record) => <div>
                <div className='flex items-center'>
                    <div className='font-bold'>{convertNumbertoMoney(record.new_price)}</div>
                </div>
            </div>
        },
        {
            title: 'SỐ LƯỢNG',
            key: 'number',
            render: (_, record) =>
                <div>
                    <form>
                        <div className="value-button" id="decrease" onClick={() => removeItem(record)}>-</div>
                        <input type="number" id="number" value={record.quantity} />
                        <div className="value-button" id="increase" onClick={() => addItem(record)}>+</div>
                    </form>
                </div>
        },
        {
            title: 'TẠM TÍNH',
            key: 'totalPrice',
            render: (_, record) => <div className='flex items-center'>
                <div className='font-bold'>{convertNumbertoMoney(record.totalPrice)}</div>
            </div>
        },
        {
            title: '',
            key: 'deleteItem',
            render: (_, record) =>
                <div className='flex items-center'>
                    <div className='cursor-pointer transform hover:scale-125' onClick={showModal}>
                        <DeleteOutlined className='text-red-500 text-2xl' />
                    </div>
                    <ConfigProvider theme={{
                        token: {
                            colorPrimary: '#f48220'
                        }
                    }}>
                        <Modal centered title="Xóa sản phẩm" open={isModalOpen} onOk={() => handleOk(record)} onCancel={handleCancel}>
                            <p className='text-base'>Bạn muốn xóa sản phẩm này khỏi giỏ hàng ?</p>
                        </Modal>
                    </ConfigProvider>
                </div >
        },
    ];

    return (
        <>
            <Helmet>
                <title>Giỏ hàng - THOL</title>
                <meta name='description' content='Beginner friendly page for learning React Helmet.' />
            </Helmet>
            <div className="max-w-[1140px] container mx-auto py-12" id="cart-page">
                <div className='mb-12 flex justify-center items-baseline w-3/4 mx-auto'>
                    <NavLink to={RoutePath.CartPage} className={({ isActive }) => clsx("mx-5 text-3xl hover:text-main-orange-color", isActive && "text-main-orange-color")}>SHOPPING CART</NavLink>
                    <span className='relative bottom-[5px] max-[475px]:hidden'>
                        <RightOutlined className='text-text-gray' />
                    </span>
                    <div onClick={handleNavigateCheckout} className={clsx("mx-5 text-3xl hover:text-main-orange-color max-[475px]:hidden cursor-pointer")}>CHECKOUT DETAILS</div>
                </div>
                {data.length > 0 &&
                    <>
                        <div className='grid grid-cols-12 gap-6 px-5'>
                            <div className='col-span-7 max-lg:col-span-12'>
                                <Table columns={columns} dataSource={data} pagination={false} rowKey={(record) => record.id} />
                            </div>
                            <div className='col-span-5 max-lg:col-span-12'>
                                <div className='text-category-title font-semibold text-lg tracking-wide border-b-[3px] pb-1'>Cộng giỏ hàng</div>
                                <div className='mt-5'>
                                    <div className='text-category-title tracking-wide border-b-[1px] py-1 flex justify-between'>
                                        <span>Tạm tính</span>
                                        <span className='font-extrabold text-black'>{convertNumbertoMoney(totalAmount)}</span>
                                    </div>
                                    <div className='text-category-title tracking-wide border-b-[3px] py-1 flex justify-between'>
                                        <span>Tổng</span>
                                        <span className='font-extrabold text-black'>{convertNumbertoMoney(totalAmount)}</span>
                                    </div>
                                </div>
                                <div className='mt-5'>
                                    <Link to={RoutePath.CheckoutPage}>
                                        <button className='w-full bg-button-red-color py-2 hover:shadow-checkout-btn'>
                                            <span className='text-white font-semibold tracking-wide'>TIẾN HÀNH THANH TOÁN</span>
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </>
                }
                {data.length === 0 &&
                    <>
                        <div className='text-lg text-text-gray'>Chưa có sản phẩm nào trong giỏ hàng.</div>
                        <div className='mt-8 text-center mb-20'>
                            <Link to={RoutePath.Home} className=''>
                                <button className=' bg-main-orange-color py-2 px-8 hover:shadow-checkout-btn'>
                                    <span className='text-white font-semibold tracking-wide'>QUAY TRỞ LẠI CỬA HÀNG</span>
                                </button>
                            </Link>
                        </div>
                    </>
                }
            </div>
        </>
    )
}

export default Cart