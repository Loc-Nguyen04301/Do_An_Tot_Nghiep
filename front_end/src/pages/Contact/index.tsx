import React from "react"
import aboutUsBanner from "@/assets/images/aboutus_banner.jpg"
import { Helmet } from "react-helmet-async"

const Contact = () => {
  return (
    <>
      <Helmet>
        <title>Liên hệ - THOL </title>
        <meta name='description' content='Beginner friendly page for learning React Helmet.' />
      </Helmet>
      <div className="mx-auto max-w-[1140px] py-8 px-2">
        <div className="grid grid-cols-12">
          <div className="col-span-9 max-md:col-span-12 px-4">
            <div className="text-center">
              <div className="text-[#334862] text-xs font-bold tracking-wider mb-1">
                Chưa phân loại
              </div>
              <div className="text-[#555] font-extrabold text-3xl">Liên hệ</div>
              <div className="mx-auto h-[3px] max-w-[30px] bg-category-title mt-4 mb-3"></div>
              <div className="text-xs text-text-gray">
                POSTED ON THÁNG MƯỜI,19 2023 BY LOCNGUYEN
              </div>
            </div>
            <div className="mt-16">
              <p className="text-[#555] font-extrabold text-3xl mb-5">Liên hệ</p>
              <p className="mb-5 text-[#777777] text-lg">
                Công ty TNHH Thương Mại Lộc Nguyễn
              </p>
              <ul className="list-disc text-[#777777] pl-6 leading-8 text-lg">
                <li>
                  1 Đại Cồ Việt, Bách Khoa, Hai Bà Trưng, Tp.Hà Nội.
                </li>
                <li>
                  Email:
                  <a title="Send Email" href="mailto:nguyengialoc7@gmail.com" className="ml-1">
                    nguyengialoc7@gmail.com
                  </a>
                </li>
                <li>
                  Tổng đài:
                  <a title="Call" href="tel:19008888" className="ml-1">
                    1900 8888
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-span-3 max-md:hidden px-4">
            <img src={aboutUsBanner} className="w-full" />
          </div>
        </div>
      </div>
    </>
  )
}

export default Contact
