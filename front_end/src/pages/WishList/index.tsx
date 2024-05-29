import React from 'react'
import { Table, TableProps } from 'antd'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom';
import { IProductItem } from '@/redux-toolkit/cartSlice';
import { convertNumbertoMoney } from '@/utils';
import { RoutePath } from '@/routes';

const WishList = () => {

    const columns: TableProps<IProductItem>['columns'] = [
        {
            title: "SẢN PHẨM",
            key: "name",
            render: (_, record) => <div>
                <Link to={`${RoutePath.DetailProduct}/${record.id}`} className='hover:text-[#334862] text-base'>
                    <div className='flex items-center max-xs:flex-col max-xs:text-center gap-2'>
                        <img src={record.image} width={70} />
                        <div>{record.name}</div>
                    </div>
                </Link>
            </div>
        },
        {
            title: 'ĐƠN GIÁ',
            key: 'price',
            render: (_, record) => <div>
                <div className='flex items-center'>
                    <div className='font-bold'>{convertNumbertoMoney(record.new_price)}</div>
                </div>
            </div>
        },
        {
            title: 'Trạng thái',
            key: 'totalPrice',
            render: (_, record) => <div className='flex items-center'>
                <div className='font-bold'>{convertNumbertoMoney(record.totalPrice)}</div>
            </div>
        },
        {
            title: '',
            key: 'deleteItem',
            render: (_, record) =>
                <div className=''>
                    Add to cart
                </div >
        },
    ];
    return (
        <>
            <Helmet>
                <title>Sản phẩm yêu thích - THOL </title>
                <meta name='description' content='Beginner friendly page for learning React Helmet.' />
            </Helmet>
            <div className='mx-auto max-w-[1140px] py-8 px-2'>
                <div className='px-2'>
                    <h1 className="text-category-title text-2xl font-bold pb-2 w-fit tracking-wide">
                        My Wishlist
                    </h1>
                    <div>
                        <Table columns={columns} dataSource={data} pagination={false} rowKey={(record) => record.id} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default WishList