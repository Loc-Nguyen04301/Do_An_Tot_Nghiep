import React, { useEffect, useMemo } from 'react'
import { socket } from "@/socket";
import { createBillNoti } from "@/redux-toolkit/billNotiSlice";
import { useAppDispatch } from '@/redux-toolkit/hook';
import { notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from '@/routes';
import notificationSound from '@/assets/audios/notificationSound.mp3';

const audio = new Audio(notificationSound);

const useBillNotification = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    useEffect(() => {
        socket.on('BILL_NOTIFICATION', (bill) => {
            dispatch(createBillNoti({ ...bill, is_read: false }))

            notification.info({
                message: `Thông báo mới`,
                description: (
                    bill.user_id
                        ? `Mã đơn hàng ${bill.id} được mua bởi khách thành viên ${bill.customer_name}`
                        : `Mã đơn hàng ${bill.id} được mua bởi khách truy cập`
                ),
                onClick: () => {
                    navigate(`${RoutePath.UpdateBill}/${bill.id}`)
                },
                placement: "bottomLeft",
                duration: 5
            });

            audio.play();
        })

        return () => {
            socket.off('BILL_NOTIFICATION');
        };
    }, [])

}

export default useBillNotification