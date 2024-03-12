import axios from "axios";
import { LoginInterface } from "../types";
import { getRefreshToken } from "../utils";
import http, { getBaseUrl } from "./axios";

const login = (data: LoginInterface) => {
    return http.post("/auth/login", data)
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

const AuthService = { login, refreshToken }

export default AuthService