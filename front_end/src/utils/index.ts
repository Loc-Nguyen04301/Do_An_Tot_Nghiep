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

export const isLogin = (): string => {
    return localStorage.getItem("logged") || ''
}

export const setLoginTrue = () => {
    return localStorage.setItem("logged", "true")
}

export const setLoginFalse = () => {
    return localStorage.setItem("logged", "false")
}

