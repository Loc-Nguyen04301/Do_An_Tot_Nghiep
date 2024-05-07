import React, { useEffect, useState } from 'react';
import {
    AppstoreOutlined,
    ShopOutlined,
    ShoppingCartOutlined,
    UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme, Typography } from 'antd';
import { Outlet } from 'react-router-dom';
import { useLocation, useNavigate } from "react-router-dom";
import "./AdminLayout.scss"

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
    Customer = "/admin/customer"
}

const items: MenuItem[] = [
    getItem('Dashboard', RoutePath.DashBoard, <AppstoreOutlined />),
    getItem('Kho hàng', RoutePath.Inventory, <ShopOutlined />),
    getItem('Đơn hàng', RoutePath.OrderAdmin, <ShoppingCartOutlined />),
    getItem('Khách hàng', RoutePath.Customer, <UserOutlined />),
];
interface AdminLayouttProps {
    children?: React.ReactElement
}

const AdminLayout = ({ children }: AdminLayouttProps) => {
    const [collapsed, setCollapsed] = useState(false);
    const [selectedKeys, setSelectedKeys] = useState<string>(RoutePath.DashBoard);

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const pathName = location.pathname;
        setSelectedKeys(pathName);
    }, [location.pathname]);

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} theme='dark'>
                <div className="demo-logo-vertical" />
                <Menu
                    theme='dark'
                    mode="inline"
                    selectedKeys={[selectedKeys]} items={items}
                    onClick={(item) => {
                        navigate(item.key);
                    }} />
            </Sider>
            <Layout>
                <Header style={{ background: colorBgContainer }}>
                    <Typography.Title className='text-center pt-3'>DASHBOARD MANAGEMENT</Typography.Title>
                </Header>
                <Content >
                    <div className='p-6 min-h-[360px]'>
                        {children ?? <Outlet />}
                    </div>
                </Content>
            </Layout>
        </Layout>
    )
}

export default AdminLayout