import React, { ChangeEvent, useState } from "react"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useSearchContext } from "../../../contexts/SearchContext"
import SearchResult from "./SearchResult"
import { LoadingOutlined } from '@ant-design/icons';

const SearchBar = () => {
  const [loading, setLoading] = useState(false)
  const { search, setSearch } = useSearchContext()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  return (
    <>
      <div className="w-full z-[10]">
        <div className="h-[34px] w-full relative">
          <input
            type="text"
            placeholder="Tìm kiếm..."
            className="px-2 border-[1px] border-solid border-border-color rounded-2xl bg-[#f7f7f7] text-placeholder-color w-full h-8"
            value={search}
            onChange={handleChange}
          />
          {
            loading
              ?
              <LoadingOutlined
                className="absolute right-3 top-[8px]" />
              : <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="absolute right-3 top-[8px]"
              />
          }

        </div>
      </div>
      <SearchResult setLoading={setLoading} />
    </>
  )
}

export default SearchBar
