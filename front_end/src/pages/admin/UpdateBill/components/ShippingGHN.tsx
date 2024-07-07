import React from 'react'
import { useAlertDispatch } from '@/contexts/AlertContext'
import { IBill } from '@/types'
import { Button, Typography } from 'antd'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import BillService from '@/services/BillService'

interface ShippingGHNProps {
    selectedBill: IBill
}

const ShippingGHN = ({ selectedBill }: ShippingGHNProps) => {
    const params = useParams()
    const dispatchAlert = useAlertDispatch()
    const items = selectedBill.items
    const convertItemToGHNFormat = items.map((item) => {
        return {
            name: item.product.name,
            quantity: item.quantity,
            weight: 1
        }
    })
    
    const handleCreateShipping = async () => {
        dispatchAlert({ loading: true })
        try {
            const response = await axios.post("https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/create",
                {
                    "from_name": "Nguyễn Gia Lộc",
                    "from_phone": "0915677049",
                    "from_address": "1 Đại Cồ Việt, Bách Khoa, Hà Nội",
                    "from_ward_name": "bachkhoa",
                    "from_district_name": "haibatrung",
                    "from_province_name": "hanoi",
                    "to_name": `${selectedBill.customer_name}`,
                    "to_phone": `${selectedBill.phone_number}`,
                    "to_address": `${selectedBill.address}`,
                    "to_ward_code": "1A0302",
                    "to_district_id": 1488,
                    "cod_amount": Number(selectedBill.total_amount),
                    "weight": 1,
                    "length": 1,
                    "width": 1,
                    "height": 1,
                    "service_type_id": 2,
                    "service_id": 0,
                    "payment_type_id": 1,
                    "note": `Ma don hang ${import.meta.env.VITE_PREFIX_ORDER}${selectedBill.id} ${selectedBill.customer_name} CK MUA HANG`,
                    "required_note": "CHOXEMHANGKHONGTHU",
                    "items": convertItemToGHNFormat
                },
                {
                    headers: {
                        "Token": "39bb6c37-39e4-11ef-8e53-0a00184fe694",
                        "ShopId": "192793"
                    }
                })
            await BillService.createShipping(
                {
                    bill_id: selectedBill.id,
                    ghn_order_code: response.data.data.order_code
                }
            ).then(() => {
                dispatchAlert({ success: "Tạo đơn giao hàng thành công" })
            })
        } catch (error) {
            console.log(error)
        }
    }

    const handleCancelShipping = () => { }

    return (
        <div className='bg-white mb-10 p-6'>
            <Typography.Title level={4}>
                Thiết lập giao hàng
            </Typography.Title>
            <Button type="primary" onClick={handleCreateShipping}>
                Tạo đơn giao hàng
            </Button>
            <Button type="primary" danger>
                Hủy đơn giao hàng
            </Button>
        </div>
    )
}

export default ShippingGHN