import React from 'react'
import { isLogin } from '../utils'
import Loading from '../components/Alert/Loading'
import { Navigate } from 'react-router-dom'
import { RoutePath } from '../routes'

interface AuthGuardProps {
    children?: React.ReactElement
}

const AuthGuard = ({ children }: AuthGuardProps) => {
    const logged = isLogin()

    if (logged !== "true") return <Navigate to={RoutePath.LoginPage} replace />

    return <>{children}</>
}

export default AuthGuard