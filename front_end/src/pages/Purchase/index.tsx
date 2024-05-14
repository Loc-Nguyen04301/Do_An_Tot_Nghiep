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

var DATETIME_FORMAT = 'dd/MM/yyyy HH:mm:ss'

enum PurchaseStatus {
    ALL = "Tất cả",
    WAIT_FOR_PAY = "Chờ thanh toán",
    WAIT_FOR_DELIVERY = "Chờ giao hàng",
    SUCCESS = "Hoàn thành",
    CANCELLED = "Đã hủy",
    RETURN = "Trả hàng/Hoàn tiền"
}

enum OrderStatus {
    PROCESSING = 'PROCESSING',
    SUCCESS = 'SUCCESS',
    CANCELLED = 'CANCELLED'
};

interface IBill {
    id: number;
    customer_name: string;
    address: string;
    phone_number: string;
    email: string;
    note: string;
    user_id: number | null;
    order_status: string;
    payment_status: boolean;
    return_status: string;
    payment_method: string;
    total_amount: number;
    created_at: string;
    update_at: string;
    items: IItem[];
}

interface IItem {
    product: { name: string, new_price: number, old_price: number, image: string };
    quantity: number;
    total_price: number;
}

const Purchase = () => {
    const [purchaseStatus, setPurchaseStatus] = useState<PurchaseStatus>(PurchaseStatus.ALL)
    const [listBill, setListBill] = useState<IBill[]>([])
    const { user } = useAppSelector(state => state.auth)
    const [current, setCurrent] = useState(1)
    const [pageSize, setPageSize] = useState(5)
    const [records, setRecords] = useState(0)

    const onChangePage: PaginationProps['onChange'] = (page) => {
        setCurrent(page);
    };

    const dispatchAlert = useAlertDispatch()

    const fetchBill = async (purchaseStatus: PurchaseStatus, userId: number, current: number, pageSize: number) => {
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
                case PurchaseStatus.WAIT_FOR_PAY:
                    res = await BillService.getBill({ params: { user_id: userId, payment_status: false, order_status: OrderStatus.PROCESSING, page_index: current - 1, page_size: pageSize } })
                    setListBill(res.data.data.bills)
                    setRecords(res.data.data.metadata.records)
                    dispatchAlert({ loading: false })
                    break;
                case PurchaseStatus.WAIT_FOR_DELIVERY:
                    res = await BillService.getBill({ params: { user_id: userId, payment_status: true, order_status: OrderStatus.PROCESSING, page_index: current - 1, page_size: pageSize } })
                    setListBill(res.data.data.bills)
                    setRecords(res.data.data.metadata.records)
                    dispatchAlert({ loading: false })
                    break;
                case PurchaseStatus.SUCCESS:
                    res = await BillService.getBill({ params: { user_id: userId, payment_status: true, order_status: OrderStatus.SUCCESS, page_index: current - 1, page_size: pageSize } })
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
        if (user.id) fetchBill(purchaseStatus, user.id, current, pageSize)
    }, [purchaseStatus, user.id, current, pageSize])

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
                        <section className='grid grid-cols-5 bg-white mb-10'>
                            <div className={clsx('col-span1 px-3 py-4 text-center cursor-pointer hover:text-main-orange-color', purchaseStatus === PurchaseStatus.ALL && 'border-b border-main-orange-color text-main-orange-color')} onClick={() => handleChangeStatusPurchase(PurchaseStatus.ALL)}>{PurchaseStatus.ALL}</div>
                            <div className={clsx('col-span1 px-3 py-4 text-center cursor-pointer hover:text-main-orange-color', purchaseStatus === PurchaseStatus.WAIT_FOR_PAY && 'border-b border-main-orange-color text-main-orange-color')} onClick={() => handleChangeStatusPurchase(PurchaseStatus.WAIT_FOR_PAY)}>{PurchaseStatus.WAIT_FOR_PAY}</div>
                            <div className={clsx('col-span1 px-3 py-4 text-center cursor-pointer hover:text-main-orange-color', purchaseStatus === PurchaseStatus.WAIT_FOR_DELIVERY && 'border-b border-main-orange-color text-main-orange-color')} onClick={() => handleChangeStatusPurchase(PurchaseStatus.WAIT_FOR_DELIVERY)}>{PurchaseStatus.WAIT_FOR_DELIVERY}</div>
                            <div className={clsx('col-span1 px-3 py-4 text-center cursor-pointer hover:text-main-orange-color', purchaseStatus === PurchaseStatus.SUCCESS && 'border-b border-main-orange-color text-main-orange-color')} onClick={() => handleChangeStatusPurchase(PurchaseStatus.SUCCESS)}>{PurchaseStatus.SUCCESS}</div>
                            <div className={clsx('col-span1 px-3 py-4 text-center cursor-pointer hover:text-main-orange-color', purchaseStatus === PurchaseStatus.CANCELLED && 'border-b border-main-orange-color text-main-orange-color')} onClick={() => handleChangeStatusPurchase(PurchaseStatus.CANCELLED)}>{PurchaseStatus.CANCELLED}</div>
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
                                                    {bill.order_status === OrderStatus.PROCESSING && bill.payment_status === true && <Tag color="cyan" className='h-fit'>Chờ giao hàng</Tag>}
                                                    {bill.order_status === OrderStatus.SUCCESS && <span className='text-[#ee4d2d] text-xl uppercase'>Hoàn thành</span>}
                                                    {bill.order_status === OrderStatus.CANCELLED && <span className='text-[#ee4d2d] text-xl uppercase'>Đã hủy</span>}
                                                </div>
                                                {bill.items.map((item, index) =>
                                                    <div className='py-6 border-b border-border-color flex justify-between' key={`${bill.id}-${index}`}>
                                                        <div className='flex gap-2'>
                                                            <img src={item.product.image} width={80} />
                                                            <div className='flex flex-col justify-center'>
                                                                <span>{item.product.name} </span>
                                                                <span className='text-sm font-semibold'>x {item.quantity}</span>
                                                            </div>
                                                        </div>
                                                        <div className='flex gap-2'>
                                                            {
                                                                item.product.old_price != 0 &&
                                                                <del className='text-category-title'>{convertNumbertoMoney(item.product.old_price)}</del>
                                                            }
                                                            <span className='text-main-orange-color'>{convertNumbertoMoney(item.product.new_price)}</span>
                                                        </div>
                                                    </div>)}
                                                <div className='py-6 text-right'>
                                                    <span className='px-2'>Thành tiền:</span>
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
                                    <span> {`Bạn hiện không có đơn hàng ${purchaseStatus} nào`}</span>
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