import React, { useEffect, useState } from 'react'
import { BellOutlined } from '@ant-design/icons';
import "./ShowNotification.scss"
import { useNavigate } from 'react-router-dom';
import { RoutePathAdmin } from '@/layouts/AdminLayout';
import { useAppDispatch, useAppSelector } from '@/redux-toolkit/hook';
import { fetchBillNoti, markReadBill } from '@/redux-toolkit/billNotiSlice';
import { format } from 'date-fns';
const DATETIME_FORMAT = 'dd-MM-yyyy HH:mm'

const ShowNotification = () => {
    const [lengthNotis, setLengthNotis] = useState(4)
    const { bills, unread_records } = useAppSelector(state => state.billNoti)

    const navigate = useNavigate();
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchBillNoti())
    }, [])

    const handleNavigateNotification = () => {
        navigate(RoutePathAdmin.Notification)
    }

    const handleBillIsRead = (billId: number) => {
        navigate(`/admin/bill/detail/${billId}`)
    }

    return (
        <div className='relative dropdown'>
            <div className="absolute -top-2 -right-1 bg-button-red-color text-white w-4 h-4 rounded-full text-center cursor-pointer">
                <span className="text-xs font-semibold block">{unread_records}</span>
            </div>
            <BellOutlined className='text-2xl' onClick={handleNavigateNotification} />
            <div className="dropdown-content notification bg-[#f0f8ff] !min-w-[400px] right-0 top-[30px] p-4 shadow-search-box z-10">
                <ul className='max-h-[335px] overflow-y-auto'>
                    {bills.map((item) =>
                        <li className='flex justify-between items-center hover:bg-[rgba(0,0,0,.2)] rounded-md px-2' key={item.id} onClick={() => handleBillIsRead(item.id)}>
                            <div>
                                {item.user_id ?
                                    <p className=''>Mã đơn hàng {item.id} được mua bởi khách thành viên {item.customer_name}</p>
                                    :
                                    <p className=''>Mã đơn hàng {item.id} được mua bởi khách truy cập</p>
                                }
                                <span className='text-category-title text-sm'>{format(item.created_at, DATETIME_FORMAT)}</span>
                            </div>
                            {!item.is_read && <div className='min-w-[12px] h-[12px] bg-blue-600 rounded-full contents:" "'></div>}
                        </li>
                    )}
                </ul>
                <div className='text-center text-sm text-category-title cursor-pointer hover:text-[#1677ff]'>
                    <span onClick={() => { setLengthNotis(prev => prev + 4) }}>click to expand</span>
                </div>
            </div>
        </div>
    )
}

export default ShowNotification