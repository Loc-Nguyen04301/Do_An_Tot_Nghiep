import React, { useEffect, useState } from 'react'
import { isLogin } from '../utils'
import Loading from '../components/Alert/Loading'
import { Navigate } from 'react-router-dom'
import { RoutePath } from '../routes'

interface GuestGuardProps {
    children?: React.ReactElement
}

const GuestGuard = ({ children }: GuestGuardProps) => {
    const logged = isLogin()

    if (logged === "true") return <Navigate to={RoutePath.Home} replace />

    return <>{children}</>
}

export default GuestGuard