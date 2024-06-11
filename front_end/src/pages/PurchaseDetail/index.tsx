import React, { useEffect, useState } from 'react'
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPhone, faUser, faEnvelope, faLocationDot } from "@fortawesome/free-solid-svg-icons"
import { faClock } from "@fortawesome/free-regular-svg-icons"
import { useAlertDispatch } from '@/contexts/AlertContext';
import BillService from '@/services/BillService';
import { IBill, OrderStatus, PaymentMethod } from '@/types';
import { format } from "date-fns"
import { convertNumbertoMoney } from '@/utils';

var DATETIME_FORMAT = 'dd-MM-yyyy HH:mm'

const PurchaseDetail = () => {
    const [selectedBill, setSelectedBill] = useState<IBill>()

    const navigate = useNavigate()
    const params = useParams()
    const dispatchAlert = useAlertDispatch()

    useEffect(() => {
        const getBillDetail = async (id: number) => {
            dispatchAlert({ loading: true })
            try {
                const res = await BillService.getBillDetailById(id)
                setSelectedBill(res.data.data)
                dispatchAlert({ loading: false })
            } catch (error) {
                dispatchAlert({ loading: false })
                console.log(error)
            }
        }
        getBillDetail(Number(params.id))
    }, [params.id])

    return (
        selectedBill &&
        <div className="mx-auto max-w-[1300px] h-full py-8 px-4">
            <div className='flex justify-between border-b '>
                <h1 className='text-lg text-category-title font-bold uppercase pb-2'>Chi tiết đơn hàng</h1>
                <div className='cursor-pointer flex items-center text-category-title hover:!text-main-orange-color' onClick={() => navigate(-1)} >
                    <ArrowLeftOutlined />
                    <h1 className='ml-2 text-lg  font-bold uppercase pb-[1px]'>Quay lại</h1>
                </div>
            </div>
            <div className='mt-4'>
                <div>Mã đơn hàng: {selectedBill.id}</div>
            </div>
            <FontAwesomeIcon icon={faClock} /> {format(selectedBill.created_at, DATETIME_FORMAT)}
            <div className='mt-2'>
                <div className='relative w-[45%] inline-block bg-[#f5f5f5] border border-border-color p-4'>
                    <h1 className='text-lg'>Thông tin mua hàng</h1>
                    <div className='flex flex-col gap-2 mt-1'>
                        <div>
                            <FontAwesomeIcon icon={faUser} />
                            <span className='ml-2'>{selectedBill.user?.username}</span>
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faPhone} />
                            <span className='ml-2'>{selectedBill.user?.phone_number}</span>
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faEnvelope} />
                            <span className='ml-2'>{selectedBill.user?.email}</span>
                        </div>
                    </div>
                </div>
                <div className='relative left-[10%] w-[45%] inline-block bg-[#f5f5f5] border border-border-color p-4'>
                    <h1 className='text-lg'>Thông tin nhận hàng</h1>
                    <div className='flex flex-col gap-2 mt-1'>
                        <div>
                            <FontAwesomeIcon icon={faUser} />
                            <span className='ml-2'>{selectedBill.customer_name}</span>
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faPhone} />
                            <span className='ml-2'>{selectedBill.phone_number}</span>
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faLocationDot} />
                            <span className='ml-2'>{selectedBill.address}</span>
                        </div>
                    </div>
                </div>
                <div className='mt-3 pb-3 border-b border-border-color'><strong>Ghi chú đơn hàng:</strong><span className='ml-2'>{selectedBill.note}</span></div>
                <div className='mt-3'>
                    <strong>Hình thức thanh toán:</strong>
                    {selectedBill.payment_method === PaymentMethod.SHIPCOD && <span className='ml-2'>Thanh toán sau khi nhận hàng</span>}
                    {selectedBill.payment_method === PaymentMethod.BANK_TRANSFER && <span className='ml-2'>Chuyển khoản ngân hàng</span>}
                    {selectedBill.payment_method === PaymentMethod.VNPAY && <span className='ml-2'>Thanh toán cổng VNPay</span>}
                </div>
                <div className='mt-1'>
                    <strong>Trạng thái thanh toán:</strong>
                    {selectedBill.payment_status === true ? <span className='ml-2'>Đã thanh toán</span> : <span className='ml-2'>Chưa thanh toán</span>}
                </div>
                <div className='mt-1'>
                    <strong>Trạng thái đơn hàng:</strong>
                    {selectedBill.order_status === OrderStatus.SUCCESS && <span className='ml-2'>Thành công</span>}
                    {selectedBill.order_status === OrderStatus.PROCESSING && <span className='ml-2'>Chờ xử lý</span>}
                    {selectedBill.order_status === OrderStatus.CANCELLED && <span className='ml-2'>Đã hủy</span>}
                </div>
            </div>
            <div className='mt-8'>
                {
                    selectedBill.items.map((item, index) =>
                        <div className='py-6 border-b border-border-color' key={`${selectedBill.id}-${index}`}>
                            <div className='flex justify-between items-center gap-2' >
                                <div className='flex gap-2'>
                                    <img src={item.product.image} width={80} />
                                    <div className='flex flex-col justify-center'>
                                        <span>{item.product.name} </span>
                                        <span className='text-sm font-semibold'>x {item.quantity}</span>
                                    </div>
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <div>
                                        {
                                            item.product.old_price != 0 &&
                                            <del className='text-category-title mr-2'>{convertNumbertoMoney(item.product.old_price)}</del>
                                        }
                                        <span className='text-main-orange-color'>{convertNumbertoMoney(item.product.new_price)}</span>
                                    </div>
                                </div>
                            </div>
                            <p className='text-right'>
                                <span className='mr-2 text-nowrap'>Thành tiền:</span>
                                <span className='text-main-orange-color font-semibold'>{convertNumbertoMoney(item.total_price)}</span>
                            </p>
                        </div>
                    )
                }
            </div>
            <div className='py-6 text-right'>
                <span className='px-2'>Tổng tiền:</span>
                <span className='px-2 text-main-orange-color text-xl font-semibold'>{convertNumbertoMoney(selectedBill.total_amount)}</span>
            </div>
            <div className='text-right mt-5'>
                <button className="min-w-[150px] bg-main-orange-color py-[10px] px-[8px] hover:shadow-checkout-btn rounded-md text-white" onClick={() => navigate(-1)}>
                    Quay lại
                </button>
            </div>
        </div>
    )
}

export default PurchaseDetail