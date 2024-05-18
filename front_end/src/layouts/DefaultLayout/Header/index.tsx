import React, { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart, faUser } from "@fortawesome/free-regular-svg-icons"
import {
  faBars,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons"
import { Link, useLocation, useNavigate } from "react-router-dom"
import "./Header.scss"
import DropDown from "./DropDown"
import NavigationBar from "./NavigationBar"
import ShoppingCart from "./ShoppingCart"
import DrawerLeftMenu from "./DrawerLeftMenu"
import CompanyInfomation from "./CompanyInfomation"
import Logo from "./Logo"
import DrawerRightCart from "./DrawerRightCart"
import SearchBar from "./SearchBar"
import { RoutePath } from "@/routes"
import { getAccessToken } from "@/utils"
import { useAppDispatch, useAppSelector } from '@/redux-toolkit/hook';
import { logOut } from "@/redux-toolkit/authSlice"
import { useAlertDispatch } from "@/contexts/AlertContext"
import { Role } from "@/types"

const Header = () => {
  const [openLeftModal, setOpenLeftModal] = useState(false)
  const [openRightModal, setOpenRightModal] = useState(false)

  const { user } = useAppSelector(state => state.auth)
  const { totalQuantity } = useAppSelector(state => state.cart)
  const accessToken = getAccessToken()

  const dispatch = useAppDispatch()
  const dispatchAlert = useAlertDispatch()

  const location = useLocation()
  const navigate = useNavigate()
  const currentPath = location.pathname

  const showDrawerLeft = () => {
    setOpenLeftModal(true)
  }

  const showDrawerRight = () => {
    setOpenRightModal(true)
  }

  const handleLogout = () => {
    dispatchAlert({ loading: true })
    try {
      setTimeout(() => {
        dispatch(logOut())
        dispatchAlert({ loading: false })
        navigate("/")
      }, 2000)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <header>
      <div className="header-top bg-[#f2f2f2]">
        {
          accessToken && user
            ?
            <div className="flex justify-end items-end pr-3 pt-3 pb-2 gap-4">
              <div className="dropdown text-text-gray text-sm flex items-center gap-1 mr-8">
                <div className='w-[30px] h-[30px]'>
                  {user.avatar && <div className="bg-cover bg-center bg-no-repeat w-full h-full rounded-full" style={{ backgroundImage: `url(${user.avatar})` }}></div>}
                </div>
                <span className="cursor-pointer hover:text-main-orange-color">{user.username}</span>
                <div className="dropdown-content profile top-[30px] right-0 bg-gray-200 rounded-md">
                  <div className="py-2 px-4 min-w-[160px] rounded-lg">
                    <div className="text-center text-[#666666] text-base flex flex-col gap-1">
                      {user.role === Role.ADMIN && <Link to={RoutePath.DashBoard} className="cursor-pointer hover:text-main-orange-color">Quản lý</Link>}
                      {user.role === Role.USER && <Link to={RoutePath.Profile} className="cursor-pointer hover:text-main-orange-color">Tài khoản của tôi</Link>}
                      {user.role === Role.USER && <Link to={RoutePath.Purchase} className="cursor-pointer hover:text-main-orange-color">Đơn mua</Link>}
                      <div className="cursor-pointer hover:text-main-orange-color" onClick={handleLogout}>Đăng xuất</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            :
            <>
              <p className="pl-10 pt-3 pb-2 text-text-gray text-sm">
                Chào mừng bạn đến với THOL Store
                <Link to={RoutePath.RegisterPage} className="text-main-orange-color px-1">
                  Đăng ký
                </Link>
                hoặc
                <Link to={RoutePath.LoginPage} className="text-main-orange-color px-1">
                  Đăng nhập
                </Link>
              </p>
            </>
        }
      </div>
      <div className="header-middle mx-auto px-1 max-w-[1140px] mb-1">
        <div className="flex justify-between items-center flex-1 pt-2 px-3">
          {/*Menu Drawer Mobile Screen*/}
          <div className="md:hidden">
            <div
              className="flex items-center gap-2 uppercase font-bold text-[#666666d9] h-full"
              onClick={showDrawerLeft}
            >
              <FontAwesomeIcon icon={faBars} size="lg" />
              <span className="text-sm max-xs:text-white">Menu</span>
            </div>
            <DrawerLeftMenu
              openLeftModal={openLeftModal}
              setOpenLeftModal={setOpenLeftModal}
            />
          </div>
          {/* Logo */}
          <Logo />
          {/*Cart Drawer Mobile Screen*/}
          <div className="md:hidden">
            <ul className="flex items-center gap-[15px] h-full">
              <li className="cursor-pointer">
                <FontAwesomeIcon icon={faHeart} size="lg" />
              </li>
              <li className="cursor-pointer">
                <FontAwesomeIcon icon={faUser} size="lg" />
              </li>
              <li
                className="cursor-pointer relative dropdown"
                onClick={showDrawerRight}
              >
                <FontAwesomeIcon icon={faCartShopping} size="lg" />
                <div className="absolute -top-2 -right-1 bg-button-red-color text-white w-4 h-4 rounded-full text-center">
                  <span className="text-xs font-semibold block">{totalQuantity}</span>
                </div>
              </li>
              <DrawerRightCart
                openRightModal={openRightModal}
                setOpenRightModal={setOpenRightModal}
              />
            </ul>
          </div>
          {/* SearchBar */}
          <div className="max-md:hidden w-1/2 relative">
            <SearchBar />
          </div>
          {/* Company Infomation */}
          <CompanyInfomation />
        </div>
      </div>
      <div className="header-bottom bg-main-orange-color max-[950px]:text-xs text-sm max-md:hidden">
        <div className="max-w-[1140px] mx-auto container px-4 flex items-center justify-between">
          <div className="max-h-full">
            <div className="flex">
              <DropDown />
              <NavigationBar currentPath={currentPath} />
            </div>
          </div>
          <div className="max-h-full">
            <div className="3-icon">
              <ul className="flex items-center gap-[10px]">
                <li className="cursor-pointer">
                  <FontAwesomeIcon icon={faHeart} size="xl" />
                </li>
                <li className="divider border-l-[1px] h-[2rem] border-white opacity-40"></li>
                <li className="cursor-pointer">
                  <Link to={RoutePath.LoginPage}>
                    <FontAwesomeIcon icon={faUser} size="xl" />
                  </Link>
                </li>
                <li className="divider border-l-[1px] h-[2rem] border-white opacity-40"></li>
                <li className="dropdown">
                  <Link to={RoutePath.CartPage}>
                    <FontAwesomeIcon icon={faCartShopping} size="xl" />
                    <div className="absolute -top-2 -right-1 bg-button-red-color text-white w-4 h-4 rounded-full text-center">
                      <span className="text-xs font-semibold block">{totalQuantity}</span>
                    </div>
                  </Link>
                  <ShoppingCart />
                </li>
                <li className="divider border-l-[1px] h-[2rem] border-white opacity-40"></li>
                <li>
                  <Link to={RoutePath.CheckoutPage}>
                    <div className="bg-button-red-color rounded-full hover:bg-red-800 duration-300 cursor-pointer">
                      <div className="px-3 block h-[2rem]">
                        <span className="uppercase text-white font-semibold tracking-wide block leading-[2rem]">
                          Thanh toán
                        </span>
                      </div>
                    </div>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-4 max-md:border-b-[1px]"></div>
    </header>
  )
}

export default Header
