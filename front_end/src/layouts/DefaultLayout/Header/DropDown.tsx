import React from "react"
import { faBars, faChevronDown } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import categoryList from "../../../assets/data/navigation"
import { RoutePath } from "../../../routes"
import { Link } from "react-router-dom"

const DropDown = () => {
  return (
    <div className="dropdown">
      <div className="dropbtn flex items-center gap-3">
        <FontAwesomeIcon icon={faBars} />
        <span className="max-w-[160px] font-semibold text-base max-[950px]:text-xs">
          Danh mục sản phẩm
        </span>
        <FontAwesomeIcon icon={faChevronDown} />
      </div>
      <div className="dropdown-content text-text-gray text-base bg-white">
        {categoryList.map((category) => (
          <Link to={`${RoutePath.ListByCategory}/${category.path}`} key={category.path} className="px-4 py-3 block w-[244px] border-b border-border-color">
            {category.title}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default DropDown
