import http from "./axios";

const updateProfile = (id: number, data: { username?: string, avatar?: string, phone_number?: string, address?: string }) => {
    return http.patch(`/user/${id}`, data)
}

const activeUser = (id: number) => {
    return http.patch(`/user/active/${id}`)
}

const listUser = () => {
    return http.get(`/user`)
}

const UserService = { updateProfile, listUser, activeUser }

export default UserService