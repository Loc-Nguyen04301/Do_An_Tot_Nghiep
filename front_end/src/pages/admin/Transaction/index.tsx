import React, { useEffect, useRef, useState } from 'react'
import { useAlertDispatch } from '@/contexts/AlertContext'
import { convertNumbertoMoney } from '@/utils'
import { Button, Input, InputRef, Space, Table, TableColumnType, TablePaginationConfig, TableProps, Typography } from 'antd'
import axios from 'axios'
import { Helmet } from 'react-helmet-async'
import { FilterDropdownProps } from 'antd/es/table/interface'
import Highlighter from 'react-highlight-words'
import { SearchOutlined } from '@ant-design/icons'
import { format, subMonths } from 'date-fns'

interface ITransaction {
    id: number
    description: string
    when: string
    amount: number
}

const Transaction = () => {
    const [dataSource, setDataSource] = useState<ITransaction[]>([])
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [totalRecords, setTotalRecords] = useState(0)
    const dispatchAlert = useAlertDispatch()

    type DataIndex = keyof ITransaction
    const searchInput = useRef<InputRef>(null)
    const [searchText, setSearchText] = useState('')
    const [searchedColumn, setSearchedColumn] = useState('')

    // Get time 1 month ago
    const currentDate = new Date()
    const oneMonthAgo = subMonths(currentDate, 1)
    const fromDate = format(oneMonthAgo, 'yyyy-MM-dd')

    useEffect(() => {
        const getTransactions = async () => {
            dispatchAlert({ loading: true })
            try {
                const res = await axios(
                    {
                        headers: { "Authorization": `${import.meta.env.VITE_CASSO_API_KEY}` },
                        method: 'GET',
                        url: `${import.meta.env.VITE_CASSO_TRANSACTION_URL}`,
                        params: {
                            "page": currentPage,
                            "sort": "DESC",
                            "pageSize": pageSize,
                            "fromDate": fromDate
                        }
                    },)
                setDataSource(res.data.data.records)
                setTotalRecords(res.data.data.totalRecords)
                dispatchAlert({ loading: false })
            } catch (error: any) {
                dispatchAlert({ errors: error.message })
            }
        }
        if (currentPage && pageSize && fromDate) getTransactions()
    }, [currentPage, pageSize, fromDate])

    const handleSearch = (
        selectedKeys: string[],
        confirm: FilterDropdownProps['confirm'],
        dataIndex: DataIndex,
    ) => {
        confirm()
        setSearchText(selectedKeys[0])
        setSearchedColumn(dataIndex)
    }

    const handleReset = (clearFilters: () => void) => {
        clearFilters()
        setSearchText('')
    }

    const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType<ITransaction> => ({
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
                            confirm({ closeDropdown: false })
                            setSearchText((selectedKeys as string[])[0])
                            setSearchedColumn(dataIndex)
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close()
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
                setTimeout(() => searchInput.current?.select(), 100)
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
    })

    const columns: TableProps<ITransaction>['columns'] = [
        {
            title: 'Mã giao dịch',
            key: "id",
            dataIndex: "id",
            render: (_, record) => record.id
        },
        {
            title: 'Ngày giao dịch',
            key: "when",
            dataIndex: "when",
            render: (_, record) => record.when
        }
        ,
        {
            title: 'Mô tả',
            key: "description",
            dataIndex: "description",
            ...getColumnSearchProps('description'),
        },
        {
            title: 'Giá trị',
            key: "amount",
            // dataIndex: "amount",
            sorter: (a, b) => a.amount - b.amount,
            render: (_, record) => convertNumbertoMoney(record.amount)
        }
    ]

    const paginationConfig: TablePaginationConfig = {
        current: currentPage,
        pageSize: pageSize,
        total: totalRecords,
        onChange: (page: number) => {
            setCurrentPage(page)
        },
        position: ["bottomCenter"],
        onShowSizeChange(current, size) {
            setPageSize(size)
        },
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
