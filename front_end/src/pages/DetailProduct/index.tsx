import React, { ChangeEvent, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import ProductSlider from "./components/ProductSlider"
import AccordingProduct from "./components/AccordingProduct"
import { Helmet } from "react-helmet-async"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"
import { IProduct } from "@/types"
import ProductService from "@/services/ProductService"
import { convertNumbertoMoney } from "@/utils"
import { RoutePath } from "@/routes"
import { useAppDispatch, useAppSelector } from "@/redux-toolkit/hook"
import { addItemToCartWithQuantity } from "@/redux-toolkit/cartSlice"
import { useAlertDispatch } from "@/contexts/AlertContext"

import "swiper/scss"
import "swiper/scss/navigation"
import styles from "./DetailProduct.module.scss"

interface Category {
  name: string;
}

interface Review {
  id: number;
  user: { id: number, avatar: string, username: string };
  images: string[],
  description: string;
  star: number;
  created_at: string;
}

export interface IDetailProduct extends IProduct {
  reviews: Review[]
  categories: { category: Category }[]
  _count: { reviews: number }
}

const DetailProduct = () => {
  const [product, setProduct] = useState<IDetailProduct>();
  const [relatedCategory, setRelatedCategory] = useState("")
  const [relatedProducts, setRelatedProducts] = useState<IDetailProduct[]>([]);
  const [quantity, setQuantity] = useState<number>(0)
  const { cartItems } = useAppSelector((state) => state.cart)

  const dispatchAlert = useAlertDispatch()

  const { label } = useParams()
  const dispatch = useAppDispatch()

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

  const addProductToCart = (product: any, quantity: number) => {
    dispatchAlert({ loading: true })
    try {
      setTimeout(() => {
        dispatch(addItemToCartWithQuantity({ ...product, quantityAdded: quantity }))
        dispatchAlert({ loading: false, success: "Thêm vào giỏ hàng thành công" })
      }, 1000)
    } catch (error) {
      console.log(error)
    }
  }

  const getProductById = async () => {
    dispatchAlert({ loading: true })
    try {
      const res = await ProductService.getProductById(Number(label))
      setProduct(res.data.data)
      // default = 0 
      const randomCategory = res.data.data.categories[0].category.name
      setRelatedCategory(randomCategory)
      dispatchAlert({ loading: false })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getProductById()
  }, [label])

  const getProductsByCategory = async (relatedCategory: string) => {
    dispatchAlert({ loading: true })
    try {
      if (relatedCategory) {
        const res = await ProductService.getProductsByCategory(relatedCategory)
        // Show maximum 6 items in Related Products
        setRelatedProducts(res.data.data.slice(0, 6))
        dispatchAlert({ loading: false })
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getProductsByCategory(relatedCategory)
  }, [relatedCategory])

  useEffect(() => {
    setQuantity(0)
    if (product)
      cartItems.map((item) => {
        if (item.id === product.id) {
          setQuantity(item.quantity)
          return;
        }
      })
  }, [product])

  if (product)
    return (
      <>
        <>
          <Helmet>
            <title> {product.name} - THOL</title>
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
                <div className="inline-block bg-button-red-color hover:bg-red-800 duration-300 cursor-pointer px-5 rounded-sm border-[1px]" onClick={() => addProductToCart(product, quantity)}>
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
                  {relatedProducts && relatedProducts.map(product =>
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
                          <div className={`hidden absolute bottom-0 w-full bg-main-orange-color text-center py-1 duration-500 ${styles.showView}`}>
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
          </div>
        </div >
      </>
    )
}

export default DetailProduct
