import { Button, DatePicker, Space, Table, TableProps, Typography } from 'antd'
import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
const { RangePicker } = DatePicker;
const { Text } = Typography;
const DATETIME_FORMAT_FILTER = 'YYYY-MM-DD';

interface ISaleCampaign {
    id: number
    name: string
    from_date: string
    to_date: string
    active: boolean
}

const SaleCampaign = () => {
    const [filterDate, setFilterDate] = useState<[string | undefined, string | undefined]>([undefined, undefined]);

    const onChangeDate = (date: any, dateString: [string, string]) => {
        console.log(dateString)
        setFilterDate([...dateString])
    }

    const createCampaign = () => {

    }

    const columns: TableProps<ISaleCampaign>['columns'] = [
        {
            title: "#",
            key: "id",
            render: (_, record, index) => index
        },
        {
            title: "Tên chiến dịch",
            key: "name",
            render: (_, record) => record.name
        },
        {
            title: "Ngày bắt đầu",
            key: "from_date",
            render: (_, record) => record.from_date
        },
        {
            title: "Ngày kết thúc",
            key: "from_date",
            render: (_, record) => record.from_date
        },
        {
            title: "Trạng thái",
            key: "active",
            render: (_, record) => record.active
        },
    ]

    return (
        <>
            <Helmet>
                <title>Chiến dịch giảm giá</title>
                <meta name='description' content='Beginner friendly page for learning React Helmet.' />
            </Helmet>
            <Space size={20} direction="vertical">
                <Typography.Title level={4}>Chiến dịch giảm giá</Typography.Title>
                <Space direction="horizontal" size={12}>
                    <RangePicker format={DATETIME_FORMAT_FILTER} onChange={onChangeDate} placeholder={["Ngày bắt đầu", "Ngày kết thúc"]} />
                    <Button type='primary' onClick={createCampaign}>Tạo chiến dịch</Button>
                    <Text type="danger" className='label-email'>Lưu ý: Chỉ kích hoạt 1 chiến dịch duy nhất</Text>
                </Space>
            </Space>
            <Table
                // dataSource={listBill}
                columns={columns}
                pagination={{ position: ["bottomCenter"] }}
                rowKey={(record) => record.id}
            />
        </>
    )
}

export default SaleCampaign