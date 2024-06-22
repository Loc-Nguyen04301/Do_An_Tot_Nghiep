import React, { useEffect, useRef, useState } from 'react'
import { Button, DatePicker, Input, InputRef, Segmented, Space, Table, TableColumnType, TableProps, Tag, Typography } from 'antd';
import BillService from '@/services/BillService';
import { useAlertDispatch } from '@/contexts/AlertContext';
import { SearchOutlined } from '@ant-design/icons';
import { format } from "date-fns"
import { Helmet } from 'react-helmet-async';
import { OrderStatus, PaymentMethod } from '@/types';
import {
    CarOutlined,
    CreditCardOutlined,
    QrcodeOutlined,
    BarsOutlined,
} from '@ant-design/icons';
import { convertNumbertoMoney } from '@/utils';
import "./OrderAdmin.scss"
import { FilterDropdownProps } from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from '@/routes';
import { IBill } from '@/types';

var DATETIME_FORMAT = 'dd-MM-yyyy HH:mm'
const DATETIME_FORMAT_FILTER = 'YYYY-MM-DD';
const { RangePicker } = DatePicker;

type DataIndex = keyof IBill;

const OrderAdmin = () => {
    const [listBill, setListBill] = useState<IBill[]>([])
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [filterDate, setFilterDate] = useState<[string | undefined, string | undefined]>([undefined, undefined]);
    const searchInput = useRef<InputRef>(null);

    const dispatchAlert = useAlertDispatch()
    const navigate = useNavigate()

    const fetchBill = async (filterDate: [string | undefined, string | undefined]) => {
        dispatchAlert({ loading: true })
        try {
            const res = await BillService.getBillAdmin({ params: { from_date: filterDate[0], to_date: filterDate[1] } })
            setListBill(res.data.data.bills)
            dispatchAlert({ loading: false })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchBill(filterDate)
    }, [filterDate])

    const handleUpdateBill = (id: number) => {
        navigate(`${RoutePath.UpdateBill}/${id}`)
    }

    const handleSearch = (
        selectedKeys: string[],
        confirm: FilterDropdownProps['confirm'],
        dataIndex: DataIndex,
    ) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters: () => void) => {
        clearFilters();
        setSearchText('');
    };

    const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType<IBill> => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({ closeDropdown: false });
                            setSearchText((selectedKeys as string[])[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered: boolean) => (
            <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
        ),
        onFilter: (value, record) =>
            (record[dataIndex] ?? '')
                .toString()
                .toLowerCase()
                .includes((value as string).toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                    className='truncate'
                />
            ) : (
                <span className='truncate'>{text}</span>
            ),
    });

    // const onChange: TableProps<IBill>['onChange'] = (pagination, filters, sorter, extra) => {
    //     console.log({ pagination, filters, sorter, extra });
    // };

    const onChangeDate = (date: any, dateString: [string, string]) => {
        setFilterDate([...dateString])
    }

    const columns: TableProps<IBill>['columns'] = [
        {
            title: "Mã đơn hàng",
            key: "id",
            dataIndex: "id",
            sorter: (a, b) => a.id - b.id,
            render: (_, record) => record.id
        },
        {
            title: "Ngày mua",
            key: "created_at",
            dataIndex: "created_at",
            sorter: (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
            render: (_, record) => <span className='truncate'> {format(record.created_at, DATETIME_FORMAT)}</span>

        },
        {
            title: "Tên khách hàng",
            key: "customer_name",
            dataIndex: "customer_name",
            width: '30%',
            ...getColumnSearchProps('customer_name'),
        },
        {
            title: "Địa chỉ nhận hàng",
            key: "address",
            dataIndex: "address",
            ...getColumnSearchProps('address'),
        },
        {
            title: "Số điện thoại",
            key: "phone_number",
            dataIndex: "phone_number",
            ...getColumnSearchProps('phone_number'),
        },
        {
            title: "Trạng thái đơn hàng",
            key: "order_status",
            dataIndex: "order_status",
            filters: [
                {
                    text: 'Đã Hủy',
                    value: `${OrderStatus.CANCELLED}`,
                },
                {
                    text: 'Chờ xử lý',
                    value: `${OrderStatus.PROCESSING}`,
                },
                {
                    text: 'Đã hoàn thành',
                    value: `${OrderStatus.SUCCESS}`,
                },
            ],
            onFilter: (value, record) => record.order_status.indexOf(value as string) === 0,
            render: (_, record) =>
                <>
                    {record.order_status === OrderStatus.CANCELLED && <Tag color={"error"}>Đã Hủy</Tag>}
                    {record.order_status === OrderStatus.PROCESSING && <Tag color={"warning"}>Chờ xử lý</Tag>}
                    {record.order_status === OrderStatus.SUCCESS && <Tag color={"success"}>Đã hoàn thành</Tag>}
                </>
        },
        {
            title: "Thanh toán",
            key: "payment_status",
            filters: [
                {
                    text: 'Đã thanh toán',
                    value: true,
                },
                {
                    text: 'Chưa thanh toán',
                    value: false,
                },
            ],
            onFilter: (value, record) => record.payment_status === value,
            render: (_, record) =>
                <>
                    {
                        record.payment_status === true
                            ?
                            <Tag color={"success"}>Đã thanh toán</Tag>
                            :
                            <Tag color={"error"}>Chưa thanh toán</Tag>
                    }
                </>
        },
        {
            title: "Phương thức thanh toán",
            key: "payment_method",
            dataIndex: "payment_method",
            filters: [
                {
                    text: 'Ship COD',
                    value: `${PaymentMethod.SHIPCOD}`,
                },
                {
                    text: 'Chuyển khoản',
                    value: `${PaymentMethod.BANK_TRANSFER}`,
                },
                {
                    text: 'Thanh toán cổng VNPay',
                    value: `${PaymentMethod.VNPAY}`,
                },
            ],
            onFilter: (value, record) => record.payment_method.indexOf(value as string) === 0,
            render: (_, record) =>
                <>
                    {record.payment_method === PaymentMethod.SHIPCOD && <Tag icon={<CarOutlined />} color={"magenta"}>Ship COD</Tag>}
                    {record.payment_method === PaymentMethod.BANK_TRANSFER && <Tag icon={<QrcodeOutlined />} color={"blue"}>Chuyển khoản</Tag>}
                    {record.payment_method === PaymentMethod.VNPAY && <Tag icon={<CreditCardOutlined />}>Thanh toán cổng VNPay</Tag>}
                </>
        },
        {
            title: "Tổng tiền",
            key: "total_amount",
            dataIndex: "total_amount",
            sorter: (a, b) => a.total_amount - b.total_amount,
            render: (_, record) => <span className='font-medium'>{convertNumbertoMoney(record.total_amount)}</span>
        },
        {
            title: "",
            key: "delete_item",
            render: (_, record) =>
                <div className='flex items-center' >
                    <div className='flex gap-2'>
                        <BarsOutlined className='text-blue-500 text-2xl cursor-pointer transform hover:scale-125' onClick={() => handleUpdateBill(record.id)} />
                    </div>
                </div >

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
                <Space direction="vertical" size={12}>
                    <RangePicker format={DATETIME_FORMAT_FILTER} onChange={onChangeDate} />
                </Space>
                <Table
                    dataSource={listBill}
                    columns={columns}
                    pagination={{ position: ["bottomCenter"] }}
                    rowKey={(record) => record.id}
                />
            </Space>
        </>
    )
}

export default OrderAdmin