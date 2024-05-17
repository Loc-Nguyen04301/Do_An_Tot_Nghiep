import { useAlertDispatch } from '@/contexts/AlertContext'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

const UpdateBill = () => {
    nst[selectedBill, setSelectedBill] = useState<>()
    const params = useParams()

    const dispatchAlert = useAlertDispatch()

    useEffect(() => {
        const getProductsById = async (id: number) => {
            dispatchAlert({ loading: true })
            try {
                const res = await ProductService.getProductById(id)
                setSelectedProduct(res.data.data)
                dispatchAlert({ loading: false })
            } catch (error) {
                console.log(error)
            }
        }

        if (params.id) getProductsById(Number(params.id))
    }, [params.id])
    return (
        <div>UpdateBill</div>
    )
}

export default UpdateBill