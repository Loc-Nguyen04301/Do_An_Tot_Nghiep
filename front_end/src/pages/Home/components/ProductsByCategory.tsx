import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { RoutePath } from '@/routes'
import { SwiperSlide, Swiper } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import ProductService from '@/services/ProductService'
import { IProduct } from '@/types'
import { convertNumbertoMoney } from '@/utils'
import { Tag } from 'antd'
import { useAlertDispatch } from '@/contexts/AlertContext'
import {
    HeartOutlined
} from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@/redux-toolkit/hook'
import { addProductToWishList, removeProductToWishList } from '@/redux-toolkit/wishListSlice'
import { IProductWishList } from '@/redux-toolkit/wishListSlice';

interface ProductsByCategoryProps {
    categoryPath: string;
    categoryTitle: string;
}

const ProductsByCategory = ({ categoryPath, categoryTitle }: ProductsByCategoryProps) => {
    const { wishList } = useAppSelector(state => state.wishList)
    const [products, setProducts] = useState<IProduct[]>([]);
    const dispatch = useAppDispatch()
    const dispatchAlert = useAlertDispatch()

    const getProductsByCategory = async () => {
        dispatchAlert({ loading: true })
        try {
            const res = await ProductService.getProductByCategory(categoryPath)
            setProducts(res.data.data)
            dispatchAlert({ loading: false })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getProductsByCategory()
    }, [categoryPath])

    const handleAddProductToWishList = (data: IProductWishList) => {
        dispatchAlert({ loading: true })
        setTimeout(() => {
            dispatch(addProductToWishList({ ...data }))
            dispatchAlert({ loading: false })
        }, 1000)
    }

    const handleRemoveItemToWishList = (id: number) => {
        dispatchAlert({ loading: true })
        setTimeout(() => {
            dispatch(removeProductToWishList({ id }))
            dispatchAlert({ loading: false })
        }, 1000)
    }

    return (
        <div className="px-2">
            <div className="border-b-[1px] border-border-color pb-2">
                <span className="text-category-title text-[20px] font-bold uppercase border-b-[3px] border-border-color pb-2">
                    {categoryTitle}
                </span>
            </div>
            <div className="mt-8">
                <div className="grid grid-cols-6 max-md:hidden gap-3">
                    {products && products.map((product) =>
                        <div className={`px-[10px] containerProduct`} key={product.id}>
                            <div className="relative">
                                {
                                    product.available === 0 && <Tag color="red" className="absolute top-0 left-0">Hết hàng</Tag>
                                }
                                {
                                    product.old_price != 0 &&
                                    <div className="absolute top-6 left-0 bg-[#fe0000] rounded-full py-3 px-1">
                                        <span className='text-white font-bold text-lg'>Giảm giá!</span>
                                    </div>
                                }
                                <Link
                                    to={product.available !== 0 ? `${RoutePath.DetailProduct}/${product.id}` : ""}
                                    className="text-center block mx-auto"
                                >
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                    />
                                </Link>
                                <div
                                    className={`hidden absolute bottom-0 w-full bg-main-orange-color text-center py-1 opacity-95 duration-500 showView`}
                                >
                                    <span className="text-white font-semibold uppercase text-sm">
                                        Quick View
                                    </span>
                                </div>
                                {
                                    product.available !== 0 && wishList.findIndex((item) => item.id === product.id) === -1 ?
                                        <div
                                            className={`hidden absolute top-0 right-0 w-[32px] h-[32px] border-2 border-main-grey-color rounded-full text-center opacity-95 duration-500 showView hover:bg-[#b20000] hover:border-[#b20000] cursor-pointer`}
                                            title='Add to wishlist'
                                            onClick={() => { handleAddProductToWishList({ ...product }) }}
                                        >
                                            <HeartOutlined className='text-xl text-main-grey-color mt-[5px] show-heart' />
                                        </div>
                                        : product.available !== 0 && wishList.findIndex((item) => item.id === product.id) !== -1
                                            ?
                                            <div
                                                className={`hidden absolute top-0 right-0 w-[32px] h-[32px] border-2 border-main-grey-color rounded-full text-center opacity-95 duration-500 showView hover:bg-[#b20000] hover:border-[#b20000] cursor-pointer`}
                                                title='Remove to wishlist'
                                                onClick={() => { handleRemoveItemToWishList(product.id) }}
                                            >
                                                <HeartOutlined className='text-xl text-main-grey-color mt-[5px] show-heart' />
                                            </div>
                                            : <></>
                                }
                            </div>
                            <Link
                                to={`${RoutePath.DetailProduct}/${product.id}`}
                                className="text-base block leading-5 mt-2 mb-1"
                            >
                                {product.name}
                            </Link>
                            <div className='flex justify-start gap-2'>
                                {product.old_price != 0 && <span className="font-medium line-through text-category-title">{convertNumbertoMoney(product.old_price)}</span>}
                                <span className="font-semibold">{convertNumbertoMoney(product.new_price)}</span>
                            </div>
                        </div>)}
                </div>

                <div className="md:hidden">
                    <Swiper
                        navigation={true}
                        modules={[Navigation]}
                        loop={true}
                        breakpoints={{
                            850: {
                                slidesPerView: 6,
                            },
                            680: {
                                slidesPerView: 4,
                            },
                            530: {
                                slidesPerView: 3,
                            },
                            300: {
                                slidesPerView: 2,
                            },
                        }}
                    >
                        {products && products.map((product) =>
                            <SwiperSlide key={product.id}>
                                <div className={`px-[10px] containerProduct`}>
                                    <div className="relative">
                                        {
                                            product.available === 0 && <Tag color="red" className="absolute top-0 left-0">Hết hàng</Tag>
                                        }
                                        {
                                            product.old_price != 0 &&
                                            <div className="absolute top-6 left-0 bg-[#fe0000] rounded-full py-3 px-1">
                                                <span className='text-white font-bold text-lg'>Giảm giá!</span>
                                            </div>
                                        }
                                        <Link
                                            to={`${RoutePath.DetailProduct}/${product.id}`}
                                            className="text-center block mx-auto"
                                        >
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                            />
                                        </Link>
                                        <div
                                            className={`hidden absolute bottom-0 w-full bg-main-orange-color text-center py-1 opacity-95 duration-500 showView`}
                                        >
                                            <span className="text-white font-semibold uppercase text-sm">
                                                Quick View
                                            </span>
                                        </div>
                                    </div>
                                    <Link
                                        to={`${RoutePath.DetailProduct}/${product.id}`}
                                        className="text-base block leading-5 mt-2"
                                    >
                                        {product.name}
                                    </Link>
                                    <div className='flex justify-start gap-2'>
                                        {product.old_price != 0 && <span className="font-medium line-through text-category-title">{convertNumbertoMoney(product.old_price)}</span>}
                                        <span className="font-semibold">{convertNumbertoMoney(product.new_price)}</span>
                                    </div>
                                </div>
                            </SwiperSlide>)}
                    </Swiper>
                </div>
            </div>
        </div >
    )
}

export default ProductsByCategory