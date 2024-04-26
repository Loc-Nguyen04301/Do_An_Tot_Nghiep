import React, { ChangeEvent, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { NavLink } from 'react-router-dom'
import { RoutePath } from '../../routes'
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { LoadingOutlined } from '@ant-design/icons';

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
    const [search, setSearch] = useState<string>()
    const [loading, setLoading] = useState(false)

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }

    const handleSearchPurchase = () => {

    }
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
                    <div className='w-full'>
                        <section className='grid grid-cols-5 bg-white'>
                            <div className={clsx('col-span1 px-3 py-4 text-center cursor-pointer hover:text-main-orange-color', purchaseStatus === PurchaseStatus.ALL && 'border-b border-main-orange-color text-main-orange-color')} onClick={() => setPurchaseStatus(PurchaseStatus.ALL)}>{PurchaseStatus.ALL}</div>
                            <div className={clsx('col-span1 px-3 py-4 text-center cursor-pointer hover:text-main-orange-color', purchaseStatus === PurchaseStatus.WAIT_FOR_PAY && 'border-b border-main-orange-color text-main-orange-color')} onClick={() => setPurchaseStatus(PurchaseStatus.WAIT_FOR_PAY)}>{PurchaseStatus.WAIT_FOR_PAY}</div>
                            <div className={clsx('col-span1 px-3 py-4 text-center cursor-pointer hover:text-main-orange-color', purchaseStatus === PurchaseStatus.WAIT_FOR_DELIVERY && 'border-b border-main-orange-color text-main-orange-color')} onClick={() => setPurchaseStatus(PurchaseStatus.WAIT_FOR_DELIVERY)}>{PurchaseStatus.WAIT_FOR_DELIVERY}</div>
                            <div className={clsx('col-span1 px-3 py-4 text-center cursor-pointer hover:text-main-orange-color', purchaseStatus === PurchaseStatus.SUCCESS && 'border-b border-main-orange-color text-main-orange-color')} onClick={() => setPurchaseStatus(PurchaseStatus.SUCCESS)}>{PurchaseStatus.SUCCESS}</div>
                            <div className={clsx('col-span1 px-3 py-4 text-center cursor-pointer hover:text-main-orange-color', purchaseStatus === PurchaseStatus.CANCELLED && 'border-b border-main-orange-color text-main-orange-color')} onClick={() => setPurchaseStatus(PurchaseStatus.CANCELLED)}>{PurchaseStatus.CANCELLED}</div>
                        </section>
                        <section className='my-6 marker:bg-[#eaeaea]'>
                            <div className="h-[34px] w-full relative">
                                <input
                                    type="text"
                                    placeholder="Tìm kiếm..."
                                    className="px-2 text-placeholder-color w-full h-full"
                                    value={search}
                                    onChange={handleChange}
                                />
                                {
                                    loading
                                        ?
                                        <LoadingOutlined
                                            className="absolute right-3 top-[8px]" />
                                        :
                                        <div className='absolute right-3 top-[8px] w-[30px] cursor-pointer text-center' onClick={handleSearchPurchase}>
                                            <FontAwesomeIcon
                                                icon={faMagnifyingGlass}
                                            />
                                        </div>
                                }
                            </div>
                        </section>
                        <section className='flex flex-col gap-3'>
                            {Array.from({ length: 3 }, (item) =>
                                <div className='p-6 bg-white'>
                                    <div className='flex justify-between pb-2 border-b border-border-color'>
                                        <span>2024-04-23</span>
                                        <span className='text-[#ee4d2d] text-xl uppercase'>Đã hủy</span>
                                    </div>
                                    <div>
                                        {Array.from({ length: 3 }, (item) =>
                                            <div className='py-6 border-b border-border-color flex justify-between'>
                                                <div className='flex gap-2'>
                                                    <img src="https://down-vn.img.susercontent.com/file/26df63e39638fab257712b219ca2482a_tn" width={80} />
                                                    <div>Lăn nách đá khoáng Nhật Bản Soft Stone Crystal x 1</div>
                                                </div>
                                                <div className='flex gap-2'>
                                                    <span>207.000</span>
                                                    <span>169.000</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className=''>
                                        <div className='py-6 text-right'>
                                            <span className='px-2 text-category-title'>Thành tiền:</span>
                                            <span className='px-2'>₫564.400</span>
                                        </div>
                                        <div className='group-button flex justify-between items-center'>
                                            <span className='text-category-title text-sm'>Đã hủy bởi bạn</span>
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
                                </div>)}
                        </section>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Purchase