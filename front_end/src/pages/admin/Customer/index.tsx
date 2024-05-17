import { Avatar, Space, Table, TableProps, Tag, Typography } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useAppDispatch } from "@/redux-toolkit/hook";
import { useAlertDispatch } from "@/contexts/AlertContext";
import UserService from "@/services/UserService";
import { Helmet } from "react-helmet-async";
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { format } from "date-fns"

var DATETIME_FORMAT = 'dd-MM-yyyy HH:mm'

enum ROLE {
    USER = "USER",
    ADMIN = "ADMIN"
}

interface ICustomer {
    id: number
    username: string
    email: string
    avatar: string
    role: ROLE
    active: boolean
    phone_number?: string
    address?: string
    created_at?: string
    update_at?: string
}

const Customer = () => {
    const [dataSource, setDataSource] = useState<ICustomer[]>([]);

    const dispatchAlert = useAlertDispatch()

    const getCustomers = async () => {
        dispatchAlert({ loading: true })
        try {
            const res = await UserService.listUser()
            setDataSource(res.data.data)
            dispatchAlert({ loading: false })
        } catch (error: any) {
            dispatchAlert({ errors: error.message })
        }
    }

    useEffect(() => {
        getCustomers()
    }, []);

    const columns: TableProps<ICustomer>['columns'] = [
        {
            title: "",
            key: "image",
            render: (_, record) => <Avatar src={record.avatar} />
        },
        {
            title: "User Name",
            key: "name",
            render: (_, record) => record.username
        },
        {
            title: "Email",
            key: "email",
            render: (_, record) => record.email
        },
        {
            title: "Phone",
            key: "phone",
            render: (_, record) => record.phone_number
        },
        {
            title: "Address",
            key: "address",
            render: (_, record) => record.address
        },
        {
            title: "Role",
            key: "role",
            render: (_, record) =>
                <>
                    {
                        record.role === ROLE.ADMIN
                            ?
                            <Tag color={"red"}>
                                {record.role}
                            </Tag>
                            : record.role === ROLE.USER
                                ?
                                <Tag color={"blue"}>
                                    {record.role}
                                </Tag>
                                :
                                <></>
                    }

                </>
        },
        {
            title: "Active",
            key: "active",
            render: (_, record) =>
                <>
                    {
                        record.active === true
                            ?
                            <CheckOutlined className="text-green-500" />
                            :
                            <CloseOutlined className="text-red-500" />
                    }
                </>
        },
        {
            title: "Created At",
            key: "created_at",
            render: (_, record) => format(record.created_at as string | Date, DATETIME_FORMAT)
        },
    ]

    return (
        <>
            <Helmet>
                <title>Khách hàng</title>
                <meta name='description' content='Beginner friendly page for learning React Helmet.' />
            </Helmet>
            <Typography.Title level={4}>Customers</Typography.Title>
            <Space direction="horizontal" className='w-full justify-center !block'>
                <Table
                    columns={columns}
                    dataSource={dataSource}
                    pagination={{ position: ['bottomCenter'] }}
                ></Table>
            </Space>
        </>
    );
}

export default Customer;
