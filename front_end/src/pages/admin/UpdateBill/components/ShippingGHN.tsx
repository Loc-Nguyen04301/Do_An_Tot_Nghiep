import React, { useEffect, useState } from 'react'
import { useAlertDispatch } from '@/contexts/AlertContext'
import { IBill } from '@/types'
import { Button, Select, Space, Typography } from 'antd'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import BillService from '@/services/BillService'

interface ShippingGHNProps {
    selectedBill: IBill
}

interface ShippingBill {
    bill_id: number
    ghn_order_code: string
    shipping_status: string
    created_at: string
    update_at: string
}

const ShippingGHN = ({ selectedBill }: ShippingGHNProps) => {
    const [ghnOrderCode, setGhnOrderCode] = useState()
    const [shippingBill, setShippingBill] = useState<ShippingBill>()

    const dispatchAlert = useAlertDispatch()
    const items = selectedBill.items
    const convertItemToGHNFormat = items.map((item) => {
        return {
            name: item.product.name,
            quantity: item.quantity,
            weight: 1
        }
    })

    useEffect(() => {
        const getShipping = async (id: number) => {
            try {
                const res = await BillService.getShipping(id)
                setGhnOrderCode(res.data.data.ghn_order_code)
                setShippingBill(res.data.data)
            } catch (error) {
                console.log(error)
            }
        }

        if (selectedBill.id) getShipping(selectedBill.id)
    }, [selectedBill.id])

    const handleCreateShipping = async () => {
        dispatchAlert({ loading: true })
        try {
            // call api to create shipping order with GHN
            const response = await axios.post(import.meta.env.VITE_GHN_CREATE_URL,
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
                        "Token": `${import.meta.env.VITE_GHN_TOKEN}`,
                        "ShopId": `${import.meta.env.VITE_GHN_SHOP_ID}`
                    }
                })
            // call api to create shipping order database
            await BillService.createShipping(
                {
                    bill_id: selectedBill.id,
                    ghn_order_code: response.data.data.order_code
                }
            ).then((res) => {
                setGhnOrderCode(response.data.data.order_code)
                setShippingBill(res.data.data)
                dispatchAlert({ success: "Tạo đơn giao hàng thành công" })
            })
        } catch (error) {
            console.log(error)
        }
    }

    const handleCancelShipping = async () => {
        if (ghnOrderCode) {
            dispatchAlert({ loading: true })
            try {
                // call api to cancel shipping order with GHN
                await axios.post(import.meta.env.VITE_GHN_CANCEL_URL,
                    {
                        "order_codes": [ghnOrderCode]
                    },
                    {
                        headers: {
                            "Token": `${import.meta.env.VITE_GHN_TOKEN}`,
                            "ShopId": `${import.meta.env.VITE_GHN_SHOP_ID}`
                        }
                    })
                // call api to cancel shipping order database
                await BillService.cancelShipping({ order_codes: ghnOrderCode })
                    .then((res) => {
                        console.log(res)
                        setGhnOrderCode(undefined)
                        setShippingBill(res.data.data)
                        dispatchAlert({ success: "Hủy đơn giao hàng thành công" })
                    })
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <div className='bg-white mt-10 p-6'>
            <div className="my-2">
                <div className="font-semibold tracking-wide">Trạng thái giao hàng</div>
                <Select
                    className="w-full"
                    value={shippingBill?.shipping_status === 'READY_TO_PICK'
                        ? 'Chờ lấy hàng'
                        : shippingBill?.shipping_status === 'DELIVERED'
                            ? 'Đã giao hàng'
                            : shippingBill?.shipping_status === 'CANCEL'
                                ? 'Hủy giao hàng'
                                : "Chưa tạo đơn giao hàng"}
                    disabled={true}
                />
            </div>
            <Typography.Title level={4} className='mt-5'>
                Tạo đơn giao hàng tại GiaoHangNhanh
            </Typography.Title>
            <Space>
                {
                    shippingBill &&
                    <Button type="primary">
                        <a href={`https://5sao.ghn.dev/order/edit/${ghnOrderCode}`} target='_blank'>
                            Chi tiết đơn giao hàng
                        </a>
                    </Button>
                }
                {
                    !shippingBill &&
                    <Button type="primary" onClick={handleCreateShipping}>
                        Tạo mới đơn giao hàng
                    </Button>
                }
                {
                    shippingBill && shippingBill.shipping_status === 'CANCEL' &&
                    <Button type="primary" onClick={handleCreateShipping}>
                        Tạo lại đơn giao hàng
                    </Button>
                }
                {
                    shippingBill && shippingBill.shipping_status === 'READY_TO_PICK' &&
                    <Button type="primary" danger onClick={handleCancelShipping}>
                        Hủy đơn giao hàng
                    </Button>
                }
            </Space>
        </div >
    )
}

export default ShippingGHN