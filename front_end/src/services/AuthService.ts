import axios from "axios";
import { LoginInterface, RegisterInterface } from "@/types";
import { getRefreshToken } from "@/utils";
import http, { getBaseUrl } from "./axios";
import { GoogleRegister } from "@/pages/Login/OAuthLogin";
import { ChangePassword } from "@/pages/ChangePassword";

const registerGoogle = (data: GoogleRegister) => {
    return http.post("/auth/registerGoogle", data)
}

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
    if (refreshToken) {
        return axios.post(`${urlAPI}/auth/refreshToken`, {}, {
            headers: {
                Authorization: "Bearer " + refreshToken
            }
        })
    }
    return
}

const getMe = () => {
    return http.post(`/auth/getMe`)
}

const changePassword = (data: ChangePassword) => {
    return http.post("/auth/changePassword", data)
}

const AuthService = { register, login, refreshToken, logout, getMe, registerGoogle, changePassword }

export default AuthService