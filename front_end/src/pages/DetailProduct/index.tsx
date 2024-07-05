import React, { ChangeEvent, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import ProductSlider from "./components/ProductSlider"
import AccordingProduct from "./components/AccordingProduct"
import { Helmet } from "react-helmet-async"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"
import { IProduct } from "@/types"
import ProductService from "@/services/ProductService"
import { calculateSalePercentage, convertNumbertoMoney } from "@/utils"
import { RoutePath } from "@/routes"
import { useAppDispatch, useAppSelector } from "@/redux-toolkit/hook"
import { addItemToCartWithQuantity } from "@/redux-toolkit/cartSlice"
import { useAlertDispatch } from "@/contexts/AlertContext"
import { Tag } from "antd"
import { addProductToWishList, IProductWishList, removeProductToWishList } from "@/redux-toolkit/wishListSlice"
import ProductCard from "@/components/ProductCard"
import { ICategory } from "@/redux-toolkit/categorySlice"
import "./DetailProduct.scss"

export interface Review {
  id: number
  user: { id: number, avatar: string, username: string }
  images: string[]
  description: string
  star: number
  created_at: string
}

export interface IDetailProduct extends IProduct {
  reviews: Review[]
  categories: { category: ICategory }[]
  _count: { reviews: number }
}

const DetailProduct = () => {
  const [product, setProduct] = useState<IDetailProduct>()
  const [relatedCategory, setRelatedCategory] = useState()
  const [relatedProducts, setRelatedProducts] = useState<IDetailProduct[]>([])
  const [quantity, setQuantity] = useState<number>(0)
  const { cartItems } = useAppSelector((state) => state.cart)
  const { wishList } = useAppSelector(state => state.wishList)

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
    if (quantity === 0) return
    dispatchAlert({ loading: true })
    try {
      if (quantity > product.available) {
        setTimeout(() => {
          dispatchAlert({ errors: `Số lượng sản phẩm không đủ để phục vụ. Vui lòng chọn lại` })
        }, 1000)
        return
      }
      else {
        setTimeout(() => {
          dispatch(addItemToCartWithQuantity({ ...product, quantityAdded: quantity }))
          dispatchAlert({ loading: false })
        }, 2000)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const getProductById = async (label: string) => {
      dispatchAlert({ loading: true })
      try {
        const res = await ProductService.getProductById(Number(label))
        setProduct(res.data.data)
        const randomCategory = res.data.data.categories[0].category.path
        setRelatedCategory(randomCategory)
        dispatchAlert({ loading: false })
      } catch (error) {
        console.log(error)
      }
    }

    if (label && label.length > 0) getProductById(label)
  }, [label])

  useEffect(() => {
    const getProductsByCategory = async (relatedCategory: string, product: IDetailProduct) => {
      dispatchAlert({ loading: true })
      try {
        const res = await ProductService.getProductsByCategory(relatedCategory)
        var relatedProducts = res.data.data as IDetailProduct[]
        relatedProducts = relatedProducts.filter((item) => item.id !== product?.id)
        setRelatedProducts(relatedProducts)
        dispatchAlert({ loading: false })
      } catch (error) {
        console.log(error)
      }
    }

    if (relatedCategory && product) getProductsByCategory(relatedCategory, product)
  }, [relatedCategory, product])

  useEffect(() => {
    if (product) {
      const checkItem = cartItems.find(item => item.id === product.id)
      if (checkItem) setQuantity(checkItem.quantity)
      else setQuantity(0)
    }
  }, [product?.id])


  const handleAddProductToWishList = (data: IProductWishList) => {
    dispatchAlert({ loading: true })
    setTimeout(() => {
      dispatch(addProductToWishList({ ...data }))
      dispatchAlert({ loading: false })
    }, 500)
  }

  const handleRemoveItemToWishList = (id: number) => {
    dispatchAlert({ loading: true })
    setTimeout(() => {
      dispatch(removeProductToWishList({ id }))
      dispatchAlert({ loading: false })
    }, 500)
  }

  if (product)
    return (
      <>
        <Helmet>
          <title> {product.name} - THOL</title>
          <meta name='description' content='Beginner friendly page for learning React Helmet.' />
        </Helmet>
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
                {product.old_price != 0 &&
                  <del className="text-main-grey-color text-2xl mr-4">
                    {convertNumbertoMoney(product.old_price)}
                  </del>
                }
                <span className="text-2xl font-bold">
                  {convertNumbertoMoney(product.new_price)}
                </span>
                {product.old_price != 0 &&
                  <Tag color="#ed3324" className="ml-5 font-semibold text-lg">{calculateSalePercentage(product.old_price, product.new_price)}</Tag>
                }
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
              {
                product.available !== 0 && wishList.findIndex((item) => item.id === product.id) === -1 ?
                  <div
                    className="border-b-[1px] border-dotted pb-1 text-lg cursor-pointer hover:text-main-orange-color"
                    onClick={() => { handleAddProductToWishList({ ...product }) }}
                  >
                    Add to wishlist
                  </div> :
                  <div
                    className="border-b-[1px] border-dotted pb-1 text-lg cursor-pointer hover:text-main-orange-color"
                    onClick={() => { handleRemoveItemToWishList(product.id) }}
                  >
                    Remove to wishlist
                  </div>
              }
              <div className="border-b-[1px] border-dotted pb-1 text-main-grey-color">
                Mã: {product.id}
              </div>
              <div className="text-main-grey-color">
                Danh mục:
                {product.categories.map((item) =>
                  <span className="pl-1" key={item.category.name}>
                    <a className="cursor-pointer" href={`${RoutePath.ListByCategory}/${item.category.path}`}>{item.category.name}</a>,
                  </span>)}
              </div>
            </div>
          </div>
          <div className="py-16 px-10 max-md:px-5">
            <AccordingProduct product={product} />
            {
              relatedProducts.length > 0 &&
              <div className="mt-8">
                <h1 className="font-bold text-2xl text-category-title tracking-wider my-5">
                  Sản phẩm tương tự
                </h1>
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
                  {
                    relatedProducts.map(product =>
                      <SwiperSlide key={product.id}>
                        <ProductCard product={product} />
                      </SwiperSlide>
                    )
                  }
                </Swiper>
              </div>
            }
          </div>
        </div >
      </>
    )
}

export default DetailProduct
