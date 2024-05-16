import React, { useEffect, useState } from 'react'
import { ConfigProvider, Pagination, PaginationProps, Space, Table, TableProps, Tag, Typography } from 'antd';
import BillService from '@/services/BillService';
import { useAlertDispatch } from '@/contexts/AlertContext';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { format } from "date-fns"
import { Helmet } from 'react-helmet-async';
import { OrderStatus, PaymentMethod } from '@/types';
import {
    CarOutlined,
    CreditCardOutlined,
    QrcodeOutlined,
} from '@ant-design/icons';
import { convertNumbertoMoney } from '@/utils';

var DATETIME_FORMAT = 'dd-MM-yyyy HH:mm:ss'
interface IBill {
    id: number;
    customer_name: string;
    address: string;
    phone_number: string;
    email: string;
    note: string;
    user_id: number | null;
    order_status: OrderStatus;
    payment_status: boolean;
    return_status: string;
    payment_method: PaymentMethod;
    total_amount: number;
    created_at: string;
    update_at: string;
    items: IItem[];
}

interface IItem {
    product: { name: string, new_price: number };
    quantity: number;
    total_price: number;
}

const OrderAdmin = () => {
    const [listBill, setListBill] = useState<IBill[]>([])
    const [current, setCurrent] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [records, setRecords] = useState(0)

    const dispatchAlert = useAlertDispatch()

    const onChangePage: PaginationProps['onChange'] = (page) => {
        setCurrent(page);
    };

    const fetchBill = async (current: number, pageSize: number) => {
        dispatchAlert({ loading: true })
        try {
            const res = await BillService.getBill({ params: { page_index: current - 1, page_size: pageSize } })
            setListBill(res.data.data.bills)
            setRecords(res.data.data.metadata.records)
            dispatchAlert({ loading: false })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchBill(current, pageSize)
    }, [current, pageSize])

    const columns: TableProps<IBill>['columns'] = [
        {
            title: "Mã đơn hàng",
            key: "id",
            sorter: (a, b) => a.id - b.id,
            render: (_, record) => record.id
        },
        {
            title: "Tên khách hàng",
            key: "customer_name",
            render: (_, record) => record.customer_name
        },
        {
            title: "Địa chỉ giao hàng",
            key: "address",
            render: (_, record) => record.address
        },
        {
            title: "Số điện thoại",
            key: "phone_number",
            render: (_, record) => record.phone_number
        },
        {
            title: "Trạng thái đơn hàng",
            key: "order_status",
            sorter: (a, b) => a.order_status.localeCompare(b.order_status),
            render: (_, record) =>
                <>
                    {record.order_status === OrderStatus.CANCELLED && <Tag color={"error"}>Đã Hủy</Tag>}
                    {record.order_status === OrderStatus.PROCESSING && <Tag color={"processing"}>Đang xử lý</Tag>}
                    {record.order_status === OrderStatus.SUCCESS && <Tag color={"success"}>Hoàn thành</Tag>}
                </>
        },
        {
            title: "Trạng thái thanh toán",
            key: "payment_status",
            sorter: (a, b) => Number(a.payment_status) - Number(b.payment_status),
            render: (_, record) =>
                <>
                    {
                        record.payment_status === true
                            ?
                            <CheckOutlined className="text-green-500" />
                            :
                            <CloseOutlined className="text-red-500" />
                    }
                </>
        },
        {
            title: "Phương thức thanh toán",
            key: "payment_method",
            sorter: (a, b) => a.payment_method.localeCompare(b.payment_method),
            render: (_, record) =>
                <>
                    {record.payment_method === PaymentMethod.SHIPCOD && <Tag icon={<CarOutlined />} color={"error"}>Ship COD</Tag>}
                    {record.payment_method === PaymentMethod.BANK_TRANSFER && <Tag icon={<QrcodeOutlined />} color={"blue"}>Chuyển khoản</Tag>}
                    {record.payment_method === PaymentMethod.VNPAY && <Tag icon={<CreditCardOutlined />}>Thanh toán cổng VNPay</Tag>}
                </>
        },
        {
            title: "Tổng tiền",
            key: "total_amount",
            sorter: (a, b) => a.total_amount - b.total_amount,
            render: (_, record) => <span className='font-medium'>{convertNumbertoMoney(record.total_amount)}</span>
        },
        {
            title: "Ngày mua",
            key: "created_at",
            render: (_, record) => {
                return format(record.created_at, DATETIME_FORMAT)
            },
        },
    ]

    return (
        <>
            <Helmet>
                <title>Danh sách đơn hàng</title>
                <meta name='description' content='Beginner friendly page for learning React Helmet.' />
            </Helmet>
            <Space size={20} direction="vertical">
                <Typography.Title level={4}>Danh sách đơn hàng</Typography.Title>
                <Table
                    dataSource={listBill}
                    columns={columns}
                    pagination={false}
                ></Table>
                <Pagination current={current} pageSize={pageSize} total={records} onChange={onChangePage} className='text-center mt-5' />
            </Space>
        </>
    )
}

export default OrderAdmin