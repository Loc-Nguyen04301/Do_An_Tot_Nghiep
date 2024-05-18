import { useAppSelector } from "@/redux-toolkit/hook"
import { Role } from "@/types"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const useAdminCheck = () => {
    const { user } = useAppSelector(state => state.auth)
    const navigate = useNavigate()

    useEffect(() => {
        if (user.role !== Role.ADMIN) {
            navigate("/")
        }
    }, [user])
}

export default useAdminCheck