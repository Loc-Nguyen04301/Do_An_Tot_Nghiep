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

const AuthService = { register, login, refreshToken, logout }

export default AuthService