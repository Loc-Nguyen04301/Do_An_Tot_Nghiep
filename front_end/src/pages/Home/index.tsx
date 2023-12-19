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

const Home = () => {
  return (
    <>
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
          {Array.from({ length: 3 }, (_i, index) => (
            <div className="px-2" key={index}>
              <div className="border-b-[1px] border-border-color pb-2">
                <span className="text-category-title text-[20px] font-bold uppercase border-b-[3px] border-border-color pb-2">
                  Tăng cân nhanh, thoát gầy
                </span>
              </div>
              <div className="mt-8">
                <div className="grid grid-cols-6 max-md:hidden">
                  {Array.from({ length: 6 }, (_i, index) => (
                    <div className={`px-[10px] ${styles.containerProduct}`} key={index}>
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
                        <div
                          className={`hidden absolute bottom-0 w-full bg-main-orange-color text-center py-1 opacity-95 duration-500 ${styles.showView}`}
                        >
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
                  ))}
                </div>
                <div className="md:hidden">
                  <Swiper
                    slidesPerView={3}
                    navigation={true}
                    modules={[Navigation]}
                    loop={true}
                  >
                    {Array.from({ length: 6 }, (_i, index) => (
                      <SwiperSlide key={index}>
                        <div className={`px-[10px] ${styles.containerProduct}`}>
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
                            <div
                              className={`hidden absolute bottom-0 w-full bg-main-orange-color text-center py-1 opacity-95 duration-500 ${styles.showView}`}
                            >
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
          ))}
        </div>
      </div>
      <img src={bottomImage} className="w-full" />
    </>
  )
}

export default Home
