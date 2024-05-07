import axios from "axios";
import { LoginInterface, RegisterInterface } from "../types";
import { getRefreshToken } from "../utils";
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
    if (refreshToken)
        return axios.post(`${urlAPI}/auth/refreshToken`, {}, {
            headers: {
                Authorization: "Bearer " + refreshToken
            }
        })
    else return
}

const updateProfile = (id: number, data: { username?: string, avatar?: string }) => {
    return http.patch(`/auth/update/${id}`, data)
}

const listUser = () => {
    return http.get(`/auth/listuser`)
}

const AuthService = { register, login, refreshToken, logout, updateProfile, listUser }

export default AuthService