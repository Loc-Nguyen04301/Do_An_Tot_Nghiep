import React, { ChangeEvent, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { NavLink } from 'react-router-dom'
import { RoutePath } from '@/routes'
import clsx from 'clsx';
import BillService from '@/services/BillService';
import { useAppSelector } from '@/redux-toolkit/hook';
import { useAlertDispatch } from '@/contexts/AlertContext';
import { convertNumbertoMoney } from '@/utils';
import { format } from "date-fns"
import { ConfigProvider, Pagination, Tag } from 'antd';
import type { PaginationProps } from 'antd';
import { IBill, IItem } from '@/types';
import { OrderStatus } from '@/types';

var DATETIME_FORMAT = 'dd/MM/yyyy HH:mm'

enum PurchaseStatus {
    ALL = "Tất cả",
    PROCESSING = 'PROCESSING',
    SUCCESS = 'SUCCESS',
    CANCELLED = 'CANCELLED'
}

const Purchase = () => {
    const [purchaseStatus, setPurchaseStatus] = useState<PurchaseStatus>(PurchaseStatus.ALL)
    const [listBill, setListBill] = useState<IBill[]>([])
    const { user } = useAppSelector(state => state.auth)
    const [current, setCurrent] = useState(1)
    const [pageSize] = useState(5)
    const [records, setRecords] = useState(0)

    const onChangePage: PaginationProps['onChange'] = (page) => {
        setCurrent(page);
    };

    const dispatchAlert = useAlertDispatch()

    const fetchBill = async (purchaseStatus: PurchaseStatus, userId: number | undefined, current: number, pageSize: number) => {
        dispatchAlert({ loading: true })
        try {
            let res
            switch (purchaseStatus) {
                case PurchaseStatus.ALL:
                    res = await BillService.getBill({ params: { user_id: userId, page_index: current - 1, page_size: pageSize } })
                    setListBill(res.data.data.bills)
                    setRecords(res.data.data.metadata.records)
                    dispatchAlert({ loading: false })
                    break;
                case PurchaseStatus.PROCESSING:
                    res = await BillService.getBill({ params: { user_id: userId, order_status: OrderStatus.PROCESSING, page_index: current - 1, page_size: pageSize } })
                    setListBill(res.data.data.bills)
                    setRecords(res.data.data.metadata.records)
                    dispatchAlert({ loading: false })
                    break;
                case PurchaseStatus.SUCCESS:
                    res = await BillService.getBill({ params: { user_id: userId, order_status: OrderStatus.SUCCESS, page_index: current - 1, page_size: pageSize } })
                    setListBill(res.data.data.bills)
                    setRecords(res.data.data.metadata.records)
                    dispatchAlert({ loading: false })
                    break;
                case PurchaseStatus.CANCELLED:
                    res = await BillService.getBill({ params: { user_id: userId, order_status: OrderStatus.CANCELLED, page_index: current - 1, page_size: pageSize } })
                    setListBill(res.data.data.bills)
                    setRecords(res.data.data.metadata.records)
                    dispatchAlert({ loading: false })
                    break;
                default:
                    break;
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleChangeStatusPurchase = (status: PurchaseStatus) => {
        setPurchaseStatus(status)
        setCurrent(1)
    }

    useEffect(() => {
        if (user) fetchBill(purchaseStatus, user.id, current, pageSize)
    }, [purchaseStatus, user, current, pageSize])

    return (
        <>
            <Helmet>
                <title>Đơn hàng - THOL </title>
                <meta name='description' content='Beginner friendly page for learning React Helmet.' />
            </Helmet>
            <div className="mx-auto max-w-[1112px] h-full py-8 px-4 bg-[#f5f5f5] my-8">
                <div className='flex'>
                    <div className='w-[244px]'>
                        <div className='flex flex-col'>
                            <NavLink to={RoutePath.Profile} className={({ isActive }) => clsx("pl-2 py-5 font-semibold cursor-pointer hover:text-main-orange-color", isActive && "text-main-orange-color")} >
                                Tài khoản của tôi
                            </NavLink>
                            <NavLink to={RoutePath.Purchase} className={({ isActive }) => clsx("pl-2 py-5 font-semibold cursor-pointer hover:text-main-orange-color", isActive && "text-main-orange-color")} >
                                Đơn hàng
                            </NavLink>
                        </div>
                    </div>
                    <div className='w-full'>
                        <section className='grid grid-cols-4 bg-white mb-10'>
                            <div className={clsx('col-span1 px-3 py-4 text-center cursor-pointer hover:text-main-orange-color', purchaseStatus === PurchaseStatus.ALL && 'border-b border-main-orange-color text-main-orange-color')} onClick={() => handleChangeStatusPurchase(PurchaseStatus.ALL)}>{PurchaseStatus.ALL}</div>
                            <div className={clsx('col-span1 px-3 py-4 text-center cursor-pointer hover:text-main-orange-color', purchaseStatus === PurchaseStatus.PROCESSING && 'border-b border-main-orange-color text-main-orange-color')} onClick={() => handleChangeStatusPurchase(PurchaseStatus.PROCESSING)}>Chờ xử lý</div>
                            <div className={clsx('col-span1 px-3 py-4 text-center cursor-pointer hover:text-main-orange-color', purchaseStatus === PurchaseStatus.SUCCESS && 'border-b border-main-orange-color text-main-orange-color')} onClick={() => handleChangeStatusPurchase(PurchaseStatus.SUCCESS)}>Thành công</div>
                            <div className={clsx('col-span1 px-3 py-4 text-center cursor-pointer hover:text-main-orange-color', purchaseStatus === PurchaseStatus.CANCELLED && 'border-b border-main-orange-color text-main-orange-color')} onClick={() => handleChangeStatusPurchase(PurchaseStatus.CANCELLED)}>Đã hủy</div>
                        </section>
                        {
                            listBill.length > 0
                                ?
                                <section className='flex flex-col gap-3'>
                                    {
                                        listBill.map((bill) =>
                                            <div className='p-6 bg-white' key={bill.id}>
                                                <div className='flex justify-between pb-2 border-b border-border-color'>
                                                    <div className='flex flex-col'>
                                                        <span>Mã đơn hàng: {bill.id}</span>
                                                        <span>Ngày mua: {format(bill.created_at, DATETIME_FORMAT)}</span>
                                                    </div>
                                                    {bill.order_status === OrderStatus.PROCESSING && bill.payment_status === false && <Tag color="red" className='h-fit'>Chờ thanh toán</Tag>}
                                                    {bill.order_status === OrderStatus.PROCESSING && bill.payment_status === true && <Tag color="green" className='h-fit'>Đã thanh toán</Tag>}
                                                    {bill.order_status === OrderStatus.SUCCESS && <span className='text-[#ee4d2d] text-xl uppercase'>Hoàn thành</span>}
                                                    {bill.order_status === OrderStatus.CANCELLED && <span className='text-[#ee4d2d] text-xl uppercase'>Đã hủy</span>}
                                                </div>
                                                {bill.items.map((item, index) =>
                                                    <div className='py-6 border-b border-border-color' key={`${bill.id}-${index}`}>
                                                        <div className='flex justify-between items-center gap-2' >
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
                                                    <span className='px-2 text-main-orange-color text-xl font-semibold'>{convertNumbertoMoney(bill.total_amount)}</span>
                                                </div>
                                                <div className={clsx('flex items-center', bill.order_status !== OrderStatus.CANCELLED ? 'justify-end' : 'justify-between')}>
                                                    {bill.order_status === OrderStatus.CANCELLED && <span className='text-category-title text-sm'>Đã hủy bởi bạn</span>}
                                                    <div className='flex gap-5'>
                                                        <button className="min-w-[150px] bg-main-orange-color py-[10px] px-[8px] hover:shadow-checkout-btn rounded-md border border-border-color text-white">
                                                            Mua lại
                                                        </button>
                                                        <button className="min-w-[150px] bg-[#ffffff] py-[10px] px-[8px] hover:shadow-checkout-btn rounded-md border border-border-color">
                                                            Xem chi tiết đơn hàng
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                </section>
                                :
                                <div className='bg-white h-[400px] flex justify-center items-center flex-col gap-3'>
                                    <img src='https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/return/5fafbb923393b712b964.png' className='w-[100px] h-[100px]' />
                                    <span> {`Bạn hiện không có đơn hàng nào`}</span>
                                </div>
                        }
                        <ConfigProvider theme={{
                            token: {
                                colorPrimary: "#F48220",
                                colorBgTextHover: "#ffffff"
                            }
                        }}>
                            <Pagination current={current} pageSize={pageSize} total={records} onChange={onChangePage} className='text-center mt-5' />
                        </ConfigProvider>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Purchase