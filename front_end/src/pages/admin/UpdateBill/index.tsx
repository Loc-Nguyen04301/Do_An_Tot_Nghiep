import React, { useEffect, useState } from 'react'
import {
    ArrowLeftOutlined
} from '@ant-design/icons';
import { useAlertDispatch } from '@/contexts/AlertContext'
import BillService from '@/services/BillService'
import { IBill } from '@/types'
import { useNavigate, useParams } from 'react-router-dom'
import { Typography } from 'antd'

const UpdateBill = () => {
    const [selectedBill, setSelectedBill] = useState<IBill>()

    const dispatchAlert = useAlertDispatch()
    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
        const getBillDetail = async (id: number) => {
            dispatchAlert({ loading: true })
            try {
                const res = await BillService.getBillDetailById(id)
                setSelectedBill(res.data.data)
                dispatchAlert({ loading: false })
            } catch (error) {
                console.log(error)
            }
        }

        if (params.id) getBillDetail(Number(params.id))
    }, [params.id])

    console.log({ selectedBill })
    return (
        selectedBill &&
        <>
            <Typography.Title level={3} className='text-center'>Cập nhật sản phẩm</Typography.Title>
            <Typography.Title level={4}>
                <ArrowLeftOutlined className='cursor-pointer hover:text-main-orange-color' onClick={() => navigate(-1)} />
            </Typography.Title>

        </>
    )
}

export default UpdateBill