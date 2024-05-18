import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { RoutePath } from "@/routes";
import { useAppSelector } from "@/redux-toolkit/hook";
import { Role } from "@/types";

export interface AdminGuardProps {
    children: ReactNode
}

const AdminGuard = ({ children }: AdminGuardProps) => {
    const { user } = useAppSelector(state => state.auth)

    if (user.role !== (Role.ADMIN)) return <Navigate to={RoutePath.Home} />

    return <>{children}</>
}

export default AdminGuard