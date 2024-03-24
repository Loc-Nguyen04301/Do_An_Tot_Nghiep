import React from "react"
import { Link, useParams } from "react-router-dom"
import styles from "./ListProductByCategory.module.scss"
import categoryList from "../../assets/data/categoryList"
import { RoutePath } from "../../routes"
import { Helmet } from "react-helmet-async"

const ListProductByCategory = () => {
  const { category } = useParams()
  return (
    <div>
      <div className="bg-[url('https://www.thol.com.vn/wp-content/uploads/2015/11/nang-luong-suc-khoe-scaled.jpg')] bg-no-repeat bg-center bg-cover">
        <div className="container max-w-[1140px] mx-auto max-md:text-center">
          {categoryList.map((categoryItem) =>
            categoryItem.path === category ? (
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
            ) : (
              <></>
            )
          )}
        </div>
      </div>
      <div className="max-w-[1170px] mx-auto">
        <div className="grid grid-cols-6 pt-8 pb-16 px-4 gap-y-5">
          {Array.from({ length: 15 }, (_i, index) => (
            <div className={`px-[10px] ${styles.containerProduct}`} key={index}>
              <div className="relative">
                <Link
                  to={`${RoutePath.DetailProduct}/${index}`}
                  className="text-center block mx-auto"
                >
                  <img
                    src="https://www.thol.com.vn/wp-content/uploads/2019/07/Superhugemockcholateshake-300x300.jpg"
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
                to={`${RoutePath.DetailProduct}/${index}`}
                className="text-base block leading-5 mt-2"
              >
                Super Huge Gain – MASS Evogen tăng cân đẳng cấp nhất
              </Link>
              <div>
                <span className="font-semibold">1.750.000₫</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ListProductByCategory
