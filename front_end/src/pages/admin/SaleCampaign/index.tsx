import { Button, DatePicker, Form, FormProps, Input, Space, Table, TableProps, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
const { RangePicker } = DatePicker;
const { Text } = Typography;
const DATETIME_FORMAT_FILTER = 'YYYY-MM-DD';
import "./SaleCampaign.scss"
import SaleCampaignService from '@/services/SaleCampaignService';
import { useAlertDispatch } from '@/contexts/AlertContext';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'

interface ISaleCampaign {
    id: number
    name: string
    from_date: string
    to_date: string
    active: boolean
}

type FieldType = {
    name?: string
};

const SaleCampaign = () => {
    const [listCampaign, setListCampaign] = useState<ISaleCampaign[]>([])
    const dispatchAlert = useAlertDispatch()
    useEffect(() => {
        const getCampaigns = async () => {
            dispatchAlert({ loading: true })
            try {
                const res = await SaleCampaignService.getCampaign()
                setListCampaign(res.data.data)
                dispatchAlert({ loading: false })
            } catch (error: any) {
                dispatchAlert({ errors: error.message })
            }
        }
        getCampaigns()
    }, [])

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
    ]

    const onFinish = async (fieldsValue: any) => {
        const rangeValue = fieldsValue['range-picker'];
        const values = {
            'name': fieldsValue['name'],
            'from_date': rangeValue[0].format(DATETIME_FORMAT_FILTER),
            'to_date': rangeValue[1].format(DATETIME_FORMAT_FILTER)
        }
        dispatchAlert({ loading: true })
        try {
            const res = await SaleCampaignService.createCampaign(values)
            dispatchAlert({ success: res.data.message })
            console.log(res)
        } catch (error) {
            console.log(error)
        }
        console.log('Received values of form: ', values);
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            <Helmet>
                <title>Chiến dịch giảm giá</title>
                <meta name='description' content='Beginner friendly page for learning React Helmet.' />
            </Helmet>
            <Space size={20} direction="vertical">
                <Typography.Title level={4}>Chiến dịch giảm giá</Typography.Title>
                <Space direction="horizontal">
                    <Form
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        className='w-[600px] text-center'
                    >
                        <Form.Item<FieldType>
                            label="Tên chiến dịch"
                            name="name"
                            rules={[{ required: true, message: 'Vui lòng nhập tên chiến dịch!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Thời gian"
                            name="range-picker"
                            rules={[{ type: 'array' as const, required: true, message: 'Vui lòng chọn thời gian!' }]}
                        >
                            <RangePicker
                                placeholder={["Ngày bắt đầu", "Ngày kết thúc"]}
                                className='w-full'
                            />
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 19 }}>
                            <Button type='primary' htmlType="submit">Tạo chiến dịch</Button>
                        </Form.Item>
                    </Form>
                </Space>
            </Space>
            <div>
                <Text type="danger" className='label-email'>Lưu ý: Chỉ kích hoạt 1 chiến dịch duy nhất</Text>
            </div>
            <Table
                dataSource={listCampaign}
                columns={columns}
                pagination={{ position: ["bottomCenter"] }}
                rowKey={(record) => record.id}
            />
        </>
    )
}

export default SaleCampaign