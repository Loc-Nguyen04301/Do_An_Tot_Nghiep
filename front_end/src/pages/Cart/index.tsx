import React from 'react'
import { Helmet } from 'react-helmet-async'
import { NavLink } from 'react-router-dom'
import { RoutePath } from '../../routes'
import { RightOutlined } from '@ant-design/icons';
import { Space, Table, TableProps, Tag } from 'antd';

interface DataType {
    key: string;
    name: string;
    price: number;
    number: number;
    totalPrice: number;
}

const Cart = () => {
    const columns: TableProps<DataType>['columns'] = [
        {
            title: "SẢN PHẨM",
            key: "name",
            dataIndex: "name",
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'ĐƠN GIÁ',
            key: 'price',
            dataIndex: "price"
        },
        {
            title: 'SỐ LƯỢNG',
            key: 'number',
            dataIndex: "number"
        },
        {
            title: 'TẠM TÍNH',
            key: 'totalPrice',
            dataIndex: "totalPrice"
        },
    ];

    const data: DataType[] = [
        {
            key: '1',
            name: 'John Brown',
            price: 1000,
            number: 2,
            totalPrice: 100
        },
        {
            key: '2',
            name: 'Jim Green',
            price: 1000,
            number: 3,
            totalPrice: 100
        },
        {
            key: '3',
            name: 'Joe Black',
            price: 2000,
            number: 4,
            totalPrice: 100
        },
    ];
    return (
        <>
            <Helmet>
                <title>Giỏ hàng - THOL</title>
                <meta name='description' content='Beginner friendly page for learning React Helmet.' />
            </Helmet>
            <div className="max-w-[1140px] container mx-auto">
                <div className='my-12 text-center'>
                    <NavLink to={RoutePath.CartPage} className={({ isActive }) => isActive ? "mx-5 text-2xl text-main-orange-color" : "mx-5 text-2xl hover:text-main-orange-color"}>SHOPPING CART</NavLink>
                    <RightOutlined className='text-text-gray' />
                    <NavLink to={RoutePath.CheckoutPage} className={({ isActive }) => isActive ? "mx-5 text-2xl text-main-orange-color" : "mx-5 text-2xl hover:text-main-orange-color"}>CHECKOUT DETAILS</NavLink>
                </div>
                <div className="pb-[50px]">
                    <div className='grid grid-cols-12 gap-3'>
                        <div className='col-span-9'>
                            <Table columns={columns} dataSource={data} />
                        </div>
                        <div className=''>b</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Cart