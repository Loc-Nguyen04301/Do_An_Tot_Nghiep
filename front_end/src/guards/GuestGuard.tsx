import React, { useEffect, useState } from 'react'
import { getAccessToken, isTokenExpiration } from '@/utils'
import Loading from '@/components/Alert/Loading'
import { Navigate } from 'react-router-dom'
import { RoutePath } from '@/routes'

interface GuestGuardProps {
    children?: React.ReactElement
}

const GuestGuard = ({ children }: GuestGuardProps) => {
    const accessToken = getAccessToken()

    if (accessToken && !isTokenExpiration(accessToken)) return <Navigate to={RoutePath.Home} replace />

    return <>{children}</>
}

export default GuestGuard