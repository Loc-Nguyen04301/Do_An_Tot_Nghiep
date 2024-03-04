import React from 'react'
import {
    useSearchContext
} from '../../../contexts/SearchContext'

const SearchResult = () => {
    const { search } = useSearchContext()

    if (search.length >= 3)
        return (
            <div className="absolute left-0 w-full z-[10]" id="search-result">
                <div className="max-h-[80vh] bg-white shadow-search-box overflow-y-auto">
                    <ul className="h-full">
                        {Array.from({ length: 30 }, (_i, index) =>
                            <li className="p-3 flex items-center justify-between hover:bg-[#f7f7f7] hover:cursor-pointer border-b-[1px]" key={index}>
                                <div className="flex items-center gap-5">
                                    <img src="https://www.thol.com.vn/wp-content/uploads/2021/04/tuffstuff-proformance-plus-ppd-801_1-150x150.jpg" className="w-10 h-10 rounded-full" />
                                    <span>TuffStuff Proformance Plus Multi-Press</span >
                                </div>
                                <span>
                                    <strong>
                                        1₫
                                    </strong>
                                </span>
                            </li>)}
                    </ul>
                </div>
            </div>
        )
}

export default SearchResult