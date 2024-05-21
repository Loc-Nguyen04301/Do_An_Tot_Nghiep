import React, { useState } from 'react'
import "./ShowNotification.scss"

const ShowNotification = () => {
    const [lengthNotis, setLengthNotis] = useState(4)

    return (
        <div className="dropdown-content notification bg-[#f0f8ff] !min-w-[300px] right-0 top-[30px] p-4 shadow-search-box z-10">
            <ul className='max-h-[335px] overflow-y-auto'>
                {Array.from({ length: lengthNotis }, (_i, index) =>
                    <div className='flex items-center hover:bg-[rgba(0,0,0,.2)] rounded-md px-2'>
                        <li className='py-3 border-b border-border-color leading-6' key={index}>Mã đơn hàng 57 được mua vào lúc 14/05/2022 14:30</li>
                        <div className='w-3 h-[9px] bg-blue-600 rounded-full contents:" "'></div>
                    </div>
                )}
            </ul>
            <div className='text-center text-sm text-category-title cursor-pointer hover:text-[#1677ff]'>
                <span onClick={() => { setLengthNotis(prev => prev + 4) }}>click to expand</span>
            </div>
        </div>
    )
}

export default ShowNotification