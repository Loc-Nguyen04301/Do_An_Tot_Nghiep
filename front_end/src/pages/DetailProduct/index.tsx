import React, { ChangeEvent, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import ProductSlider from "./components/ProductSlider"
import AccordingProduct from "./components/AccordingProduct"
import "./DetailProduct.scss"
import { Helmet } from "react-helmet-async"

import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"
import "swiper/scss"
import "swiper/scss/navigation"
import { IProduct } from "../../types"
import ProductService from "../../services/ProductService"
import { convertNumbertoMoney } from "../../utils"

interface Category {
  name: string;
}
export interface IDetailProduct extends IProduct {
  reviews: string[]
  categories: { category: Category }[]
}

const DetailProduct = () => {
  const [product, setProduct] = useState<IDetailProduct>();
  const [quantity, setQuantity] = useState<number>(0)

  const { label } = useParams()


  const handleChangeQuantity = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value == "") {
      setQuantity(0)
    }
    const parsedValue = parseInt(value, 10)
    if (!isNaN(parsedValue)) {
      setQuantity(parsedValue)
    }
  }

  const getProductById = async () => {
    const res = await ProductService.getProductById(Number(label))
    setProduct(res.data.data)
  }

  useEffect(() => {
    getProductById()
  }, [label])

  if (product)
    return (
      <>
        <>
          <Helmet>
            <title> Chi tiết sản phẩm - THOL</title>
            <meta name='description' content='Beginner friendly page for learning React Helmet.' />
          </Helmet>
        </>
        <div className=" bg-[url('https://www.thol.com.vn/wp-content/uploads/2015/11/nang-luong-suc-khoe-scaled.jpg')] bg-no-repeat bg-center bg-cover">
          <div className="container max-w-[1140px] mx-auto max-md:text-center">
            <div className="px-4 py-5 text-white text-[16px]">
              <a href="">Trang chủ</a>
            </div>
          </div>
        </div>
        <div className="max-w-[1170px] mx-auto">
          <div className="grid grid-cols-12 py-10">
            <div className="col-span-1"></div>
            <div className="col-span-3 max-md:col-span-8 max-md:col-start-3 px-6">
              <ProductSlider image={product.image} />
            </div>
            <div className="col-span-8 max-md:col-span-12 px-6 pt-[10px] pb-[30px]">
              <h1 className="text-category-title text-3xl font-bold mb-5">
                {product.name}
              </h1>
              <div className="h-[3px] my-5 bg-[rgba(0,0,0,.1)] w-[30px]"></div>
              <div className="">
                {
                  product.old_price != 0
                  &&
                  <del className="text-main-grey-color text-2xl mr-4">
                    {convertNumbertoMoney(product.old_price)}
                  </del>
                }
                <span className="text-2xl font-bold">
                  {convertNumbertoMoney(product.new_price)}
                </span>
              </div>
              <div className="short-description my-5 text-text-gray text-lg">
                <p>
                  {product.description}
                </p>
              </div>
              <div className="mb-10">
                <div className="w-fit inline-block mr-10">
                  <input
                    type="button"
                    value="-"
                    className="px-2 text-[#666] font-semibold bg-[#f9f9f9] border-[1px] border-[#ddd] border-solid min-h-[40px] cursor-pointer hover:bg-gray-300 duration-300"
                    onClick={() => setQuantity((prev) => prev - 1)}
                    disabled={quantity <= 0}
                  />
                  <input
                    className="px-2 text-[#666] font-semibold border-t-[1px] border-b-[1px] border-[#ddd] border-solid min-h-[40px] max-w-[40px] text-center"
                    value={quantity}
                    onChange={handleChangeQuantity}
                  />
                  <input
                    type="button"
                    value="+"
                    className="px-2 text-[#666] font-semibold bg-[#f9f9f9] border-[1px] border-[#ddd] border-solid min-h-[40px] cursor-pointer hover:bg-gray-300 duration-300"
                    onClick={() => setQuantity((prev) => prev + 1)}
                  />
                </div>
                <div className="inline-block bg-button-red-color hover:bg-red-800 duration-300 cursor-pointer px-5 rounded-sm border-[1px]">
                  <span className="uppercase text-white font-semibold tracking-wide text-center block py-2">
                    Thêm vào giỏ hàng
                  </span>
                </div>
              </div>
              <div className="border-b-[1px] border-dotted pb-1 text-lg">
                Add to wishlist
              </div>
              <div className="border-b-[1px] border-dotted pb-1 text-main-grey-color">
                Mã: {product.id}
              </div>
              <div className="text-main-grey-color">
                Danh mục:
                {product.categories.map((item) =>
                  <span className="pl-1" key={item.category.name}>
                    <a className="cursor-pointer">{item.category.name}</a>,
                  </span>)}
              </div>
            </div>
          </div>
          <div className="py-16 px-10 max-md:px-5">
            <AccordingProduct product={product} />
            <div className="mt-8">
              <h1 className="font-bold text-2xl text-category-title tracking-wider my-5">
                Sản phẩm tương tự
              </h1>
              <div>
                <Swiper
                  navigation={true}
                  modules={[Navigation]}
                  loop={true}
                  breakpoints={{
                    850: {
                      slidesPerView: 6,
                    },
                    550: {
                      slidesPerView: 4,
                    },
                    300: {
                      slidesPerView: 3,
                    },
                  }}
                >
                  {Array.from({ length: 7 }, (_i, index) => (
                    <SwiperSlide key={index}>
                      <div className="px-[10px] containerProduct">
                        <div className="relative">
                          <a
                            href={`/san-pham/${index}`}
                            className="text-center block mx-auto"
                          >
                            <img
                              src="https://www.thol.com.vn/wp-content/uploads/2019/07/Superhugemockcholateshake-300x300.jpg"
                              width={274}
                            />
                          </a>
                          <div className="hidden absolute bottom-0 w-full bg-main-orange-color text-center py-1 duration-500 showView">
                            <span className="text-white font-semibold uppercase text-sm">
                              Quick View
                            </span>
                          </div>
                        </div>
                        <a
                          href={`/san-pham/${index}`}
                          className="text-base block leading-5 mt-2"
                        >
                          Super Huge Gain – MASS Evogen tăng cân đẳng cấp nhất
                        </a>
                        <div>
                          <span className="font-semibold">1.750.000₫</span>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
        </div >
      </>
    )
}

export default DetailProduct
