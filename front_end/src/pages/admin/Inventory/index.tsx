import React, { useCallback, useEffect, useState } from 'react'
import { DeleteOutlined, BarsOutlined } from '@ant-design/icons';
import { Avatar, ConfigProvider, Modal, Rate, Space, Table, TableProps, Typography } from 'antd';
import { convertNumbertoMoney } from '@/utils';
import { deleteProduct, IProductDetail, retrieveProducts } from '@/redux-toolkit/productSlice';
import { useAppDispatch, useAppSelector } from '@/redux-toolkit/hook';
import { useAlertDispatch } from '@/contexts/AlertContext';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from '@/routes';
import { Helmet } from 'react-helmet-async';

import "./Inventory.scss"

const Inventory = () => {
    const products = useAppSelector(state => state.product)
    const [isModalOpen, setIsModalOpen] = useState(false);

    const dispatch = useAppDispatch()
    const dispatchAlert = useAlertDispatch()

    const navigate = useNavigate()

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleDeleteProduct = (product: IProductDetail) => {
        dispatchAlert({ loading: true })
        dispatch(deleteProduct({ id: product.id }))
            .then((res) => {
                dispatchAlert({ success: "Xóa sản phẩm thành công", loading: false })
            })
            .catch(e => console.log(e))
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleUpdateProduct = (id: number) => {
        navigate(`${RoutePath.UpdateProduct}/${id}`)
    }

    const getProducts = useCallback(() => {
        dispatchAlert({ loading: true })
        dispatch(retrieveProducts()).then((res) => dispatchAlert({ loading: false }))
    }, [dispatch])

    useEffect(() => {
        getProducts()
    }, [getProducts]);

    const columns: TableProps<IProductDetail>['columns'] = [
        {
            title: "Thumbnail",
            key: "thumbnail",
            render: (_, record) => <Avatar src={record.image} />
        },
        {
            title: "Tên sản phẩm",
            key: "name",
            render: (_, record) => record.name
        },
        {
            title: "Giá cũ",
            key: "oldprice",
            render: (_, record) => record.old_price !== 0 && <del>{convertNumbertoMoney(record.old_price)}</del>
        },
        {
            title: "Giá mới",
            key: "newprice",
            render: (_, record) => <span>{convertNumbertoMoney(record.new_price)}</span >,
        },
        {
            title: "Đánh giá",
            render: (_, record) => {
                return <Rate value={record.averageRating} allowHalf disabled />;
            },
        },
        {
            title: "Stock",
            key: "available",
            render: (_, record) => record.available
        },
        {
            title: "Thương hiệu",
            key: "brand",
            render: (_, record) => <strong>{record.brand}</strong>
        },
        {
            title: "Loại sản phẩm",
            key: "category",
            render: (_, record) =>
                <Space direction='vertical' >
                    {record.categories.map((category) => <strong>{category.category.name}</strong>)}
                </Space>
        },
        {
            title: '',
            key: 'deleteItem',
            render: (_, record) =>
                <div className='flex items-center' >
                    <div className='flex gap-2'>
                        <BarsOutlined className='text-blue-500 text-2xl cursor-pointer transform hover:scale-125' onClick={() => handleUpdateProduct(record.id)} />
                        <DeleteOutlined className='text-red-500 text-2xl cursor-pointer transform hover:scale-125' onClick={showModal} />
                    </div>
                    <ConfigProvider theme={{
                        token: {
                            colorPrimary: '#f48220'
                        }
                    }}>
                        <Modal centered title={<p className='text-red-500'>Xóa sản phẩm {`${record.name}`}</p>} open={isModalOpen} onOk={() => handleDeleteProduct(record)} onCancel={handleCancel}>
                            <p className='text-base'>Bạn muốn xóa sản phẩm này khỏi kho hay không ?</p>
                        </Modal>
                    </ConfigProvider>
                </div >
        },
    ]
    return (
        <>
            <Helmet>
                <title>Kho hàng</title>
                <meta name='description' content='Beginner friendly page for learning React Helmet.' />
            </Helmet>
            <Typography.Title level={4}>Kho hàng</Typography.Title>
            <Space direction="horizontal" className='w-full justify-center !block'>
                <Table
                    columns={columns}
                    dataSource={products}
                    pagination={false}
                ></Table>
            </Space>
        </>
    )
}

export default Inventory