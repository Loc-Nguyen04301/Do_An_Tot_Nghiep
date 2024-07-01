import { useAlertDispatch } from '@/contexts/AlertContext'
import ReviewService from '@/services/ReviewService'
import { Avatar, Button, Rate, Space, Table, TableProps, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'

interface IReviewAdmin {
    key: React.Key
    product_name: string
    user_name: string
    star: number
    description: string
    images: string[]
}

const ReviewAdmin = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [dataSource, setDataSource] = useState<IReviewAdmin[]>([]);
    const dispatchAlert = useAlertDispatch()

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const hasSelected = selectedRowKeys.length > 0;

    useEffect(() => {
        const getReviews = async () => {
            dispatchAlert({ loading: true })
            try {
                const res = await ReviewService.getListReview()
                console.log(res)
                setDataSource(res.data.data)
                dispatchAlert({ loading: false })
            } catch (error: any) {
                dispatchAlert({ errors: error.message })
            }
        }

        getReviews()
    }, []);

    const handleDelete = () => {
        
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
                    <Button type="primary" className='bg-black hover:!bg-[#666666]' disabled={!hasSelected}>
                        Block
                    </Button>
                    <Button type="primary" danger disabled={!hasSelected} onClick={handleDelete}>
                        Delete
                    </Button>
                </Space>
                <Table
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={dataSource}
                    pagination={{ position: ['bottomCenter'] }}
                // rowKey={(record) => record.key}
                ></Table>
            </Space>
        </>
    )
}

export default ReviewAdmin