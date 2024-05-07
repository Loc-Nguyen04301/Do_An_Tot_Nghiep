import { Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import {
    ArrowLeftOutlined
} from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '../../../redux-toolkit/hook';
import { IProductDetail } from '../../../redux-toolkit/productSlice';

const UpdateProduct = () => {
    const [selectedProduct, setSelectedProduct] = useState<IProductDetail>()
    const navigate = useNavigate();
    const params = useParams()
    console.log(params)
    const products = useAppSelector(state => state.product)

    useEffect(() => {
        if (products.length > 0) {
            const selectedProduct = products.find(p => p.id === Number(params.id))
            setSelectedProduct(selectedProduct)
        }
    }, [products])
    console.log({ selectedProduct })

    return (
        <>
            <Typography.Title level={4}>
                <ArrowLeftOutlined className='cursor-pointer hover:text-main-orange-color' onClick={() => navigate(-1)} />
            </Typography.Title>
        </>
    )
}

export default UpdateProduct