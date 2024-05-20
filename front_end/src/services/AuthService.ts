import axios from "axios";
import { LoginInterface, RegisterInterface } from "@/types";
import { getRefreshToken, isTokenExpiration } from "@/utils";
import http, { getBaseUrl } from "./axios";


const register = (data: RegisterInterface) => {
    return http.post("/auth/register", data)
}

const login = (data: LoginInterface) => {
    return http.post("/auth/login", data)
}

const logout = () => {
    return http.post(`/auth/logout`)
}

const refreshToken = () => {
    const refreshToken = getRefreshToken()
    const urlAPI = getBaseUrl()
    if (refreshToken && isTokenExpiration(refreshToken))
        return axios.post(`${urlAPI}/auth/refreshToken`, {}, {
            headers: {
                Authorization: "Bearer " + refreshToken
            }
        })
    return
}

const getMe = () => {
    return http.post(`/auth/getMe`)
}
const AuthService = { register, login, refreshToken, logout, getMe }

export default AuthService