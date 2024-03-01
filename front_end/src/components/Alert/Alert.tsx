import React from 'react'
import { useAlertContext } from '../../contexts/AlertContext'
import Toast from './Toast'
import Loading from './Loading'

const Alert = () => {
    const { loading, success, errors } = useAlertContext()
    return (
        <>
            {loading && <Loading />}
            {success && <Toast title="Success" body={success} bgColor="bg-success" />}
            {errors && <Toast title="Errors" body={errors} bgColor="bg-danger" />}
        </>
    )
}

export default Alert