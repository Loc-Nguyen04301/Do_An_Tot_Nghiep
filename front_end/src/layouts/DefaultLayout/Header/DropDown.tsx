import React from "react"
import { faBars, faChevronDown } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import categoryList from "../../../assets/data/navigation"

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
      <div className="dropdown-content text-text-gray text-base">
        {categoryList.map((category) => (
          <a href={`/danh-muc/${category.path}`} key={category.path}>
            {category.title}
          </a>
        ))}
      </div>
    </div>
  )
}

export default DropDown
