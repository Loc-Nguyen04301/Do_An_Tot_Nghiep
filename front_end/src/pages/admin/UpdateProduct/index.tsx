import { Button, Checkbox, Col, Form, Input, Row, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import {
    ArrowLeftOutlined
} from '@ant-design/icons';
import type { FormProps } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '@/redux-toolkit/hook';
import { IProductDetail } from '@/redux-toolkit/productSlice';

import "./UpdateProduct.scss"
import { useAlertDispatch } from '@/contexts/AlertContext';
import CategoryService from '@/services/CategoryService';
import { ICategory } from '@/types';

type FieldType = {
    name?: string;
    brand?: string;
    description?: string;
    old_price?: number;
    new_price?: number;
    image?: string;
    categoryIds?: number[];
    available?: number;
};

const UpdateProduct = () => {
    const [selectedProduct, setSelectedProduct] = useState<IProductDetail>()
    const products = useAppSelector(state => state.product)
    const [categoryList, setCategoryList] = useState<ICategory[]>([])

    const dispatchAlert = useAlertDispatch()

    const navigate = useNavigate();
    const params = useParams()
    console.log(params)

    useEffect(() => {
        if (products.length > 0) {
            const selectedProduct = products.find(p => p.id === Number(params.id))
            setSelectedProduct(selectedProduct)
        }
    }, [products])

    const getCategoryList = async () => {
        dispatchAlert({ loading: true })
        try {
            const res = await CategoryService.getAll()
            setCategoryList(res.data.data)
            dispatchAlert({ loading: false })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getCategoryList()
    }, [])

    console.log({ selectedProduct, categoryList })

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    }

    return (
        <>
            <Typography.Title level={4}>
                <ArrowLeftOutlined className='cursor-pointer hover:text-main-orange-color' onClick={() => navigate(-1)} />
            </Typography.Title>

            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{}}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item<FieldType>
                    label="Tên sản phẩm"
                    name="name"
                    rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm !' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Thương hiệu"
                    name="brand"
                    rules={[{ required: true, message: 'Vui lòng nhập tên thương hiệu !' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Mô tả"
                    name="description"
                    rules={[{ required: true, message: 'Vui lòng nhập tên mô tả sản phẩm !' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Giá cũ"
                    name="old_price"
                    rules={[{ required: true, message: 'Vui lòng nhập giá cũ !' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Giá mới"
                    name="new_price"
                    rules={[{ required: true, message: 'Vui lòng nhập giá mới !' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Số lượng"
                    name="available"
                    rules={[{ required: true, message: 'Vui lòng nhập số lượng tồn kho!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="categoryIds"
                    label="Checkbox.Group"
                >
                    <Checkbox.Group>
                        <Row>
                            {
                                categoryList && categoryList.map((category) =>
                                    <Col span={8} key={category.id}>
                                        <Checkbox value={category.id} style={{ lineHeight: '32px' }}>
                                            {category.name}
                                        </Checkbox>
                                    </Col>
                                )
                            }
                        </Row>
                    </Checkbox.Group>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}

export default UpdateProduct