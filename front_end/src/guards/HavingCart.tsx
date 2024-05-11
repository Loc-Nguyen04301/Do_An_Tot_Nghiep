import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { RoutePath } from '@/routes'
import { useAppSelector } from '@/redux-toolkit/hook'

interface HavingCartProps {
    children?: React.ReactElement
}

const HavingCart = ({ children }: HavingCartProps) => {
    const { cartItems } = useAppSelector(state => state.cart)

    if (cartItems.length === 0) {
        return <Navigate to={RoutePath.CartPage} replace />
    }
    return <>{children}</>
}

export default HavingCart