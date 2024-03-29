import React from "react"
import homeImage1 from "../../assets/images/home_image1.jpg"
import homeImage2 from "../../assets/images/home_image2.jpg"
import bottomImage from "../../assets/images/bottom_image.jpg"
import styles from "./Home.module.scss"

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react"
// import required modules
import { Navigation } from "swiper/modules"
import "swiper/scss"
import "swiper/scss/navigation"
import { Link } from "react-router-dom"
import { RoutePath } from "../../routes"
import { Helmet } from "react-helmet-async"
import ProductsByCategory from "./components/ProductsByCategory"
import categoryList from "../../assets/data/categoryList"

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Trang chủ - THOL </title>
        <meta name='description' content='Beginner friendly page for learning React Helmet.' />
      </Helmet>
      <div className="mx-auto max-w-[1140px] py-8">
        <div className="grid grid-cols-2">
          <div className="px-4 pb-7">
            <img src={homeImage1} />
          </div>
          <div className="px-4 pb-7">
            <img src={homeImage2} />
          </div>
        </div>

        <div className="flex flex-col gap-14">
          {/* {Array.from({ length: 3 }, (_i, index) => (
            <ProductsByCategory categoryPath="" categoryTitle="" key={index} />
          ))} */}
          <ProductsByCategory categoryPath={categoryList[0].path} categoryTitle={categoryList[0].title} />
          <ProductsByCategory categoryPath={categoryList[1].path} categoryTitle={categoryList[1].title} />
          <ProductsByCategory categoryPath={categoryList[2].path} categoryTitle={categoryList[2].title} />
        </div>
      </div>
      <img src={bottomImage} className="w-full" />
    </>
  )
}

export default Home
