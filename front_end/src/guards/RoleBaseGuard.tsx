import React, { ReactNode } from "react";
import { Role } from "../types";
import { getAccessToken } from "../utils";
import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router-dom";
import { RoutePath } from "../routes";


export interface RoleBaseGuardProps {
    accessibleRole: Array<Role>;
    children: ReactNode
}

const RoleBaseGuard = ({ accessibleRole, children }: RoleBaseGuardProps) => {
    const accessToken = getAccessToken()
    const decoded = jwtDecode(accessToken);
    console.log(decoded)
    if (!accessibleRole.includes(Role.ADMIN)) return <Navigate to={RoutePath.Home} />

    return <>{children}</>
}

export default RoleBaseGuard