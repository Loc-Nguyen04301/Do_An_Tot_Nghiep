import { useAlertDispatch } from '@/contexts/AlertContext'
import ReviewService from '@/services/ReviewService'
import { Avatar, Button, Modal, Rate, Space, Table, TableProps, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'
import { format } from 'date-fns'
import { clsx } from 'clsx'
import "./ReviewAdmin.scss"

var DATETIME_FORMAT = 'dd-MM-yyyy HH:mm'

interface IReviewAdmin {
    key: React.Key
    product_name: string
    user_name: string
    star: number
    description: string
    images: string[]
    active: boolean
    created_at: string
}

const ReviewAdmin = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
    const [dataSource, setDataSource] = useState<IReviewAdmin[]>([])
    const [isDisabled, setIsDisabled] = useState(false)
    const dispatchAlert = useAlertDispatch()

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys)
        setSelectedRowKeys(newSelectedRowKeys)
    }

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    }

    const hasSelected = selectedRowKeys.length > 0

    useEffect(() => {
        const getReviews = async () => {
            dispatchAlert({ loading: true })
            try {
                const res = await ReviewService.getListReview()
                setDataSource(res.data.data)
                dispatchAlert({ loading: false })
            } catch (error: any) {
                dispatchAlert({ errors: error.message })
            }
        }

        getReviews()
    }, [isDisabled])

    const showModal = () => {
        setIsModalOpen(true)
    }

    const handleOk = async () => {
        dispatchAlert({ loading: true })
        try {
            await ReviewService.blockListReview({ ids: selectedRowKeys as number[] })
            setIsModalOpen(false)
            dispatchAlert({ loading: false })
            window.location.reload()
        } catch (error: any) {
            dispatchAlert({ errors: error.message })
        }
    }

    const handleCancel = () => {
        setIsModalOpen(false)
    }

    const handleActive = async (id: React.Key) => {
        dispatchAlert({ loading: true })
        try {
            const res = await ReviewService.activeReview(id as number)
            dispatchAlert({ success: res.data.message })
            setIsDisabled(true)
            setTimeout(() => {
                setIsDisabled(false)
            }, 2000)
        } catch (error: any) {
            dispatchAlert({ errors: error.message })
        }
    }

    const columns: TableProps<IReviewAdmin>['columns'] = [
        {
            title: "Tên sản phẩm",
            dataIndex: "product_name",
        },
        {
            title: "Người đánh giá ",
            dataIndex: "user_name",
        },
        {
            title: "Điểm",
            dataIndex: "star",
            render: (value) => <Rate defaultValue={value} disabled />
        },
        {
            title: "Mô tả",
            dataIndex: "description",
        },
        {
            title: "Ảnh minh họa",
            dataIndex: "images",
            render: (_, record) => record.images.map((image, index) => <Avatar src={image} key={index} />)
        },
        {
            title: "Active",
            dataIndex: "active",
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
            dataIndex: "created_at",
            render: (_, record) => format(record.created_at as string | Date, DATETIME_FORMAT)
        },
        {
            title: '',
            key: 'deleteItem',
            render: (_, record) =>
                <div className='flex items-center' >
                    <div className='flex gap-2'>
                        {!record.active &&
                            <Button
                                className={clsx('cursor-pointer', record.active ? "text-red-500 hover:!border-red-500 hover:!text-red-500" : "text-blue-500 ")}
                                onClick={() => handleActive(record.key)}
                                disabled={isDisabled}
                            >
                                Active
                            </Button>
                        }
                    </div>
                </div >
        },
    ]
    return (
        <>
            <Helmet>
                <title>Đánh giá sản phẩm</title>
                <meta name='description' content='Beginner friendly page for learning React Helmet.' />
            </Helmet>
            <Typography.Title level={4}>Đánh giá sản phẩm</Typography.Title>
            <Space direction="vertical" className='w-full gap-3'>
                <Space direction='horizontal'>
                    <Button disabled={!hasSelected} onClick={showModal}>
                        Block
                    </Button>
                </Space>
                <Table
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={dataSource}
                    pagination={{ position: ['bottomCenter'] }}
                ></Table>
            </Space>
            <Modal title="Bạn có muốn chặn đánh giá" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            </Modal>
        </>
    )
}

export default ReviewAdmin