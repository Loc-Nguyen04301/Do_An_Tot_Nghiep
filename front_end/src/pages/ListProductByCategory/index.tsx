import React, { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import { IProduct } from "@/types"
import ProductService from "@/services/ProductService"
import { useAppDispatch, useAppSelector } from "@/redux-toolkit/hook"
import { useAlertDispatch } from "@/contexts/AlertContext"
import ProductCard from "@/components/ProductCard"

const ListProductByCategory = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const { categoryList } = useAppSelector((state) => state.category)
  const { category } = useParams()

  const dispatch = useAppDispatch()
  const dispatchAlert = useAlertDispatch()

  const getProductsByCategory = async (relatedCategory: string) => {
    dispatchAlert({ loading: true })
    try {
      if (relatedCategory) {
        const res = await ProductService.getProductsByCategory(relatedCategory)
        setProducts(res.data.data)
        dispatchAlert({ loading: false })
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (category) getProductsByCategory(category)
  }, [category])

  return (
    <>
      <Helmet>
        <title>{categoryList.find((categoryItem) => categoryItem.path === category)?.name}</title>
        <meta name='description' content='Beginner friendly page for learning React Helmet.' />
      </Helmet>
      <div className="bg-[url('https://www.thol.com.vn/wp-content/uploads/2015/11/nang-luong-suc-khoe-scaled.jpg')] bg-no-repeat bg-center bg-cover">
        <div className="container max-w-[1140px] mx-auto max-md:text-center">
          {categoryList.map((categoryItem) =>
            categoryItem.path === category &&
            (
              <div key={categoryItem.path}>
                <h1 className="px-4 pt-4 text-white text-[24px] font-semibold">
                  {categoryItem.name}
                </h1>
                <div className="p-4 pb-6 text-white text-[16px]">
                  <Link to="/">Trang chủ</Link>
                  <span className="divider mx-2 opacity-50">/</span>
                  <span> {categoryItem.name}</span>
                </div>
              </div>
            )
          )}
        </div>
      </div>
      <div className="max-w-[1170px] mx-auto">
        <div className="grid grid-cols-6 max-md:grid-cols-4 max-xs:grid-cols-3 pt-8 pb-16 px-4 gap-3">
          {products && products.map((product) =>
            <div key={product.id}>
              <ProductCard product={product} />
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default ListProductByCategory
