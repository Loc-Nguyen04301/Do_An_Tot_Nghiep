import React from "react"
import { RoutePath } from "../../../routes"
import clsx from "clsx"

interface NavigationBarProps {
  currentPath: string
}

const NavigationBar = ({ currentPath }: NavigationBarProps) => {
  return (
    <ul className="flex py-1 items-center px-2">
      <li className="mx-2">
        <a
          className={clsx(
            "py-2 hover:text-white text-[#fafafacc] font-semibold uppercase duration-300",
            currentPath === RoutePath.Home ? "text-white" : ""
          )}
          href="/"
        >
          Trang chủ
        </a>
      </li>
      <li className="mx-2">
        <a
          className={clsx(
            "py-2 hover:text-white text-[#fafafacc] font-semibold uppercase duration-300",
            currentPath === RoutePath.AboutUs ? "text-white" : ""
          )}
          href="/gioi-thieu"
        >
          Giới thiệu
        </a>
      </li>
      <li className="mx-2">
        <a
          className={clsx(
            "py-2 hover:text-white text-[#fafafacc] font-semibold uppercase duration-300",
            currentPath === RoutePath.Contact ? "text-white" : ""
          )}
          href="/lien-he"
        >
          Liên hệ
        </a>
      </li>
      <li className="mx-2">
        <a
          className={clsx(
            "py-2 hover:text-white text-[#fafafacc] font-semibold uppercase duration-300",
            currentPath === RoutePath.BankAccount ? "text-white" : ""
          )}
          href="/tai-khoan-ngan-hang"
        >
          Tài khoản ngân hàng
        </a>
      </li>
    </ul>
  )
}

export default NavigationBar
