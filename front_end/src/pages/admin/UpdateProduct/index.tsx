import { Button, Checkbox, Col, Form, Input, Row, Typography } from 'antd'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { ArrowLeftOutlined } from '@ant-design/icons';
import type { FormProps } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '@/redux-toolkit/hook';
import { IProductDetail } from '@/redux-toolkit/productSlice';
import { useAlertDispatch } from '@/contexts/AlertContext';
import CategoryService from '@/services/CategoryService';
import { UpdateProductDto, ICategory } from '@/types';
import * as yup from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { checkImage, imageUpload } from '@/utils';
import ProductService from '@/services/ProductService';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import categories from '@/assets/data/categoryList';

import "./UpdateProduct.scss"

const schema = yup
    .object().shape({
        name: yup.string().required('Yêu cầu nhập tên sản phẩm'),
        brand: yup.string().required('Yêu cầu nhập tên thương hiệu'),
        description: yup.string().required('Yêu cầu mô tả sản phẩm'),
        old_price: yup.number()
            .test('is-positive', 'Giá cũ phải lớn hơn giá mới', function (value) {
                const { new_price } = this.parent;
                if (value === 0) return true
                if (new_price !== undefined && value !== undefined) {
                    return value > new_price;
                }
                return true;
            }),
        new_price: yup.number().required('Yêu cầu nhập giá mới').moreThan(0, "Giá mới phải lớn hơn 0"),
        available: yup.number().required('Nhập số lượng sản phẩm')
    })

