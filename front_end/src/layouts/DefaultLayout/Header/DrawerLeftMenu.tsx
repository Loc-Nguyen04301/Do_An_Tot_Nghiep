import React from "react"
import { Drawer, ConfigProvider } from "antd"
import { DrawerStyles } from "antd/es/drawer/DrawerPanel"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import {
  faInstagram,
  faSquareFacebook,
  faTiktok,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons"
import SearchBar from "./SearchBar"
import { Link, useLocation } from "react-router-dom"
import { RoutePath } from "@/routes"
import clsx from "clsx"
import { useAppSelector } from "@/redux-toolkit/hook"

interface DrawerLeftMenuProps {
  openLeftModal: boolean
  setOpenLeftModal: React.Dispatch<React.SetStateAction<boolean>>
}
const DrawerLeftMenu = ({
  openLeftModal,
  setOpenLeftModal,
}: DrawerLeftMenuProps) => {
  const { categoryList } = useAppSelector((state) => state.category)
  const drawerStyles: DrawerStyles = {
    content: {
      boxShadow: "-10px 0 10px #666",
    },
  }

  const onClose = () => {
    setOpenLeftModal(false)
  }

  const location = useLocation()
  const currentPath = location.pathname

  return (
    <ConfigProvider
      drawer={{
        styles: drawerStyles,
      }}
    >
      <Drawer
        placement="left"
        open={openLeftModal}
        onClose={onClose}
        width={260}
        title={<SearchBar />}
        footer={
          <div className="text-center">
            <FontAwesomeIcon
              icon={faSquareFacebook}
              className="mx-1"
              size="lg"
            />
            <FontAwesomeIcon icon={faInstagram} className="mx-1" size="lg" />
            <FontAwesomeIcon icon={faTiktok} className="mx-1" size="lg" />
            <FontAwesomeIcon icon={faYoutube} className="mx-1" size="lg" />
          </div>
        }
        className="bg-[#f8f8f8]"
      >
        <div className="font-bold uppercase flex flex-col text-text-gray text-sm font-['Open_Sans']">
          {categoryList.map((category) => (
            <Link
              key={category.path}
              to={`${RoutePath.ListByCategory}/${category.path}`}
              className={clsx("category-item block py-4 border-b-[1px] border-border-color", currentPath.includes(category.path) && "text-main-orange-color")}
              onClick={onClose}
            >
              {category.name}
            </Link>
          ))}
        </div>
      </Drawer>
    </ConfigProvider >
  )
}

export default DrawerLeftMenu
