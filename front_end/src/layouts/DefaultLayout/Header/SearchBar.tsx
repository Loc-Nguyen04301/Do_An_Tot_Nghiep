import React, { ChangeEvent, useState } from "react"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useSearch } from "../../../contexts/SearchContext"


const SearchBar = () => {
  const { search, setSearch } = useSearch()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const handleClick = () => {
    const selectedElement = document.getElementById("search-result")
    console.log(selectedElement);
    selectedElement && selectedElement?.classList.remove("hidden")
  }

  return (
    <div className="w-full z-[1000]" onClick={handleClick}>
      <div className="h-[34px] w-full relative">
        <input
          placeholder="Tìm kiếm..."
          className="px-2 border-[1px] border-solid border-border-color rounded-2xl bg-[#f7f7f7] w-full h-8"
          value={search}
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
