import React, { ChangeEvent, useState } from "react"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("")

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  return (
    <div className="w-full">
      <div className="h-[34px] w-full relative">
        <input
          placeholder="Tìm kiếm..."
          className="px-2 border-[1px] border-solid border-border-color rounded-2xl bg-[#f7f7f7] w-full h-8"
          value={searchTerm}
          onChange={handleChange}
        />
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className="absolute right-3 top-[8px]"
        />
      </div>
    </div>
  )
}

export default SearchBar
