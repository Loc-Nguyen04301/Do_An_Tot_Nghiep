import { useEffect, useState } from 'react'
import { Avatar, Card, Space, Statistic, Table, TableProps, Typography } from 'antd'
import {
    DollarCircleOutlined,
    ShoppingCartOutlined,
    ShoppingOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { getRevenue } from '../../../API';

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
import DashboardService from '@/services/DashboardService';
import { useAlertDispatch } from '@/contexts/AlertContext';
import { convertNumbertoMoney } from '@/utils';
import { Helmet } from 'react-helmet-async';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export interface IBestSoldOutProduct {
    id: number
    name: string
    brand: string
    new_price: number
    image: string
    total_quantity_sold: number
}

const DashBoard = () => {
    const [count, setCount] = useState<{ billCount: number, productCount: number, userCount: number, revenueCount: number }>({ billCount: 0, productCount: 0, userCount: 0, revenueCount: 0 });
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
                        value={count.billCount}
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
                        value={count.productCount}
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
                        value={count.userCount}
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
                        value={convertNumbertoMoney(count.revenueCount)}
                    />
                </Space>
                <Space className='w-full justify-center !block'>
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
    const dispatchAlert = useAlertDispatch()
    const getListSoldOut = async () => {
        dispatchAlert({ loading: true })
        try {
            const res = await DashboardService.listSoldOut()
            setDataSource(res.data.data)
            dispatchAlert({ loading: false })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getListSoldOut()
    }, [])

    const columns: TableProps<IBestSoldOutProduct>['columns'] = [
        {
            title: "Thumbnail",
            key: "thumbnail",
            render: (_, record) => <Avatar src={record.image} />
        },
        {
            title: "Name",
            key: "name",
            render: (_, record) => record.name
        },
        {
            title: "Brand",
            key: "brand",
            render: (_, record) => record.brand
        },
        {
            title: "New Price",
            key: "new_price",
            render: (_, record) => <span>{convertNumbertoMoney(record.new_price)}</span >,
        },
        {
            title: "Số lượng đã bán ra",
            key: "number_sold",
            render: (_, record) => record.total_quantity_sold
        },
    ]

    return (
        <>
            <Typography.Title level={5}>Số lượng đã bán ra</Typography.Title>
            <Table
                columns={columns}
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