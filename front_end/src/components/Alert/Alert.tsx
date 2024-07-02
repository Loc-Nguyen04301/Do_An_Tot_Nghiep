import React, { memo, useEffect } from 'react'
import { useAlertContext } from '@/contexts/AlertContext'
import Loading from './Loading'
import { Bounce, toast, ToastContainer } from 'react-toastify';

const Alert = () => {
    const { loading, success, errors, id } = useAlertContext()

    useEffect(() => {
        if (success) {
            toast.success(success);
        }
        if (errors) {
            toast.error(errors);
        }
    }, [id, success, errors]);

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
            {loading && <Loading />}
        </>
    )
}

export default memo(Alert)