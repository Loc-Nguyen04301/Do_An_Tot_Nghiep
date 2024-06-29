import { useAppSelector } from "@/redux-toolkit/hook"
import { RoutePath } from "@/routes"
import { Role } from "@/types"
import { getAccessToken } from "@/utils"
import { Navigate } from "react-router-dom"

interface ManagementGuardProps {
    children?: React.ReactElement
    onlyAdmin?: boolean
}

const ManagementGuard = ({ children, onlyAdmin = false }: ManagementGuardProps) => {
    const { user } = useAppSelector(state => state.auth)

    if (user && user.role === Role.USER) return <Navigate to={RoutePath.Home} replace />
    else if (onlyAdmin && user?.role === Role.SELLER) return <Navigate to={RoutePath.DashBoard} replace />
    return <>{children} </>
}

export default ManagementGuard


