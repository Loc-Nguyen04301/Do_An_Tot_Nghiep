import { useEffect, useState } from 'react'
import { Card, Space, Statistic, Table, Typography } from 'antd'
import {
    DollarCircleOutlined,
    ShoppingCartOutlined,
    ShoppingOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { getOrders, getRevenue } from '../../../API';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import DashboardService from '../../../services/DashboardService';
import { useAlertDispatch } from '../../../contexts/AlertContext';
import { convertNumbertoMoney } from '../../../utils';
import { Helmet } from 'react-helmet-async';
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);


const DashBoard = () => {
    const [count, setCount] = useState<{ billCount: number, productCount: number, userCount: number, revenueCount: number }>();
    const dispatchAlert = useAlertDispatch()
    const getCountDashboard = async () => {
        dispatchAlert({ loading: true })
        try {
            const res = await DashboardService.countDashboard()
            setCount(res.data.data)
            dispatchAlert({ loading: false })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getCountDashboard()
    }, [])

    return (
        <>
            <Helmet>
                <title>Dashboard</title>
                <meta name='description' content='Beginner friendly page for learning React Helmet.' />
            </Helmet>
            <Space direction='vertical' size={20} className='w-full'>
                <Typography.Title level={4}>Dashboard</Typography.Title>
                <Space direction="horizontal" className='w-full justify-center'>
                    <DashboardCard
                        icon={
                            <ShoppingCartOutlined
                                style={{
                                    color: "green",
                                    backgroundColor: "rgba(0,255,0,0.25)",
                                    borderRadius: 20,
                                    fontSize: 24,
                                    padding: 8,
                                }}
                            />
                        }
                        title={"Orders"}
                        value={count?.billCount}
                    />
                    <DashboardCard
                        icon={
                            <ShoppingOutlined
                                style={{
                                    color: "blue",
                                    backgroundColor: "rgba(0,0,255,0.25)",
                                    borderRadius: 20,
                                    fontSize: 24,
                                    padding: 8,
                                }}
                            />
                        }
                        title={"Inventory"}
                        value={count?.productCount}
                    />
                    <DashboardCard
                        icon={
                            <UserOutlined
                                style={{
                                    color: "purple",
                                    backgroundColor: "rgba(0,255,255,0.25)",
                                    borderRadius: 20,
                                    fontSize: 24,
                                    padding: 8,
                                }}
                            />
                        }
                        title={"Customer"}
                        value={count?.userCount}
                    />
                    <DashboardCard
                        icon={
                            <DollarCircleOutlined
                                style={{
                                    color: "red",
                                    backgroundColor: "rgba(255,0,0,0.25)",
                                    borderRadius: 20,
                                    fontSize: 24,
                                    padding: 8,
                                }}
                            />
                        }
                        title={"Revenue"}
                        value={convertNumbertoMoney(count?.revenueCount)}
                    />
                </Space>
                <Space>
                    <RecentOrders />
                </Space>
                <Space>
                    <DashboardChart />
                </Space>
            </Space>
        </>
    )
}
export default DashBoard

const DashboardCard = ({ icon, title, value }: { icon: any, title: any, value: any }) => {
    return (
        <Card>
            <Space direction="horizontal">
                {icon}
                <Statistic title={title} value={value} />
            </Space>
        </Card>
    )
}

const RecentOrders = () => {
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getOrders().then((res) => {
            setDataSource(res.products.splice(0, 3));
            setLoading(false);
        });
    }, []);

    return (
        <>
            <Typography.Title level={5}>Recent Orders</Typography.Title>
            <Table
                columns={[
                    {
                        title: "Title",
                        dataIndex: "title",
                    },
                    {
                        title: "Quantity",
                        dataIndex: "quantity",
                    },
                    {
                        title: "Price",
                        dataIndex: "discountedPrice",
                    },
                ]}
                loading={loading}
                dataSource={dataSource}
                pagination={false}
            ></Table>
        </>
    );
}

const DashboardChart = () => {
    const [revenueData, setReveneuData] = useState({
        labels: [] as any[],
        datasets: [] as any[],
    });

    useEffect(() => {
        getRevenue().then((res) => {
            const labels = res.carts.map((cart: any) => {
                return `User-${cart.userId}`;
            });
            const data = res.carts.map((cart: any) => {
                return cart.discountedTotal;
            });
            console.log(data)

            const dataSource = {
                labels,
                datasets: [
                    {
                        label: "Revenue",
                        data: data,
                        backgroundColor: "green",
                    },
                    // {
                    //     label: "HelloWord",
                    //     data: data,
                    //     backgroundColor: "red",
                    // },
                ],
            };

            setReveneuData(dataSource);
        });
    }, []);

    return (
        <>
            <Typography.Title level={5}>Recent Orders</Typography.Title>
            <Card className='w-[1000px] h-[500px]'>
                <Bar data={revenueData} />
            </Card>
        </>
    );
}