import React, { useEffect, useState } from 'react';
import { socket } from "@/socket";
import { createBillNoti } from "@/redux-toolkit/billNotiSlice";
import { useAppDispatch } from '@/redux-toolkit/hook';
import { notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from '@/routes';
import notificationSound from '@/assets/audios/notificationSound.mp3';
import addNotification from 'react-push-notification';

const audio = new Audio(notificationSound);

const NotificationBill = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch()
    const [api, contextHolder] = notification.useNotification();

    useEffect(() => {
        socket.on('BILL_NOTIFICATION', (bill) => {
            dispatch(createBillNoti({ ...bill, is_read: false }));

            // push notification UI
            api.info({
                message: `Thông báo mới`,
                description: bill.user_id
                    ? `Mã đơn hàng ${bill.id} được mua bởi khách thành viên ${bill.customer_name}`
                    : `Mã đơn hàng ${bill.id} được mua bởi khách truy cập`,
                onClick: () => {
                    navigate(`${RoutePath.UpdateBill}/${bill.id}`);
                },
                placement: "bottomLeft",
                duration: 5
            });

            // push notification Desktop
            addNotification({
                title: 'Thông báo mới',
                message: bill.user_id
                    ? `Mã đơn hàng ${bill.id} được mua bởi khách thành viên ${bill.customer_name}`
                    : `Mã đơn hàng ${bill.id} được mua bởi khách truy cập`,
                theme: 'darkblue',
                duration: 5000,
                native: true
            });

            audio.play()
        });

        return () => {
            socket.off('BILL_NOTIFICATION');
        };
    }, [dispatch, api]);

    return <>{contextHolder}</>
};

export default NotificationBill;
