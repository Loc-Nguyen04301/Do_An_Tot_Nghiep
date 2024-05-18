import { Avatar, Button, Space, Table, TableProps, Tag, Typography } from "antd";
import { useEffect, useState } from "react";
import { useAlertDispatch } from "@/contexts/AlertContext";
import UserService from "@/services/UserService";
import { Helmet } from "react-helmet-async";
import { CheckOutlined, CloseOutlined, BarsOutlined } from '@ant-design/icons';
import { format } from "date-fns"
import { ICustomer, ROLE } from "@/types";
import clsx from "clsx";

var DATETIME_FORMAT = 'dd-MM-yyyy HH:mm'

const Customer = () => {
    const [dataSource, setDataSource] = useState<ICustomer[]>([]);
    const [isDisabled, setIsDisabled] = useState(false)
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
    }, [isDisabled]);

    const handleActive = async (id: number) => {
        dispatchAlert({ loading: true })
        try {
            const res = await UserService.activeUser(id)
            setIsDisabled(true)
            dispatchAlert({ success: res.data.message })
            setTimeout(() => {
                setIsDisabled(false)
            }, 2000)
        } catch (error) {
            console.log(error)
        }
    }

    const columns: TableProps<ICustomer>['columns'] = [
        {
            title: "Ảnh đại diện",
            key: "image",
            render: (_, record) => <Avatar src={record.avatar} />
        },
        {
            title: "Tên người dùng",
            key: "name",
            render: (_, record) => record.username
        },
        {
            title: "Email",
            key: "email",
            render: (_, record) => record.email
        },
        {
            title: "Số điện thoại",
            key: "phone_number",
            render: (_, record) => record.phone_number
        },
        {
            title: "Địa chỉ",
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
            title: "Ngày tạo",
            key: "created_at",
            render: (_, record) => format(record.created_at as string | Date, DATETIME_FORMAT)
        },
        {
            title: '',
            key: 'deleteItem',
            render: (_, record) =>
                <div className='flex items-center' >
                    <div className='flex gap-2'>
                        <Button className={clsx('cursor-pointer', record.active ? "text-red-500 hover:!border-red-500 hover:!text-red-500" : "text-blue-500 ")} onClick={() => handleActive(record.id)} disabled={isDisabled} >{record.active ? "Inactive" : "Active"}</Button>
                        {/* <DeleteOutlined className='text-red-500 text-2xl cursor-pointer transform hover:scale-125' onClick={showModal} /> */}
                    </div>
                </div >
        },
    ]

    return (
        <>
            <Helmet>
                <title>Thành viên</title>
                <meta name='description' content='Beginner friendly page for learning React Helmet.' />
            </Helmet>
            <Typography.Title level={4}>Thành viên</Typography.Title>
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
