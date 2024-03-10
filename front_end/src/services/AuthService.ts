import { LoginInterface } from "../types";
import http from "./axios";

const login = (data: LoginInterface) => {
    return http.post("/auth/login", data)
}

const register = () => { }

const AuthService = { login, register }

export default AuthService