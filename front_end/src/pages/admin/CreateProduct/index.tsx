import React, { ChangeEvent, useState } from 'react'
import { Button, Checkbox, Col, Row, Typography } from 'antd'
import {
    ArrowLeftOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAlertDispatch } from '@/contexts/AlertContext';
import { CreateProductDto } from '@/types';
import { checkImage, imageUpload } from '@/utils';
import * as yup from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ProductService from '@/services/ProductService';
import { RoutePath } from '@/routes';
import { Helmet } from 'react-helmet-async';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import "../UpdateProduct/UpdateProduct.scss"
import { useAppSelector } from '@/redux-toolkit/hook';

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

const CreateProduct = () => {
    const [selectedImage, setSelectedImage] = useState<File>();
    const { categoryList } = useAppSelector((state) => state.category)
    const [selectedCategories, setSelectedCategories] = useState<CheckboxValueType[]>()
    const [disabled, setDisabled] = useState(false)

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            old_price: 0,
        }
    });

    const dispatchAlert = useAlertDispatch()
    const navigate = useNavigate();

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
        dispatchAlert({ loading: true })
        var image: string = ""
        if (selectedImage) {
            const res = await imageUpload(selectedImage)
            image = res.url
        }
        const newData = { ...data, image, category_ids: selectedCategories } as CreateProductDto
        try {
            const res = await ProductService.createProduct(newData)
            dispatchAlert({ success: res.data.message })
            setDisabled(true)
            setTimeout(() => {
                navigate(RoutePath.Inventory)
            }, 2000)
        } catch (error: any) {
            if (error.message.length > 0) dispatchAlert({ errors: error.message[0] })
            else dispatchAlert({ errors: error.message })
        }
    };

    return (
        <>
            <Helmet>
                <title>Tạo sản phẩm</title>
                <meta name='description' content='Beginner friendly page for learning React Helmet.' />
            </Helmet>
            <Typography.Title level={3} className='text-center'>Thêm mới sản phẩm</Typography.Title>
            <Typography.Title level={4}>
                <ArrowLeftOutlined className='cursor-pointer hover:text-main-orange-color' onClick={() => navigate(-1)} />
            </Typography.Title>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="my-2">
                    <div className="label-email font-semibold tracking-wide">Tên sản phẩm</div>
                    <input className="pl-2 w-1/2 h-[35px] border-[1px] border-[#adadad] rounded-sm" type={"text"} {...register('name')} placeholder='Nhập tên sản phẩm' />
                    {errors.name && <p className="text-red-500">{errors.name?.message}</p>}
                </div>

                <div className="my-2">
                    <div className="label-email font-semibold tracking-wide">Tên thương hiệu</div>
                    <input className="pl-2 w-1/2 h-[35px] border-[1px] border-[#adadad] rounded-sm" type={"text"} {...register('brand')} placeholder='Nhập tên thương hiệu' />
                    {errors.brand && <p className="text-red-500">{errors.brand?.message}</p>}
                </div>

                <div className="my-2">
                    <div className="label-email font-semibold tracking-wide">Mô tả</div>
                    <textarea className="pl-2 w-1/2 min-h-[100px] border-[1px] border-[#adadad] rounded-sm" {...register('description')} placeholder='Mô tả sản phẩm' />
                    {errors.description && <p className="text-red-500">{errors.description?.message}</p>}
                </div>

                <div className="my-2">
                    <div className="label-email font-semibold tracking-wide">Giá cũ sản phẩm</div>
                    <input className="pl-2 w-1/2 h-[35px] border-[1px] border-[#adadad] rounded-sm" type={"number"} {...register('old_price')} placeholder='Nhập giá cũ sản phẩm đơn vị VND' />
                    {errors.old_price && <p className="text-red-500">{errors.old_price?.message}</p>}
                </div>

                <div className="my-2">
                    <div className="label-email font-semibold tracking-wide">Giá mới sản phẩm</div>
                    <input className="pl-2 w-1/2 h-[35px] border-[1px] border-[#adadad] rounded-sm" type={"number"} {...register('new_price')} placeholder='Nhập giá mới sản phẩm đơn vị VND' />
                    {errors.new_price && <p className="text-red-500">{errors.new_price?.message}</p>}
                </div>

                <div className="my-2">
                    <div className="label-email font-semibold tracking-wide">Số lượng sản phẩm</div>
                    <input className="pl-2 w-1/2 h-[35px] border-[1px] border-[#adadad] rounded-sm" type={"number"} {...register('available')} placeholder='Nhập số lượng sản phẩm' />
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
                    {selectedImage &&
                        <img
                            src={URL.createObjectURL(selectedImage)}
                            alt={`Preview`}
                            className="max-h-[100px] cursor-zoom-in hover:opacity-70"
                        />}
                </div>

                <div className="my-2">
                    <div className="label-email font-semibold tracking-wide">Danh mục sản phẩm</div>
                    <Checkbox.Group onChange={onChangeCheckbox}>
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
                </div>
                {
                    !disabled &&
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                }
            </form>
        </>
    )
}

export default CreateProduct