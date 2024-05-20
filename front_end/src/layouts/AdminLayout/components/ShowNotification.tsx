import React, { useState } from 'react'
import "./ShowNotification.scss"

const ShowNotification = () => {
    const [lengthNotis, setLengthNotis] = useState(3)
    return (
        <div className="dropdown-content notification bg-[#f0f8ff] !min-w-[300px] right-0 top-[30px] p-4 shadow-search-box z-10">
            <ul className='max-h-[195px] overflow-y-auto'>
                {Array.from({ length: lengthNotis }, (_i, index) =>
                    <li className='notifi-item pb-3 border-b border-border-color my-2 leading-6 hover:font-semibold' key={index}>Mã đơn hàng 57 được mua vào lúc 14/05/2022 14:30</li>
                )}
            </ul>
            <div className='text-center text-sm text-category-title cursor-pointer hover:text-[#1677ff]'>
                <span onClick={() => { setLengthNotis(prev => prev + 3) }}>click to expand</span>
            </div>
        </div>
    )
}

export default ShowNotification