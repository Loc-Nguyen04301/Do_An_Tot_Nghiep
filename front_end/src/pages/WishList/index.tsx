import React from 'react'
import { Table, TableProps } from 'antd'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom';
import { convertNumbertoMoney } from '@/utils';
import { RoutePath } from '@/routes';
import { CloseOutlined } from '@ant-design/icons';
import { IProductWishList, removeProductToWishList } from '@/redux-toolkit/wishListSlice';
import { useAppDispatch, useAppSelector } from '@/redux-toolkit/hook';
import { useAlertDispatch } from '@/contexts/AlertContext';
import { addItemToCart } from '@/redux-toolkit/cartSlice';

const WishList = () => {
    const { wishList } = useAppSelector((state) => state.wishList)

    const dispatch = useAppDispatch()
    const dispatchAlert = useAlertDispatch()

    const addProductToCart = (product: any) => {
        dispatchAlert({ loading: true })
        setTimeout(() => {
            dispatch(addItemToCart({ ...product }))
            dispatch(removeProductToWishList({ id: product.id }))
            dispatchAlert({ loading: false, success: "Thêm vào giỏ hàng thành công" })
        }, 1000)
    }

    const handleRemoveItemToWishList = (id: number) => {
        dispatchAlert({ loading: true })
        setTimeout(() => {
            dispatch(removeProductToWishList({ id }))
            dispatchAlert({ loading: false })
        }, 1000)
    }

    const columns: TableProps<IProductWishList>['columns'] = [
        {
            title: '',
            key: 'deleteItem',
            render: (_, record) =>
                <CloseOutlined className='ml-4 cursor-pointer text-xl hover:text-main-orange-color' onClick={() => { handleRemoveItemToWishList(record.id) }} />
        },
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
            title: 'GIÁ TIỀN',
            key: 'price',
            render: (_, record) => <div>
                <div className='flex justify-start gap-2'>
                    {record.old_price != 0 && <span className="line-through text-category-title">{convertNumbertoMoney(record.old_price)}</span>}
                    <span className="font-semibold">{convertNumbertoMoney(record.new_price)}</span>
                </div>
            </div>
        },
        {
            title: 'TRẠNG THÁI',
            key: 'totalPrice',
            render: (_, record) =>
                <div>
                    Còn hàng
                </div>
        },
        {
            title: '',
            key: 'deleteItem',
            render: (_, record) =>
                <span className='cursor-pointer' onClick={() => { addProductToCart(record) }}>
                    Thêm vào giỏ hàng
                </span>
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
                    <h1 className="text-category-title text-2xl font-bold pb-5 w-fit tracking-wide">
                        Sản phẩm yêu thích
                    </h1>
                    <div>
                        <Table columns={columns} dataSource={wishList} pagination={false} rowKey={(record) => record.id} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default WishList