import React from 'react'

const SearchResult = () => {
    return (
        <div className="absolute left-0 w-full z-[1000]">
            <div className="max-h-[80vh] bg-white shadow-[0_0_10px_0_rgba(0,0,0,.1)] overflow-y-auto">
                <ul className="h-full">
                    {Array.from({ length: 30 }, () =>
                        <li className="p-3 flex items-center justify-between hover:bg-[#f7f7f7] hover:cursor-pointer border-b-[1px]">
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