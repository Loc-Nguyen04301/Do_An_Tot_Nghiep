import React from 'react'
import { getAccessToken } from '@/utils'
import { Navigate } from 'react-router-dom'
import { RoutePath } from '@/routes'

interface AuthGuardProps {
    children?: React.ReactElement
}

const AuthGuard = ({ children }: AuthGuardProps) => {
    const accessToken = getAccessToken()

    if (!accessToken) return <Navigate to={RoutePath.NotFound} replace />
    return <>{children}</>
}

export default AuthGuard