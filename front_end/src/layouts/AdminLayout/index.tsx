import React, { useEffect, useState } from 'react';
import {
    AppstoreOutlined,
    ShopOutlined,
    ShoppingCartOutlined,
    UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Outlet } from 'react-router-dom';
import { useLocation, useNavigate } from "react-router-dom";
import "./AdminLayout.scss"

const { Header, Content, Footer, Sider } = Layout;
type MenuItem = Required<MenuProps>['items'][number];

interface AdminLayouttProps {
    children?: React.ReactElement
}

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
    getItem('Customer', RoutePath.Customer, <UserOutlined />),
];

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
                <Header style={{ padding: 0, background: colorBgContainer }} />
                <Content style={{ margin: '0 16px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>User</Breadcrumb.Item>
                        <Breadcrumb.Item>Bill</Breadcrumb.Item>
                    </Breadcrumb>
                    <div
                        style={{
                            padding: 24,
                            minHeight: 360,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        {children ?? <Outlet />}
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    Ant Design ©{new Date().getFullYear()} Created by Ant UED
                </Footer>
            </Layout>
        </Layout>
    )
}

export default AdminLayout