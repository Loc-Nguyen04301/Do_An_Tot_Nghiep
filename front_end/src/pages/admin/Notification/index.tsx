import React, { useEffect, useState } from 'react'
import { Segmented, Typography } from 'antd'
import { Helmet } from 'react-helmet-async'
import "./Notification.scss"
import { useAppDispatch, useAppSelector } from '@/redux-toolkit/hook'
import { useNavigate } from 'react-router-dom'
import { IBillNoti } from '@/redux-toolkit/billNotiSlice'
import { format } from 'date-fns';
import { RoutePath } from '@/routes'
import clsx from 'clsx'
const DATETIME_FORMAT = 'dd-MM-yyyy HH:mm'

const Notification = () => {
    const [stateNoti, setStateNoti] = useState<string | number>('All');
    const { billNotis, unread_records } = useAppSelector(state => state.billNoti)
    const [filterBillNotis, setFilterBillNotis] = useState<IBillNoti[]>([])

    const navigate = useNavigate()

    useEffect(() => {
        if (stateNoti !== 'All') {
            const filterBills = billNotis.filter((item) => item.is_read === false)
            setFilterBillNotis(filterBills)
        }
        else {
            setFilterBillNotis(billNotis)
        }
    }, [stateNoti, billNotis])

    const handleBillIsRead = (billId: number) => {
        navigate(`${RoutePath.UpdateBill}/${billId}`)
    }

    return (
        <>
            <Helmet>
                <title>Thông báo</title>
                <meta name='description' content='Beginner friendly page for learning React Helmet.' />
            </Helmet>
            <Typography.Title level={4}>Thông báo</Typography.Title>
            <div className='container mx-auto w-[700px]'>
                <Segmented size="large" options={['All', `Unread (${unread_records})`]} className='w-full bg-white !rounded-none p-2' value={stateNoti} onChange={setStateNoti} />
                <ul className='border-t-2 bg-white'>
                    {filterBillNotis && filterBillNotis.map(item =>
                        <li className={clsx('p-4 cursor-pointer flex justify-between items-center hover:bg-[rgba(0,0,0,.2)]', !item.is_read && 'bg-[#f0f8ff]')} key={item.id} onClick={() => handleBillIsRead(item.id)}>
                            <div>
                                {item.user_id ?
                                    <p className='text-lg'>Mã đơn hàng {item.id} được mua bởi khách thành viên {item.customer_name}</p>
                                    :
                                    <p className='text-lg'>Mã đơn hàng {item.id} được mua bởi khách truy cập</p>
                                }
                                <span className='text-category-title'>{format(item.created_at, DATETIME_FORMAT)}</span>
                            </div>
                            {!item.is_read && <div className='min-w-[12px] h-[12px] bg-blue-600 rounded-full contents:" "'></div>}
                        </li>
                    )}
                </ul>
            </div>
        </>
    )
}

export default Notification