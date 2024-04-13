import React, { useEffect } from 'react'
import { getAccessToken } from '../utils'
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
        const timer = setTimeout(() => {
            dispatchAlert({ loading: false })
        }, 1000)

        return () => clearTimeout(timer);
    }, [])

    if (cartItems.length === 0) return <Navigate to={RoutePath.CartPage} replace />
    return <>{children}</>
}

export default HavingCart