import { useEffect, useState } from 'react'
import { Avatar, Card, DatePicker, Flex, Space, Statistic, Table, TableProps, Typography } from 'antd'
import {
    DollarCircleOutlined,
    ShoppingCartOutlined,
    ShoppingOutlined,
    UserOutlined,
    StarOutlined
} from "@ant-design/icons";
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
import dayjs from "dayjs"

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
    old_price: number
    new_price: number
    image: string
    total_quantity_sold: number
}

const DashBoard = () => {
    const [count, setCount] = useState<{ billCount: number, productCount: number, userCount: number, reviewCount: number, revenueCount: number }>({ billCount: 0, productCount: 0, userCount: 0, reviewCount: 0, revenueCount: 0 });
    const [listProductSoldOut, setListProductSoldOut] = useState<IBestSoldOutProduct[]>([]);
    const dispatchAlert = useAlertDispatch()

    const getDashboard = async () => {
        dispatchAlert({ loading: true })
        try {
            const res1 = await DashboardService.countDashboard()
            setCount(res1.data.data)
            const res2 = await DashboardService.listSoldOut()
            setListProductSoldOut(res2.data.data)
            dispatchAlert({ loading: false })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getDashboard()
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
                            <UserOutlined
                                className='bg-blue-300 text-blue-500 p-2 text-2xl rounded-[20px]'
                            />
                        }
                        title={"Số khách thành viên"}
                        value={count.userCount}
                    />
                    <DashboardCard
                        icon={
                            <ShoppingOutlined
                                className='bg-orange-300 text-orange-500 p-2 text-2xl rounded-[20px]'
                            />
                        }
                        title={"Số sản phẩm"}
                        value={count.productCount}
                    />
                    <DashboardCard
                        icon={
                            <ShoppingCartOutlined
                                className='bg-green-300 text-green-500 p-2 text-2xl rounded-[20px]'
                            />
                        }
                        title={"Số lượng đơn hàng"}
                        value={count.billCount}
                    />
                    <DashboardCard
                        icon={
                            <StarOutlined
                                className='bg-yellow-300 text-yellow-500 p-2 text-2xl rounded-[20px]'
                            />
                        }
                        title={"Số lượt đánh giá"}
                        value={count.reviewCount}
                    />
                    <DashboardCard
                        icon={
                            <DollarCircleOutlined
                                className='bg-red-300 text-red-500 p-2 text-2xl rounded-[20px]'
                            />
                        }
                        title={"Tổng doanh thu"}
                        value={convertNumbertoMoney(count.revenueCount)}
                    />
                </Space>
                <Space className='w-full justify-center !block'>
                    <RecentOrders listProductSoldOut={listProductSoldOut} />
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
        <Card className='min-w-[230px]'>
            <Space direction="horizontal">
                {icon}
                <Statistic title={title} value={value} />
            </Space>
        </Card>
    )
}

const RecentOrders = ({ listProductSoldOut }: { listProductSoldOut: IBestSoldOutProduct[] }) => {
    const columns: TableProps<IBestSoldOutProduct>['columns'] = [
        {
            title: "Ảnh sản phẩm",
            key: "thumbnail",
            render: (_, record) => <Avatar src={record.image} />
        },
        {
            title: "Tên sản phẩm",
            key: "name",
            render: (_, record) => record.name
        },
        {
            title: "Thương Hiệu",
            key: "brand",
            render: (_, record) => record.brand
        },
        {
            title: "Giá cũ",
            key: "new_price",
            render: (_, record) => record.old_price !== 0 && <del>{convertNumbertoMoney(record.old_price)}</del>
        },
        {
            title: "Giá mới",
            key: "new_price",
            render: (_, record) => <span>{convertNumbertoMoney(record.new_price)}</span >,
        },
        {
            title: "Số lượng đã bán",
            key: "number_sold",
            render: (_, record) => record.total_quantity_sold
        },
    ]

    return (
        <>
            <Typography.Title level={5}>Sản phẩm đã bán ra</Typography.Title>
            <Table
                columns={columns}
                dataSource={listProductSoldOut}
                pagination={false}
                rowKey={(record) => record.id}
            ></Table>
        </>
    );
}

const DashboardChart = () => {
    const [data, setData] = useState({
        labels: [] as any[],
        datasets: [] as any[],
    });
    const [data2, setData2] = useState({
        labels: [] as any[],
        datasets: [] as any[],
    });
    const [nowYear, setNowYear] = useState(dayjs().year());
    const [totalRecords, setTotalRecords] = useState(0)
    const [totalRevenue, setTotalRevenue] = useState(0)
    const onChangeYear = (date: any, year: string) => {
        setNowYear(Number(year))
    }

    const getRevenue = async (nowYear: number) => {
        try {
            const res = await DashboardService.getRevenue({ params: { year: nowYear } })
            setTotalRecords(res.data.data.totalRecords)
            setTotalRevenue(res.data.data.totalRevenue)
            const labels = Array.from({ length: 12 }, (_, index) => {
                return `Tháng ${index + 1}`
            })
            const dataSource = {
                labels,
                datasets: [
                    {
                        label: "Doanh thu",
                        data: res.data.data.revenueArray,
                        backgroundColor: "green",
                    },
                ],
            };
            const dataSource2 = {
                labels,
                datasets: [
                    {
                        label: "Số đơn hàng",
                        data: res.data.data.recordArray,
                        backgroundColor: "red",
                    },
                ],
            };
            setData(dataSource);
            setData2(dataSource2);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getRevenue(nowYear)
    }, [nowYear])

    return (
        <>
            <Typography.Title level={5}>Thống kê doanh thu</Typography.Title>
            <Space direction="vertical" className='mb-5'>
                <DatePicker value={dayjs().year(nowYear)} onChange={onChangeYear} picker="year" />
            </Space>
            <Flex>
                <Card className='w-[700px]'>
                    <Typography.Title level={5}>Tổng doanh thu năm {nowYear}: {convertNumbertoMoney(totalRevenue)}</Typography.Title>
                    <Bar data={data} />
                </Card>
                <Card className='w-[700px]'>
                    <Typography.Title level={5}>Tổng số đơn hàng năm {nowYear}: {totalRecords}</Typography.Title>
                    <Bar data={data2} />
                </Card>
            </Flex>

        </>
    );
}