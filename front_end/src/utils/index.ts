import { jwtDecode } from "jwt-decode"
import { getAccount } from "../redux-toolkit/authSlice"
import { Dispatch } from "@reduxjs/toolkit"

export const getAccessToken = (): string => {
    return localStorage.getItem('accessToken') || ''
}

export const getRefreshToken = (): string => {
    return localStorage.getItem('refreshToken') || ''
}

export const setAccessToken = (accessToken: string) => {
    localStorage.setItem('accessToken', accessToken)
}

export const setRefreshToken = (refreshToken: string) => {
    localStorage.setItem('refreshToken', refreshToken)
}

export const removeAccessToken = () => {
    localStorage.removeItem('accessToken')
}

export const removeRefreshToken = () => {
    localStorage.removeItem('refreshToken')
}

export const isLogin = (): string => {
    return localStorage.getItem("logged") || ''
}

export const setLoginTrue = () => {
    return localStorage.setItem("logged", "true")
}

export const setLoginFalse = () => {
    return localStorage.setItem("logged", "false")
}

export const convertNumbertoMoney = (number: number) => {
    return Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number)
}

export const checkTokenExpiration = (token: string) => {
    const decoded = jwtDecode(token);
    if (token && decoded && decoded.exp) {
        if (decoded.exp >= Date.now() / 1000) return false;
    }
    return true;
}