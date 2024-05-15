import React, { useEffect, useState } from 'react'
import { ConfigProvider, Pagination, PaginationProps, Space, Table, TableProps, Typography } from 'antd';
import BillService from '@/services/BillService';
import { useAlertDispatch } from '@/contexts/AlertContext';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

interface IBill {
    id: number;
    customer_name: string;
    address: string;
    phone_number: string;
    email: string;
    note: string;
    user_id: number | null;
    order_status: string;
    payment_status: boolean;
    return_status: string;
    payment_method: string;
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
            render: (_, record) => record.order_status,
        },
        {
            title: "Trạng thái thanh toán",
            key: "payment_status",
            render: (_, record) => <>
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
            render: (_, record) => {
                return record.payment_method
            },
        },
        {
            title: "Ngày mua",
            key: "brand",
            render: (_, record) => {
                return record.created_at
            },
        },
    ]

    return (
        <Space size={20} direction="vertical">
            <Typography.Title level={4}>Orders</Typography.Title>
            <Table
                dataSource={listBill}
                columns={columns}
            ></Table>
            <ConfigProvider theme={{
                token: {
                    colorPrimary: "#F48220",
                    colorBgTextHover: "#ffffff"
                }
            }}>
                <Pagination current={current} pageSize={pageSize} total={records} onChange={onChangePage} className='text-center mt-5' />
            </ConfigProvider>
        </Space>
    )
}

export default OrderAdmin