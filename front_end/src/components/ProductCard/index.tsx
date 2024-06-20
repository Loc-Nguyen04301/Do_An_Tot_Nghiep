import React from 'react'
import { IProduct } from '@/types'
import { calculateSalePercentage, convertNumbertoMoney } from '@/utils'
import { Rate, Tag } from 'antd'
import { Link } from 'react-router-dom'
import { RoutePath } from '@/routes'
import { useAppDispatch, useAppSelector } from '@/redux-toolkit/hook'
import { addProductToWishList, IProductWishList, removeProductToWishList } from '@/redux-toolkit/wishListSlice'
import { HeartOutlined } from '@ant-design/icons';
import { useAlertDispatch } from '@/contexts/AlertContext'

interface ProductCardProps {
    product: IProduct
}
const ProductCard = ({ product }: ProductCardProps) => {
    const { wishList } = useAppSelector(state => state.wishList)
    const dispatch = useAppDispatch()
    const dispatchAlert = useAlertDispatch()

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
        <div className={`p-4 containerProduct`}>
            <div className="relative">
                {
                    product.available === 0 && <Tag color="red" className="absolute top-0 left-0">Hết hàng</Tag>
                }
                <Link
                    to={product.available !== 0 ? `${RoutePath.DetailProduct}/${product.id}` : ""}
                    className="text-center block mx-auto pb-12"
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
                className="text-base block leading-5 my-2"
            >
                {product.name}
            </Link>
            <div className='flex flex-col justify-start'>
                {product.old_price != 0 && <span className="font-medium line-through text-category-title">{convertNumbertoMoney(product.old_price)}</span>}
                <div className='flex gap-3 items-center'>
                    <span className="font-semibold text-lg">{convertNumbertoMoney(product.new_price)}</span>
                    {product.old_price != 0 && <Tag color="#ed3324" className="font-semibold text-sm">{calculateSalePercentage(product.old_price, product.new_price)}</Tag>}
                </div>
                <Rate value={product.averageRating} allowHalf disabled className='mt-2' />
            </div>
        </div>
    )
}

export default ProductCard



