import React, { useEffect } from 'react'
import { getAccessToken, isLogin } from '../utils'
import { Navigate } from 'react-router-dom'
import { RoutePath } from '../routes'
import { useAppSelector } from '../redux-toolkit/hook'
import { useAlertDispatch } from '../contexts/AlertContext'

interface HavingCartProps {
    children?: React.ReactElement
}

const HavingCart = ({ children }: HavingCartProps) => {
    const { cartItems } = useAppSelector(state => state.cart)
    const dispatchAlert = useAlertDispatch()

    useEffect(() => {
        dispatchAlert({ loading: true })
        setTimeout(() => {
            dispatchAlert({ loading: false })
        }, 1000)
    }, [])

    if (cartItems.length === 0) return <Navigate to={RoutePath.CartPage} replace />
    return <>{children}</>
}

export default HavingCart