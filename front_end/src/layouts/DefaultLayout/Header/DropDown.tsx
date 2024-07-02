import React from "react"
import { faBars, faChevronDown } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { RoutePath } from "@/routes"
import { useLocation } from "react-router-dom"
import clsx from "clsx"
import { useAppSelector } from "@/redux-toolkit/hook"

const DropDown = () => {
  var { categoryList } = useAppSelector((state) => state.category)
  const { from_date, to_date } = useAppSelector((state) => state.saleCampaign)
  const nowMilliSeconds = new Date().getTime()
  if (
    !(from_date &&
      to_date &&
      new Date(from_date).getTime() <= nowMilliSeconds &&
      nowMilliSeconds <= new Date(to_date).getTime())
  ) {
    categoryList = categoryList.filter(c => c.path !== 'super-sale')
  }
  const location = useLocation()
  const currentPath = location.pathname

  return (
    categoryList.length > 0 &&
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
            className={clsx("px-4 py-3 block w-[244px] border-b border-border-color uppercase", currentPath.includes(category.path) && "text-main-orange-color")}>
            {category.name}
          </a>
        ))}
      </div>
    </div>
  )
}

export default DropDown
