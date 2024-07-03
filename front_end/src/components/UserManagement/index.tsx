import { useAppSelector } from '@/redux-toolkit/hook'
import { RoutePath } from '@/routes'
import React from 'react'
import { NavLink } from 'react-router-dom'
import clsx from 'clsx';

interface UserManagementProps {
    children: React.ReactElement
}

const UserManagement = ({ children }: UserManagementProps) => {
    const { user } = useAppSelector(state => state.auth)

    return (
        <div className="mx-auto max-w-[1112px] py-8 px-4 bg-[#f5f5f5] my-8">
            <div className='flex'>
                <div className='min-w-[240px]'>
                    <div className='flex flex-col'>
                        <NavLink to={RoutePath.Profile} className={({ isActive }) => clsx("pl-2 py-5 font-semibold cursor-pointer hover:text-main-orange-color ", isActive && "text-main-orange-color")} >
                            Tài khoản của tôi
                        </NavLink>
                        <NavLink to={RoutePath.Purchase} className={({ isActive }) => clsx("pl-2 py-5 font-semibold cursor-pointer hover:text-main-orange-color", isActive && "text-main-orange-color")} >
                            Đơn mua
                        </NavLink>
                        {
                            user && !user.is_social_login && <NavLink to={RoutePath.ChangePassword} className={({ isActive }) => clsx("pl-2 py-5 font-semibold cursor-pointer hover:text-main-orange-color", isActive && "text-main-orange-color")} >
                                Đổi mật khẩu
                            </NavLink>
                        }
                    </div>
                </div>
                {children}
            </div>
        </div>
    )
}

export default UserManagement