import React, { useState } from "react"
import Slider from "react-slick"
interface ProductSlider {
  image: string;
}

const ProductSlider = ({ image }: ProductSlider) => {
  const [nav1, setNav1] = useState()
  const [nav2, setNav2] = useState()
  return (
    <>
      <div className="mb-5">
        <Slider
          asNavFor={nav2}
          ref={(slider1: any) => setNav1(slider1)}
          className="slider1"
        >
          <img src={image} alt="product1" />
          <img src={image} alt="product2" />
          <img src={image} alt="product3" />
        </Slider>
      </div>
      <div className="mt-5">
        <Slider
          asNavFor={nav1}
          ref={(slider2: any) => setNav2(slider2)}
          slidesToShow={3}
          swipeToSlide={true}
          focusOnSelect={true}
          className="slider2"
        >
          <img src={image} alt="product1" />
          <img src={image} alt="product2" />
          <img src={image} alt="product3" />
        </Slider>
      </div>
    </>
  )
}

export default ProductSlider
