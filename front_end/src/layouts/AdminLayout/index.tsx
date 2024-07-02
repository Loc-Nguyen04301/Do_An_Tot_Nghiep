import React, { useEffect, useState } from 'react';
import {
    ShopOutlined,
    ShoppingCartOutlined,
    UserOutlined,
    LogoutOutlined,
    BellOutlined,
    SearchOutlined,
    TransactionOutlined,
    HomeOutlined,
    MenuOutlined,
    StarOutlined,
    GiftFilled
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Avatar, Layout, Menu, theme, Typography } from 'antd';
import { Outlet } from 'react-router-dom';
import { useLocation, useNavigate } from "react-router-dom";
import logoImage from "@/assets/images/thol-logo.jpg"
import { useAppDispatch, useAppSelector } from '@/redux-toolkit/hook';
import { logOut } from '@/redux-toolkit/authSlice';
import { useAlertDispatch } from '@/contexts/AlertContext';
import ShowNotification from '@/layouts/AdminLayout/components/ShowNotification';
import useBillNotification from '@/hooks/useBillNotification';
import { fetchBillNoti } from '@/redux-toolkit/billNotiSlice';
import { RoutePath } from '@/routes';
import "./AdminLayout.scss"
import { Role } from '@/types';

const { Content, Sider } = Layout;
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

export enum RoutePathAdmin {
    DashBoard = "/admin",
    Inventory = "/admin/inventory",
    OrderAdmin = "/admin/order",
    Customer = "/admin/customer",
    Notification = "/admin/notification",
    Transaction = "/admin/transaction",
    Category = "/admin/category",
    ReviewAdmin = "/admin/review",
    SaleCampaign = "/admin/sale-campaign",
    Logout = "/"
}

interface AdminLayouttProps {
    children?: React.ReactElement
}

const AdminLayout = ({ children }: AdminLayouttProps) => {
    const { user } = useAppSelector((state) => state.auth)
    const [collapsed, setCollapsed] = useState(false);
    const [selectedKeys, setSelectedKeys] = useState<string>(RoutePathAdmin.DashBoard);

    const items: MenuItem[] = [
        getItem('Dashboard', RoutePathAdmin.DashBoard, <HomeOutlined />),
        getItem('Đơn hàng', RoutePathAdmin.OrderAdmin, <ShoppingCartOutlined />),
        getItem('Lịch sử giao dịch', RoutePathAdmin.Transaction, <TransactionOutlined />),
        getItem('Sản phẩm', RoutePathAdmin.Inventory, <ShopOutlined />),
        getItem('Danh mục sản phẩm', RoutePathAdmin.Category, <MenuOutlined />),
        getItem('Chiến dịch giảm giá', RoutePathAdmin.SaleCampaign, <GiftFilled />),
        getItem('Đánh giá sản phẩm', RoutePathAdmin.ReviewAdmin, <StarOutlined />),
        getItem('Thành viên', RoutePathAdmin.Customer, <UserOutlined />),
        getItem('Thông báo', RoutePathAdmin.Notification, <BellOutlined />),
        getItem('Đăng xuất', RoutePathAdmin.Logout, <LogoutOutlined />)
    ];

    const filteredItems = user?.role === Role.SELLER
        ? [
            getItem('Dashboard', RoutePathAdmin.DashBoard, <HomeOutlined />),
            getItem('Đơn hàng', RoutePathAdmin.OrderAdmin, <ShoppingCartOutlined />),
            getItem('Thành viên', RoutePathAdmin.Customer, <UserOutlined />),
            getItem('Thông báo', RoutePathAdmin.Notification, <BellOutlined />),
            getItem('Đăng xuất', RoutePathAdmin.Logout, <LogoutOutlined />)
        ]
        : items;

    const dispatch = useAppDispatch()
    const dispatchAlert = useAlertDispatch()

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const pathName = location.pathname;
        setSelectedKeys(pathName);
    }, [location.pathname]);

    useEffect(() => {
        dispatch(fetchBillNoti())
    }, [])

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const navigateHomePage = () => {
        window.location.href = RoutePath.Home
    }
    useBillNotification()

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} theme='dark'>
                <div className="m-4 cursor-pointer">
                    <img src={logoImage} alt="logo" className='rounded-md' onClick={navigateHomePage} />
                </div>
                <Menu
                    theme='dark'
                    mode="inline"
                    selectedKeys={[selectedKeys]}
                    items={filteredItems}
                    onClick={(item) => {
                        if (item.key === RoutePathAdmin.Logout) {
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
                    <ShowNotification />
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