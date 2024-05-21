import React from 'react'
import { Segmented, Typography } from 'antd'
import { Helmet } from 'react-helmet-async'
import "./Notification.scss"

const Notification = () => {
    return (
        <>
            <Helmet>
                <title>Thông báo</title>
                <meta name='description' content='Beginner friendly page for learning React Helmet.' />
            </Helmet>
            <Typography.Title level={4}>Thông báo</Typography.Title>
            <div className='container mx-auto w-[700px]'>
                <Segmented size="large" options={['All', 'Unread']} className='w-full bg-white !rounded-none p-2' />
                <ul className='border-t-2  bg-white'>
                    {Array.from({ length: 20 }, (_i, index) =>
                        <li className='p-4 cursor-pointer' key={index}>
                            <p className='text-lg'>Mã đơn hàng 57 được mua bởi khách thành viên Nguyễn Văn Đạt</p>
                            <span className='text-category-title'>14/05/2022 14:30</span>
                        </li>
                    )}

                </ul>
            </div>
        </>
    )
}

export default Notification