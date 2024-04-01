import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { RoutePath } from '../../../routes'
import styles from "../Home.module.scss"
import { SwiperSlide, Swiper } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import ProductService from '../../../services/ProductService'
import { IProduct } from '../../../types'
import { convertNumbertoMoney } from '../../../utils'

interface ProductsByCategoryProps {
    categoryPath: string;
    categoryTitle: string;
}

const ProductsByCategory = ({ categoryPath, categoryTitle }: ProductsByCategoryProps) => {
    const [products, setProducts] = useState<IProduct[]>([]);

    const getProductsByCategory = async () => {
        const res = await ProductService.getProductByCategory(categoryPath)
        setProducts(res.data.data)
    }

    useEffect(() => {
        getProductsByCategory()
    }, [categoryPath])

    return (
        <div className="px-2">
            <div className="border-b-[1px] border-border-color pb-2">
                <span className="text-category-title text-[20px] font-bold uppercase border-b-[3px] border-border-color pb-2">
                    {categoryTitle}
                </span>
            </div>
            <div className="mt-8">
                <div className="grid grid-cols-6 max-md:hidden">
                    {products && products.map((product) =>
                        <div className={`px-[10px] ${styles.containerProduct}`} key={product.id}>
                            <div className="relative">
                                {product.old_price != 0 &&
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
                                        width={247}
                                    />
                                </Link>
                                <div
                                    className={`hidden absolute bottom-0 w-full bg-main-orange-color text-center py-1 opacity-95 duration-500 ${styles.showView}`}
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
                                <div className={`px-[10px] ${styles.containerProduct}`}>
                                    <div className="relative">
                                        {product.old_price != 0 &&
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
                                                width={274}
                                            />
                                        </Link>
                                        <div
                                            className={`hidden absolute bottom-0 w-full bg-main-orange-color text-center py-1 opacity-95 duration-500 ${styles.showView}`}
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