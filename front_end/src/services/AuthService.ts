import axios from "axios";
import { LoginInterface } from "../types";
import { getAccessToken, getRefreshToken } from "../utils";
import http, { getBaseUrl } from "./axios";

const login = (data: LoginInterface) => {
    return http.post("/auth/login", data)
}

const logout = () => {
    const accessToken = getAccessToken()
    const urlAPI = getBaseUrl()
    return axios.post(`${urlAPI}/auth/logout`, {}, {
        headers: {
            Authorization: "Bearer " + accessToken
        }
    })
}

const refreshToken = () => {
    const refreshToken = getRefreshToken()
    const urlAPI = getBaseUrl()
    return axios.post(`${urlAPI}/auth/refreshToken`, {}, {
        headers: {
            Authorization: "Bearer " + refreshToken
        }
    })
}

const AuthService = { login, refreshToken, logout }

export default AuthService