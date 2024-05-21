import React, { useEffect, useState } from 'react';
import {
    AppstoreOutlined,
    ShopOutlined,
    ShoppingCartOutlined,
    UserOutlined,
    LogoutOutlined,
    BellOutlined,
    SearchOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Avatar, Layout, Menu, theme, Typography } from 'antd';
import { Outlet } from 'react-router-dom';
import { useLocation, useNavigate } from "react-router-dom";
import logoImage from "@/assets/images/thol-logo.jpg"
import { useAppDispatch, useAppSelector } from '@/redux-toolkit/hook';
import "./AdminLayout.scss"
import { logOut } from '@/redux-toolkit/authSlice';
import { useAlertDispatch } from '@/contexts/AlertContext';
import ShowNotification from '@/layouts/AdminLayout/components/ShowNotification';

const { Header, Content, Sider } = Layout;
type MenuItem = Required<MenuProps>['items'][number];
function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

enum RoutePath {
    DashBoard = "/admin",
    Inventory = "/admin/inventory",
    OrderAdmin = "/admin/order",
    Customer = "/admin/customer",
    Notification = "/admin/notification",
    Logout = "/"
}

const items: MenuItem[] = [
    getItem('Dashboard', RoutePath.DashBoard, <AppstoreOutlined />),
    getItem('Kho hàng', RoutePath.Inventory, <ShopOutlined />),
    getItem('Đơn hàng', RoutePath.OrderAdmin, <ShoppingCartOutlined />),
    getItem('Thành viên', RoutePath.Customer, <UserOutlined />),
    getItem('Thông báo', RoutePath.Notification, <BellOutlined />),
    getItem('Đăng xuất', RoutePath.Logout, <LogoutOutlined />),
];
interface AdminLayouttProps {
    children?: React.ReactElement
}

const AdminLayout = ({ children }: AdminLayouttProps) => {
    const [collapsed, setCollapsed] = useState(false);
    const [selectedKeys, setSelectedKeys] = useState<string>(RoutePath.DashBoard);
    const { user } = useAppSelector(state => state.auth)

    const dispatch = useAppDispatch()
    const dispatchAlert = useAlertDispatch()

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const pathName = location.pathname;
        setSelectedKeys(pathName);
    }, [location.pathname]);

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const handleNavigateNotification = () => {
        navigate(RoutePath.Notification)
    }

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} theme='dark'>
                <div className="demo-logo-vertical">
                    <img src={logoImage} alt="logo" className='rounded-md' />
                </div>
                <Menu
                    theme='dark'
                    mode="inline"
                    selectedKeys={[selectedKeys]}
                    items={items}
                    onClick={(item) => {
                        if (item.key === RoutePath.Logout) {
                            dispatchAlert({ loading: true })
                            try {
                                setTimeout(() => {
                                    dispatch(logOut())
                                    dispatchAlert({ loading: false })
                                    navigate("/")
                                }, 2000)
                            } catch (error) {
                                console.log(error)
                            }
                        }
                        else {
                            navigate(item.key)
                        }
                    }} />
            </Sider>
            <Layout>
                <header style={{ background: colorBgContainer }} className='flex justify-end items-center gap-5 h-[50px] px-10'>
                    <SearchOutlined className='text-2xl' />
                    <div className='relative dropdown'>
                        <div className="absolute -top-2 -right-1 bg-button-red-color text-white w-4 h-4 rounded-full text-center cursor-pointer">
                            <span className="text-xs font-semibold block">0</span>
                        </div>
                        <BellOutlined className='text-2xl' onClick={handleNavigateNotification} />
                        <ShowNotification />
                    </div>
                    <div>
                        <Avatar src={user?.avatar} />
                        <Typography.Text type="secondary" strong className='ml-2'>{user?.username}</Typography.Text>
                    </div>
                </header>
                <Content>
                    <div className='p-6 min-h-[360px]'>
                        {children ?? <Outlet />}
                    </div>
                </Content>
            </Layout>
        </Layout>
    )
}

export default AdminLayout