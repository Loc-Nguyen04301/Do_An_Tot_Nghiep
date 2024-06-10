import React from "react"
import { faBars, faChevronDown } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import categoryList from "@/assets/data/categoryList"
import { RoutePath } from "@/routes"
import { Link, useLocation } from "react-router-dom"
import clsx from "clsx"

const DropDown = () => {
  const location = useLocation()
  const currentPath = location.pathname

  return (
    <div className="dropdown">
      <div className="dropbtn flex items-center justify-between gap-3 w-[244px]">
        <FontAwesomeIcon icon={faBars} />
        <span className="max-w-[160px] font-semibold text-base max-[950px]:text-xs">
          Danh mục sản phẩm
        </span>
        <FontAwesomeIcon icon={faChevronDown} />
      </div>
      <div className="dropdown-content text-text-gray text-base bg-white">
        {categoryList.map((category) => (
          <a
            key={category.path}
            href={`${RoutePath.ListByCategory}/${category.path}`}
            className={clsx("px-4 py-3 block w-[244px] border-b border-border-color", currentPath.includes(category.path) && "text-main-orange-color")}>
            {category.title}
          </a>
        ))}
      </div>
    </div >
  )
}

export default DropDown
