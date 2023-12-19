import React from "react"
import logoImage from "../../../assets/images/thol-logo.jpg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEnvelope } from "@fortawesome/free-regular-svg-icons"
import { faPhone } from "@fortawesome/free-solid-svg-icons"
import {
  faSquareFacebook,
  faInstagram,
  faTiktok,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons"
import MasterCard from "../../../assets/svg/Mastercard"
import Paypal from "../../../assets/svg/Paypal"
import Visa from "../../../assets/svg/Visa"

const Footer = () => {
  return (
    <footer>
      <div className="py-16 bg-footer-bg">
        <div className="container mx-auto max-w-[1170px] flex max-md:flex-col">
          <div className="px-3 w-1/3 max-md:w-full">
            <div className="logo">
              <a href="#">
                <img src={logoImage} alt="logo" className="max-w-[216px]" />
              </a>
            </div>
            <p className="text-lg text-white mt-6">
              Công ty TNHH Thương Mại BBT
              <br />
              107-109 Đường số 6, Bình Trị Đông B<br />
              TpHCM
            </p>
            <ul className="flex text-sm h-fit mt-6 text-white flex-wrap max-[1150px]:gap-3">
              <li className="flex items-center gap-2 mr-7">
                <FontAwesomeIcon icon={faPhone} />
                <span className="font-semibold">1900 2050</span>
              </li>
              <li className="flex items-center gap-2">
                <FontAwesomeIcon icon={faEnvelope} />
                <span className="font-semibold tracking-wide">
                  LOCNGUYEN@GMAIL.COM.VN
                </span>
              </li>
            </ul>
          </div>
          <div className="w-2/3 max-md:w-full max-md:mt-10 text-white">
            <div className="grid grid-cols-3 max-sm:grid-cols-1">
              <div className="px-3 pb-5">
                <h1 className="text-xl font-bold mb-2">Truy cập nhanh</h1>
                <ul>
                  <li className="py-[9px] pl-6 relative border-b-[1px] border-border-color cursor-pointer before:content-['>'] before:text-[#7a9c59] before:left-0 before:absolute">
                    <span className="text-[#f1f1f1] hover:text-white">
                      <a href="#">Xem đơn hàng </a>
                    </span>
                  </li>
                  <li className="py-[9px] pl-6 relative border-b-[1px] border-border-color cursor-pointer before:content-['>'] before:text-[#7a9c59] before:left-0 before:absolute">
                    <span className="text-[#f1f1f1] hover:text-white">
                      <a href="#">Tài khoản </a>
                    </span>
                  </li>
                  <li className="py-[9px] pl-6 relative border-b-[1px] border-border-color cursor-pointer before:content-['>'] before:text-[#7a9c59] before:left-0 before:absolute">
                    <span className="text-[#f1f1f1] hover:text-white">
                      <a href="#">Danh sách yêu thích </a>
                    </span>
                  </li>
                  <li className="py-[9px] pl-6 relative border-b-[1px] border-border-color cursor-pointer before:content-['>'] before:text-[#7a9c59] before:left-0 before:absolute">
                    <span className="text-[#f1f1f1] hover:text-white">
                      <a href="#">Đối tượng quà tặng </a>
                    </span>
                  </li>
                </ul>
              </div>
              <div className="px-3 pb-5">
                <h1 className="text-xl font-bold mb-2">Thông tin</h1>
                <ul>
                  <li className="py-[9px] pl-6 relative border-b-[1px] border-border-color cursor-pointer before:content-['>'] before:text-[#7a9c59] before:left-0 before:absolute">
                    <span className="text-[#f1f1f1] hover:text-white">
                      <a href="#">Hướng dẫn mua hàng </a>
                    </span>
                  </li>
                  <li className="py-[9px] pl-6 relative border-b-[1px] border-border-color cursor-pointer before:content-['>'] before:text-[#7a9c59] before:left-0 before:absolute">
                    <span className="text-[#f1f1f1] hover:text-white">
                      <a href="#">Hướng dẫn thanh toán </a>
                    </span>
                  </li>
                  <li className="py-[9px] pl-6 relative border-b-[1px] border-border-color cursor-pointer before:content-['>'] before:text-[#7a9c59] before:left-0 before:absolute">
                    <span className="text-[#f1f1f1] hover:text-white">
                      <a href="#">Vận chuyển - đổi trả </a>
                    </span>
                  </li>
                  <li className="py-[9px] pl-6 relative border-b-[1px] border-border-color cursor-pointer before:content-['>'] before:text-[#7a9c59] before:left-0 before:absolute">
                    <span className="text-[#f1f1f1] hover:text-white">
                      <a href="#">Dành cho đại lý </a>
                    </span>
                  </li>
                </ul>
              </div>
              <div className="px-3 pb-5">
                <h1 className="text-xl font-bold mb-2">Về chúng tôi </h1>
                <ul>
                  <li className="py-[9px] pl-6 relative border-b-[1px] border-border-color cursor-pointer before:content-['>'] before:text-[#7a9c59] before:left-0 before:absolute">
                    <span className="text-[#f1f1f1] hover:text-white">
                      <a href="#">Giới thiệu THOL </a>
                    </span>
                  </li>
                  <li className="py-[9px] pl-6 relative border-b-[1px] border-border-color cursor-pointer before:content-['>'] before:text-[#7a9c59] before:left-0 before:absolute">
                    <span className="text-[#f1f1f1] hover:text-white">
                      <a href="#">Công ty TNHH BBT </a>
                    </span>
                  </li>
                  <li className="py-[9px] pl-6 relative border-b-[1px] border-border-color cursor-pointer before:content-['>'] before:text-[#7a9c59] before:left-0 before:absolute">
                    <span className="text-[#f1f1f1] hover:text-white">
                      <a href="#">Tin tức </a>
                    </span>
                  </li>
                  <li className="py-[9px] pl-6 relative border-b-[1px] border-border-color cursor-pointer before:content-['>'] before:text-[#7a9c59] before:left-0 before:absolute">
                    <span className="text-[#f1f1f1] hover:text-white">
                      <a href="#">Liên hệ </a>
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="container mx-auto max-w-[1170px] my-10 ">
          <div className="ml-2 mr-3 h-1 bg-white"></div>
        </div>
        <div className="max-w-[1170px] container mx-auto px-2">
          <div className="text-white relative">
            <div className="inline-block absolute text-[#f1f1f1] max-xs:hidden">
              © 2023 THOL.COM.VN
            </div>
            <div className="inline-block absolute w-full text-center">
              <FontAwesomeIcon
                icon={faSquareFacebook}
                className="mx-1"
                size="lg"
              />
              <FontAwesomeIcon icon={faInstagram} className="mx-1" size="lg" />
              <FontAwesomeIcon icon={faTiktok} className="mx-1" size="lg" />
              <FontAwesomeIcon icon={faYoutube} className="mx-1" size="lg" />
            </div>
            <div className="pt-10 text-center hidden max-xs:block">
              ©<br />
              2023 UX Themes
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#5b5b5b]">
        <div className="container mx-auto px-4 text-center">
          <div className="pt-[10px] pb-[15px]">
            <div>
              <div className="bg-[#ffffff1a] m-1 p-2 inline-block rounded-md opacity-60 hover:opacity-100 duration-500 cursor-pointer">
                <MasterCard />
              </div>
              <div className="bg-[#ffffff1a] m-1 p-2 inline-block rounded-md opacity-60 hover:opacity-100 duration-500 cursor-pointer">
                <Paypal />
              </div>
              <div className="bg-[#ffffff1a] m-1 p-2 inline-block rounded-md opacity-60 hover:opacity-100 duration-500 cursor-pointer">
                <Visa />
              </div>
            </div>
            <div className="text-[#ffffff80]">
              Copyright 2023 © <strong>THOL.COM.VN</strong>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
