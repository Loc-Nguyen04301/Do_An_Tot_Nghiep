import React, { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import categoryList from "../../assets/data/categoryList"
import { RoutePath } from "../../routes"
import { Helmet } from "react-helmet-async"
import { IDetailProduct } from "../DetailProduct"
import ProductService from "../../services/ProductService"
import { convertNumbertoMoney } from "../../utils"

import styles from "./ListProductByCategory.module.scss"

const ListProductByCategory = () => {
  const { category } = useParams()
  const [products, setProducts] = useState<IDetailProduct[]>([]);

  const getProductsByCategory = async (relatedCategory: string) => {
    if (relatedCategory) {
      const res = await ProductService.getProductsByCategory(relatedCategory)
      setProducts(res.data.data)
    }
  }

  useEffect(() => {
    if (category) getProductsByCategory(category)
  }, [category])

  return (
    <div>
      <div className="bg-[url('https://www.thol.com.vn/wp-content/uploads/2015/11/nang-luong-suc-khoe-scaled.jpg')] bg-no-repeat bg-center bg-cover">
        <div className="container max-w-[1140px] mx-auto max-md:text-center">
          {categoryList.map((categoryItem) =>
            categoryItem.path === category &&
            (
              <div>
                <>
                  <Helmet>
                    <title>{categoryItem.title} </title>
                    <meta name='description' content={categoryItem.title} />
                  </Helmet>
                </>
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
            <div className={`${styles.containerProduct}`} key={product.id}>
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
            </div>)}
        </div>
      </div>
    </div>
  )
}

export default ListProductByCategory
