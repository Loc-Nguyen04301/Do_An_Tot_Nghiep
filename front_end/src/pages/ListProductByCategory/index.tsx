import React, { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import categoryList from "@/assets/data/categoryList"
import { RoutePath } from "@/routes"
import { Helmet } from "react-helmet-async"
import { IProduct } from "@/types"
import ProductService from "@/services/ProductService"
import { convertNumbertoMoney } from "@/utils"
import { Tag } from "antd"
import { HeartOutlined } from '@ant-design/icons';
import { addProductToWishList, IProductWishList, removeProductToWishList } from "@/redux-toolkit/wishListSlice"
import { useAppDispatch, useAppSelector } from "@/redux-toolkit/hook"
import { useAlertDispatch } from "@/contexts/AlertContext"

const ListProductByCategory = () => {
  const { wishList } = useAppSelector(state => state.wishList)
  const [products, setProducts] = useState<IProduct[]>([]);
  const { category } = useParams()

  const dispatch = useAppDispatch()
  const dispatchAlert = useAlertDispatch()

  const getProductsByCategory = async (relatedCategory: string) => {
    if (relatedCategory) {
      const res = await ProductService.getProductsByCategory(relatedCategory)
      setProducts(res.data.data)
    }
  }

  useEffect(() => {
    if (category) getProductsByCategory(category)
  }, [category])

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
    <div>
      <div className="bg-[url('https://www.thol.com.vn/wp-content/uploads/2015/11/nang-luong-suc-khoe-scaled.jpg')] bg-no-repeat bg-center bg-cover">
        <div className="container max-w-[1140px] mx-auto max-md:text-center">
          {categoryList.map((categoryItem) =>
            categoryItem.path === category &&
            (
              <div key={categoryItem.path}>
                <h1 className="px-4 pt-4 text-white text-[24px] font-semibold">
                  {categoryItem.title}
                </h1>
                <div className="p-4 pb-6 text-white text-[16px]">
                  <Link to="/">Trang chủ</Link>
                  <span className="divider mx-2 opacity-50">/</span>
                  <span> {categoryItem.title}</span>
                </div>
              </div>
            )
          )}
        </div>
      </div>
      <div className="max-w-[1170px] mx-auto">
        <div className="grid grid-cols-6 max-md:grid-cols-4 max-xs:grid-cols-3 pt-8 pb-16 px-4 gap-3">
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
      </div>
    </div>
  )
}

export default ListProductByCategory
