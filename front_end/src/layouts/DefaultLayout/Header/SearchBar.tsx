import React, { ChangeEvent, useEffect, useRef, useState } from "react"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useSearchContext } from "@/contexts/SearchContext"
import SearchResult from "./SearchResult"
import { LoadingOutlined } from '@ant-design/icons';

const SearchBar = () => {
  const [loading, setLoading] = useState(false)
  const { search, setSearch } = useSearchContext()
  const [showResults, setShowResults] = useState(false);
  const searchBarRef = useRef<HTMLDivElement>(null);
  const searchResultRef = useRef<HTMLDivElement>(null);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  useEffect(() => {
    if (search.length > 0) {
      setShowResults(true)
    }
  }, [search])

  const handleClickOutside = (e: MouseEvent) => {
    // Kiểm tra xem SearchBar có bấm vào vùng ngoài hay không
    // nếu bấm vùng ngoài thì cho ẩn SearchResult, nếu bấm vùng input thì vẫn cho hiện SearchResult
    if (searchBarRef.current && !searchBarRef.current.contains(e.target as Node)) setShowResults(false);
    else setShowResults(true);
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div ref={searchBarRef} className="w-full z-[10]" id="search-bar">
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
        {showResults && <SearchResult ref={searchResultRef} setLoading={setLoading} />}
      </div>
    </div>
  )
}

export default SearchBar
