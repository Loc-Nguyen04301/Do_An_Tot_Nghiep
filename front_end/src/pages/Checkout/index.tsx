import React from 'react'
import { Helmet } from 'react-helmet-async'
import { NavLink } from 'react-router-dom'
import { RoutePath } from '../../routes'
import { RightOutlined } from '@ant-design/icons';

const Checkout = () => {
    return (
        <>
            <Helmet>
                <title>Thanh toán - THOL</title>
                <meta name='description' content='Beginner friendly page for learning React Helmet.' />
            </Helmet>
            <div className="max-w-[1140px] container mx-auto">
                <div className='my-12 text-center'>
                    <NavLink to={RoutePath.CartPage} className={({ isActive }) => isActive ? "mx-5 text-2xl text-main-orange-color" : "mx-5 text-2xl hover:text-main-orange-color"}>SHOPPING CART</NavLink>
                    <RightOutlined className='text-text-gray' />
                    <NavLink to={RoutePath.CheckoutPage} className={({ isActive }) => isActive ? "mx-5 text-2xl text-main-orange-color" : "mx-5 text-2xl hover:text-main-orange-color"}>CHECKOUT DETAILS</NavLink>
                </div>
            </div>
        </>
    )
}

export default Checkout