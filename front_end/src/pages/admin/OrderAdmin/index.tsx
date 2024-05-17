import React, { useEffect, useRef, useState } from 'react'
import { Button, ConfigProvider, Input, InputRef, Pagination, PaginationProps, Segmented, Space, Table, TableColumnType, TableProps, Tag, Typography } from 'antd';
import BillService from '@/services/BillService';
import { useAlertDispatch } from '@/contexts/AlertContext';
import { CheckOutlined, CloseOutlined, SearchOutlined } from '@ant-design/icons';
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
import { SegmentedValue } from 'antd/es/segmented';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from '@/routes';
import { IBill, IItem } from '@/types';

var DATETIME_FORMAT = 'dd-MM-yyyy HH:mm:ss'

type DataIndex = keyof IBill;

enum PurchaseStatus {
    ALL = "Tất cả",
    WAIT_FOR_PAY = "Chờ thanh toán",
    WAIT_FOR_DELIVERY = "Chờ giao hàng",
    SUCCESS = "Hoàn thành",
    CANCELLED = "Đã hủy",
}

const purchaseStatusList = Object.values(PurchaseStatus);

const OrderAdmin = () => {
    const [purchaseStatus, setPurchaseStatus] = useState<string>(PurchaseStatus.ALL)
    const [listBill, setListBill] = useState<IBill[]>([])
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef<InputRef>(null);

    const dispatchAlert = useAlertDispatch()

    const navigate = useNavigate()

    const fetchBill = async (purchaseStatus: string) => {
        dispatchAlert({ loading: true })
        try {
            let res
            switch (purchaseStatus) {
                case PurchaseStatus.ALL:
                    res = await BillService.getBillAdmin({})
                    setListBill(res.data.data.bills)
                    dispatchAlert({ loading: false })
                    break;
                case PurchaseStatus.WAIT_FOR_PAY:
                    res = await BillService.getBillAdmin({ params: { payment_status: false, order_status: OrderStatus.PROCESSING } })
                    setListBill(res.data.data.bills)
                    dispatchAlert({ loading: false })
                    break;
                case PurchaseStatus.WAIT_FOR_DELIVERY:
                    res = await BillService.getBillAdmin({ params: { payment_status: true, order_status: OrderStatus.PROCESSING } })
                    setListBill(res.data.data.bills)
                    dispatchAlert({ loading: false })
                    break;
                case PurchaseStatus.SUCCESS:
                    res = await BillService.getBillAdmin({ params: { payment_status: true, order_status: OrderStatus.SUCCESS } })
                    setListBill(res.data.data.bills)
                    dispatchAlert({ loading: false })
                    break;
                case PurchaseStatus.CANCELLED:
                    res = await BillService.getBillAdmin({ params: { order_status: OrderStatus.CANCELLED } })
                    setListBill(res.data.data.bills)
                    dispatchAlert({ loading: false })
                    break;
                default:
                    break;
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchBill(purchaseStatus)
    }, [purchaseStatus])

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

    const columns: TableProps<IBill>['columns'] = [
        {
            title: "Mã đơn hàng",
            key: "id",
            dataIndex: "id",
            sorter: (a, b) => a.id - b.id,
            render: (_, record) => record.id
        },
        {
            title: "Tên khách hàng",
            key: "customer_name",
            dataIndex: "customer_name",
            width: '30%',
            ...getColumnSearchProps('customer_name'),
        },
        {
            title: "Địa chỉ giao hàng",
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
                    text: 'Đang xử lý',
                    value: `${OrderStatus.PROCESSING}`,
                },
                {
                    text: 'Hoàn thành',
                    value: `${OrderStatus.SUCCESS}`,
                },
            ],
            onFilter: (value, record) => record.order_status.indexOf(value as string) === 0,
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
                    {record.payment_method === PaymentMethod.SHIPCOD && <Tag icon={<CarOutlined />} color={"error"}>Ship COD</Tag>}
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
            title: "Ngày mua",
            key: "created_at",
            dataIndex: "created_at",
            sorter: (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
            render: (_, record) => <span className='truncate'> {format(record.created_at, DATETIME_FORMAT)}</span>

        },
        {
            title: "",
            key: "delete_item",
            render: (_, record) =>
                <div className='flex items-center' >
                    <div className='flex gap-2'>
                        <BarsOutlined className='text-blue-500 text-2xl cursor-pointer transform hover:scale-125' onClick={() => handleUpdateBill(record.id)} />
                        {/* <DeleteOutlined className='text-red-500 text-2xl cursor-pointer transform hover:scale-125' onClick={showModal} /> */}
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
                <Segmented options={purchaseStatusList} value={purchaseStatus} onChange={(value: SegmentedValue) => setPurchaseStatus(value as string)} />
                <Typography.Title level={4}>Danh sách đơn hàng</Typography.Title>
                <Table
                    dataSource={listBill}
                    columns={columns}
                    pagination={{ position: ["bottomCenter"] }}
                // onChange={onChange}
                ></Table>
            </Space>
        </>
    )
}

export default OrderAdmin