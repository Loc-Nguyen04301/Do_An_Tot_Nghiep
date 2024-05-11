import React from "react"
import { RoutePath } from "@/routes"
import clsx from "clsx"
import { Link } from "react-router-dom"

interface NavigationBarProps {
  currentPath: string
}

const NavigationBar = ({ currentPath }: NavigationBarProps) => {
  return (
    <ul className="flex py-1 items-center px-2">
      <li className="mx-2">
        <Link
          className={clsx(
            "py-2 hover:text-white text-[#fafafacc] font-semibold uppercase duration-300",
            currentPath === RoutePath.Home ? "text-white" : ""
          )}
          to="/"
        >
          Trang chủ
        </Link>
      </li>
      <li className="mx-2">
        <Link
          className={clsx(
            "py-2 hover:text-white text-[#fafafacc] font-semibold uppercase duration-300",
            currentPath === RoutePath.AboutUs ? "text-white" : ""
          )}
          to="/gioi-thieu"
        >
          Giới thiệu
        </Link>
      </li>
      <li className="mx-2">
        <Link
          className={clsx(
            "py-2 hover:text-white text-[#fafafacc] font-semibold uppercase duration-300",
            currentPath === RoutePath.Contact ? "text-white" : ""
          )}
          to="/lien-he"
        >
          Liên hệ
        </Link>
      </li>
      <li className="mx-2">
        <Link
          className={clsx(
            "py-2 hover:text-white text-[#fafafacc] font-semibold uppercase duration-300",
            currentPath === RoutePath.BankAccount ? "text-white" : ""
          )}
          to="/tai-khoan-ngan-hang"
        >
          Tài khoản ngân hàng
        </Link>
      </li>
    </ul>
  )
}

export default NavigationBar
