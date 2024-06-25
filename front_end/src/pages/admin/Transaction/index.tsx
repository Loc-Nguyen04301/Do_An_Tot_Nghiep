import React, { useEffect, useState } from 'react'
import { useAlertDispatch } from '@/contexts/AlertContext'
import { convertNumbertoMoney } from '@/utils'
import { Space, Table, TablePaginationConfig, TableProps, Typography } from 'antd'
import axios from 'axios'
import { Helmet } from 'react-helmet-async'

interface ITrancsaction {
    id: number
    description: string
    when: string
    amount: number
}

const Transaction = () => {
    const [dataSource, setDataSource] = useState<ITrancsaction[]>([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalRecords, setTotalRecords] = useState()
    const dispatchAlert = useAlertDispatch()

    useEffect(() => {
        const getTransactions = async (currentPage: number) => {
            dispatchAlert({ loading: true })
            try {
                const res = await axios(
                    {
                        headers: { "Authorization": "Apikey AK_CS.cbb8db900e1011ef9de15b8b5ddd4bba.zckMc8dUQxpCghhEsfZWuRTG1V1OO6Zy97peOD9QMpr75JC2WhvxAWThJHjqXfS1eGS7oAZF" },
                        method: 'GET',
                        url: 'https://oauth.casso.vn/v2/transactions',
                        params: {
                            "page": currentPage,
                            "sort": "DESC"
                        }
                    },)
                console.log({ res })
                setDataSource(res.data.data.records)
                setTotalRecords(res.data.data.totalRecords)
                dispatchAlert({ loading: false })
            } catch (error: any) {
                dispatchAlert({ errors: error.message })
            }
        }
        if (currentPage) getTransactions(currentPage)
    }, [currentPage])

    const columns: TableProps<ITrancsaction>['columns'] = [
        {
            title: 'Mã giao dịch',
            key: "id",
            render: (_, record) => record.id
        },
        {
            title: 'Ngày giao dịch',
            key: "when",
            render: (_, record) => record.when
        }
        ,
        {
            title: 'Mô tả',
            key: "description",
            render: (_, record) => record.description
        },
        {
            title: 'Giá trị',
            key: "id",
            render: (_, record) => convertNumbertoMoney(record.amount)
        }
    ]

    const paginationConfig: TablePaginationConfig = {
        pageSize: 10,
        total: totalRecords,
        current: currentPage,
        onChange: (page: number) => {
            setCurrentPage(page)
        },
        position: ["bottomCenter"]
    }

    return (
        <>
            <Helmet>
                <title>Lịch sử giao dịch </title>
                <meta name='description' content='Beginner friendly page for learning React Helmet.' />
            </Helmet>
            <Typography.Title level={4}>Lịch sử giao dịch</Typography.Title>
            <Space direction="horizontal" className='w-full justify-center !block'>
                <Table
                    columns={columns}
                    dataSource={dataSource}
                    pagination={paginationConfig}
                    rowKey={(record) => record.id}
                />
            </Space>
        </>
    )
}

export default Transaction
