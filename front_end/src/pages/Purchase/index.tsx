import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { NavLink } from 'react-router-dom'
import { RoutePath } from '../../routes'
import clsx from 'clsx';

enum PurchaseStatus {
    ALL = "Tất cả",
    WAIT_FOR_PAY = "Chờ thanh toán",
    WAIT_FOR_DELIVERY = "Chờ giao hàng",
    SUCCESS = "Hoàn thành",
    CANCELLED = "Đã hủy",
    RETURN = "Trả hàng/Hoàn tiền"
}

const Purchase = () => {
    const [purchaseStatus, setPurchaseStatus] = useState<PurchaseStatus>(PurchaseStatus.ALL)
    return (
        <>
            <Helmet>
                <title>Đơn hàng - THOL </title>
                <meta name='description' content='Beginner friendly page for learning React Helmet.' />
            </Helmet>
            <div className="mx-auto max-w-[1112px] py-8 px-4 bg-[#f5f5f5] my-8">
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
                    <div className='w-full '>
                        <section className='grid grid-cols-5 bg-white'>
                            <div className={clsx('col-span1 px-3 py-4 text-center cursor-pointer hover:text-main-orange-color', purchaseStatus === PurchaseStatus.ALL && 'border-b border-main-orange-color text-main-orange-color')} onClick={() => setPurchaseStatus(PurchaseStatus.ALL)}>{PurchaseStatus.ALL}</div>
                            <div className={clsx('col-span1 px-3 py-4 text-center cursor-pointer hover:text-main-orange-color', purchaseStatus === PurchaseStatus.WAIT_FOR_PAY && 'border-b border-main-orange-color text-main-orange-color')} onClick={() => setPurchaseStatus(PurchaseStatus.WAIT_FOR_PAY)}>{PurchaseStatus.WAIT_FOR_PAY}</div>
                            <div className={clsx('col-span1 px-3 py-4 text-center cursor-pointer hover:text-main-orange-color', purchaseStatus === PurchaseStatus.WAIT_FOR_DELIVERY && 'border-b border-main-orange-color text-main-orange-color')} onClick={() => setPurchaseStatus(PurchaseStatus.WAIT_FOR_DELIVERY)}>{PurchaseStatus.WAIT_FOR_DELIVERY}</div>
                            <div className={clsx('col-span1 px-3 py-4 text-center cursor-pointer hover:text-main-orange-color', purchaseStatus === PurchaseStatus.SUCCESS && 'border-b border-main-orange-color text-main-orange-color')} onClick={() => setPurchaseStatus(PurchaseStatus.SUCCESS)}>{PurchaseStatus.SUCCESS}</div>
                            <div className={clsx('col-span1 px-3 py-4 text-center cursor-pointer hover:text-main-orange-color', purchaseStatus === PurchaseStatus.CANCELLED && 'border-b border-main-orange-color text-main-orange-color')} onClick={() => setPurchaseStatus(PurchaseStatus.CANCELLED)}>{PurchaseStatus.CANCELLED}</div>
                        </section>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Purchase