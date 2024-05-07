import http from "./axios";

const updateProfile = (id: number, data: { username?: string, avatar?: string }) => {
    return http.patch(`/user/${id}`, data)
}

const listUser = () => {
    return http.get(`/user`)
}

const UserService = { updateProfile, listUser }

export default UserService