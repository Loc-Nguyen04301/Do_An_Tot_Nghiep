import { useAlertDispatch } from '@/contexts/AlertContext'
import { RoutePath } from '@/routes'
import ProductService from '@/services/ProductService'
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

interface CheckAvailableProps {
    children?: React.ReactElement
}

const CheckAvailable = ({ children }: CheckAvailableProps) => {
    const navigate = useNavigate()
    const { label } = useParams()
    const dispatchAlert = useAlertDispatch()
    useEffect(() => {
        const getProductById = async () => {
            dispatchAlert({ loading: true })
            try {
                const res = await ProductService.getProductById(Number(label))
                dispatchAlert({ loading: false })
                const available = res.data.data.available
                console.log(available)
                if (available === 0) {
                    navigate(`${RoutePath.Home}`)
                }


            } catch (error) {
                console.log(error)
            }
        }

        getProductById()
    }, [label])

    return <>{children}</>
}

export default CheckAvailable