const UpdateProduct = () => {
    const [selectedProduct, setSelectedProduct] = useState<IProductDetail>()
    const [categoryList, setCategoryList] = useState<ICategory[]>([])
    const [selectedImage, setSelectedImage] = useState<File>();
    const [selectedCategories, setSelectedCategories] = useState<CheckboxValueType[]>()
    const [disabled, setDisabled] = useState(false)
    const products = useAppSelector(state => state.product)

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const dispatchAlert = useAlertDispatch()
    const navigate = useNavigate();
    const params = useParams()

    useEffect(() => {
        if (products.length > 0) {
            const selectedProduct = products.find(p => p.id === Number(params.id))
            setSelectedProduct(selectedProduct)
        }
    }, [products])

    useEffect(() => {
        const getProductById = async (id: number) => {
            dispatchAlert({ loading: true })
            try {
                const res = await ProductService.getProductById(id)
                setSelectedProduct(res.data.data)
                dispatchAlert({ loading: false })
            } catch (error) {
                console.log(error)
            }
        }

        if (params.id) getProductById(Number(params.id))
    }, [params.id])

    useEffect(() => {
        if (selectedProduct) {
            const selectedCategories = selectedProduct.categories.map((category) => category.category.id)
            setSelectedCategories(selectedCategories)
        }
    }, [selectedProduct])

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

    const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (files && files.length > 0) {
            const file = files[0];
            if (checkImage(file).length > 0) {
                dispatchAlert({ errors: checkImage(file) })
                return
            }
            else {
                setSelectedImage(file)
            }
        }
    }

    const onChangeCheckbox = (checkedValues: CheckboxValueType[]) => {
        setSelectedCategories(checkedValues)
    };

    const onSubmit = async (data: any) => {
        if (selectedProduct) {
            dispatchAlert({ loading: true })
            var image
            if (selectedImage) {
                const res = await imageUpload(selectedImage)
                image = res.url
            }
            const newData = { ...data, image: image ? image : undefined, category_ids: selectedCategories } as UpdateProductDto
            try {
                const res = await ProductService.updateProduct(selectedProduct.id, newData)
                dispatchAlert({ success: res.data.message })
                setDisabled(true)
                setTimeout(() => {
                    window.location.reload()
                }, 2000)
            } catch (error: any) {
                console.log(error)
                dispatchAlert({ errors: error.message[0] })
            }
        }
    };

    return (
        selectedProduct &&
        <>
            <Typography.Title level={3} className='text-center'>Cập nhật sản phẩm</Typography.Title>
            <Typography.Title level={4}>
                <ArrowLeftOutlined className='cursor-pointer hover:text-main-orange-color' onClick={() => navigate(-1)} />
            </Typography.Title>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="my-2">
                    <div className="font-semibold tracking-wide">Mã sản phẩm</div>
                    <input className="pl-2 w-1/2 h-[35px] border-[1px] border-[#adadad] rounded-sm" type={"text"} defaultValue={selectedProduct.id} disabled />
                </div>

                <div className="my-2">
                    <div className="label-email font-semibold tracking-wide">Tên sản phẩm</div>
                    <input className="pl-2 w-1/2 h-[35px] border-[1px] border-[#adadad] rounded-sm" type={"text"} {...register('name')} defaultValue={selectedProduct.name} />
                    {errors.name && <p className="text-red-500">{errors.name?.message}</p>}
                </div>

                <div className="my-2">
                    <div className="label-email font-semibold tracking-wide">Tên thương hiệu</div>
                    <input className="pl-2 w-1/2 h-[35px] border-[1px] border-[#adadad] rounded-sm" type={"text"} {...register('brand')} defaultValue={selectedProduct.brand} />
                    {errors.brand && <p className="text-red-500">{errors.brand?.message}</p>}
                </div>

                <div className="my-2">
                    <div className="label-email font-semibold tracking-wide">Mô tả</div>
                    <textarea className="pl-2 w-1/2 min-h-[100px] border-[1px] border-[#adadad] rounded-sm" {...register('description')} defaultValue={selectedProduct.description} />
                    {errors.description && <p className="text-red-500">{errors.description?.message}</p>}
                </div>

                <div className="my-2">
                    <div className="label-email font-semibold tracking-wide">Giá cũ sản phẩm</div>
                    <input className="pl-2 w-1/2 h-[35px] border-[1px] border-[#adadad] rounded-sm" type={"number"} {...register('old_price')} defaultValue={selectedProduct.old_price} />
                    {errors.old_price && <p className="text-red-500">{errors.old_price?.message}</p>}
                </div>

                <div className="my-2">
                    <div className="label-email font-semibold tracking-wide">Giá mới sản phẩm</div>
                    <input className="pl-2 w-1/2 h-[35px] border-[1px] border-[#adadad] rounded-sm" type={"number"} {...register('new_price')} defaultValue={selectedProduct.new_price} />
                    {errors.new_price && <p className="text-red-500">{errors.new_price?.message}</p>}
                </div>

                <div className="my-2">
                    <div className="label-email font-semibold tracking-wide">Số lượng sản phẩm</div>
                    <input className="pl-2 w-1/2 h-[35px] border-[1px] border-[#adadad] rounded-sm" type={"number"} {...register('available')} defaultValue={selectedProduct.available} />
                    {errors.available && <p className="text-red-500">{errors.available?.message}</p>}
                </div>

                <div className="my-2">
                    <div className="label-email font-semibold tracking-wide">Ảnh sản phẩm</div>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleChangeImage}
                        className='mb-2'
                    />
                    {selectedProduct && !selectedImage && <img
                        src={selectedProduct.image}
                        alt={`Preview`}
                        className="max-h-[100px] cursor-zoom-in hover:opacity-70"
                    />}
                    {selectedImage &&
                        <img
                            src={URL.createObjectURL(selectedImage)}
                            alt={`Preview`}
                            className="max-h-[100px] cursor-zoom-in hover:opacity-70"
                        />}
                </div>

                <div className="my-2">
                    <div className="label-email font-semibold tracking-wide">Danh mục sản phẩm</div>
                    <Checkbox.Group onChange={onChangeCheckbox} value={selectedCategories}>
                        <Row>
                            {
                                categoryList && categoryList.map((category) => {
                                    return (
                                        <Col span={8} key={category.id}>
                                            <Checkbox
                                                value={category.id}
                                                style={{ lineHeight: '32px' }}
                                            >
                                                {categories.map((cat) => {
                                                    if (cat.path === category.name) {
                                                        return cat.title;
                                                    }
                                                    return null;
                                                })}
                                            </Checkbox>
                                        </Col>
                                    )
                                })
                            }
                        </Row>
                    </Checkbox.Group>
                </div>
                {
                    !disabled &&
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                }
            </form >
        </>
    )

}

export default UpdateProduct