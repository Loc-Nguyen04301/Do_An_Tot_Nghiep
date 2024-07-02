import React, { useEffect, useState } from 'react'
import { SwiperSlide, Swiper } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import ProductService from '@/services/ProductService'
import { IProduct } from '@/types'
import { useAlertDispatch } from '@/contexts/AlertContext'
import ProductCard from '@/components/ProductCard'
import { RoutePath } from '@/routes'
import CountDownTimer from '@/pages/Home/components/CountDownTimer'

interface ProductsByCategoryProps {
    categoryPath: string
    categoryName: string
    from_date?: string
    to_date?: string
}

const ProductsByCategory = ({ categoryPath, categoryName, from_date, to_date }: ProductsByCategoryProps) => {
    const [products, setProducts] = useState<IProduct[]>([])
    const dispatchAlert = useAlertDispatch()

    useEffect(() => {
        const getProductsByCategory = async () => {
            dispatchAlert({ loading: true })
            try {
                const res = await ProductService.getProductsByCategory(categoryPath)
                setProducts(res.data.data)
                dispatchAlert({ loading: false })
            } catch (error) {
                console.log(error)
            }
        }
        getProductsByCategory()
    }, [categoryPath])

    return (
        <div className="px-2">
            <div className="border-b-[1px] border-border-color flex relative">
                <a
                    className="text-category-title text-[20px] font-bold uppercase border-b-[3px] border-border-color pb-2"
                    href={`${RoutePath.ListByCategory}/${categoryPath}`}
                >
                    {categoryName}
                </a>
                {from_date && to_date && <CountDownTimer fromDate={from_date} toDate={to_date} />}
            </div>
            <div className="mt-8">
                {products.length > 0 &&
                    <Swiper
                        navigation={true}
                        modules={[Navigation]}
                        loop={true}
                        breakpoints={{
                            850: {
                                slidesPerView: 5,
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
                        {products.map((product) =>
                            <SwiperSlide key={product.id}>
                                <ProductCard product={product} />
                            </SwiperSlide>)}
                    </Swiper>
                }
            </div>
        </div >
    )
}

export default ProductsByCategory