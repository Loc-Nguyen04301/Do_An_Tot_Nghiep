import { BellOutlined } from '@ant-design/icons';
import "./ShowNotification.scss"
import { Link, useNavigate } from 'react-router-dom';
import { RoutePathAdmin } from '@/layouts/AdminLayout';
import { useAppSelector } from '@/redux-toolkit/hook';
import { format } from 'date-fns';
import { RoutePath } from '@/routes';
const DATETIME_FORMAT = 'dd-MM-yyyy HH:mm'

const ShowNotification = () => {
    const { bills, unread_records } = useAppSelector(state => state.billNoti)
    const navigate = useNavigate();

    const handleNavigateNotification = () => {
        navigate(RoutePathAdmin.Notification)
    }

    const handleBillIsRead = (billId: number) => {
        navigate(`${RoutePath.UpdateBill}/${billId}`)
    }

    return (
        <div className='relative dropdown'>
            <div className="absolute -top-2 -right-1 bg-button-red-color text-white w-[18px] h-[18px] leading-[18px] rounded-full text-center cursor-pointer">
                <span className="text-xs font-semibold block">{unread_records}</span>
            </div>
            <BellOutlined className='text-2xl' onClick={handleNavigateNotification} />
            <div className="dropdown-content notification bg-[#f0f8ff] !min-w-[400px] right-0 top-[30px] p-6 shadow-search-box z-10">
                <ul className='max-h-[315px] overflow-y-auto'>
                    {bills.slice(0, 10).map((bill) =>
                        <li className='flex justify-between items-center hover:bg-[rgba(0,0,0,.2)] rounded-md px-2 py-2' key={bill.id} onClick={() => handleBillIsRead(bill.id)}>
                            <div>
                                {bill.user_id ?
                                    <p className=''>Mã đơn hàng {bill.id} được mua bởi khách thành viên {bill.customer_name}</p>
                                    :
                                    <p className=''>Mã đơn hàng {bill.id} được mua bởi khách truy cập</p>
                                }
                                <span className='text-category-title text-sm'>{format(bill.created_at, DATETIME_FORMAT)}</span>
                            </div>
                            {!bill.is_read && <div className='min-w-[12px] h-[12px] bg-blue-600 rounded-full contents:" "'></div>}
                        </li>
                    )}
                    <div className='text-center mt-4'>
                        <span onClick={() => { window.location.href = RoutePath.Notification }} className='hover:text-blue-400'>Xem tất cả thông báo</span>
                    </div>
                </ul>
            </div>
        </div>
    )
}

export default ShowNotification