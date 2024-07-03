import React, { useEffect, useState } from 'react'
import { RoutePath } from '@/routes'
import { Helmet } from 'react-helmet-async'
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import "../Login/Login.scss"
import { useAlertDispatch } from '@/contexts/AlertContext';
import AuthService from '@/services/AuthService';
import UserManagement from '@/components/UserManagement';

export interface ChangePassword {
    password: string
    new_password: string
}

const schema = yup
    .object({
        password: yup.string().required('Old Password is required').min(6, 'Password must be at least 6 characters'),
        new_password: yup.string().required('New Password is required').min(6, 'Password must be at least 6 characters'),
        confirmPassword: yup.string().required('Please confirm your password')
    })
const ChangePassword = () => {
    const { register, handleSubmit, formState: { errors }, watch, getValues, reset } = useForm({
        resolver: yupResolver(schema),
    });
    const [disabled, setDisabled] = useState(false)
    const [isMatchingPassword, setIsMatchingPassword] = useState(false)
    const dispatchAlert = useAlertDispatch()
    const onSubmit = async (data: ChangePassword) => {
        if (!isMatchingPassword) return
        dispatchAlert({ loading: true })
        try {
            const res = await AuthService.changePassword(data)
            dispatchAlert({ success: res.data.message })
            setDisabled(true)
            setTimeout(() => {
                window.location.href = RoutePath.Profile
            }, 2000)
        } catch (error: any) {
            dispatchAlert({ errors: error.message })
        }
    };

    useEffect(() => {
        if (getValues("new_password").length > 0 && getValues("confirmPassword").length > 0 && getValues("new_password") === getValues("confirmPassword"))
            setIsMatchingPassword(true)
        else setIsMatchingPassword(false)
    }, [getValues("new_password"), getValues("confirmPassword")])

    return (
        <>
            <Helmet>
                <title>Đổi mật khẩu - THOL </title>
                <meta name='description' content='Beginner friendly page for learning React Helmet.' />
            </Helmet>
            <UserManagement>
                <div className='w-full border border-[#e7e7e7] p-5'>
                    <div className="pb-5 border-border-color border-b">
                        <h1 className="text-black font-medium text-xl">Đổi mật khẩu</h1>
                        <div className="text-sm">Để đảm bảo tính bảo mật vui lòng đặt mật khẩu với ít nhất 6 kí tự</div>
                    </div>
                    <div className='pt-5'>
                        <div className='flex gap-x-16'>
                            <div className='w-[70%] border-r border-border-color mt-7'>
                                <form>
                                    <div className='pb-5'>
                                        <div className='flex items-center'>
                                            <div className='label-email inline-block w-1/4 text-right text-text-gray text-nowrap'>Mật khẩu cũ</div>
                                            <input className='pl-2 mx-3 w-3/4 h-[35px] border-[1px] border-[#adadad] rounded-sm' type="password" {...register('password')} disabled={disabled} />
                                        </div>
                                        {errors.password && <p className="text-red-500 text-center">{errors.password.message}</p>}
                                    </div >
                                    <div className='pb-5'>
                                        <div className='flex items-center'>
                                            <div className='label-email inline-block w-1/4 text-right text-text-gray text-nowrap'>Mật khẩu mới</div>
                                            <input className='pl-2 mx-3 w-3/4 h-[35px] border-[1px] border-[#adadad] rounded-sm' type="password" {...register('new_password')} disabled={disabled} />
                                        </div>
                                        {errors.new_password && <p className="text-red-500 text-center">{errors.new_password.message}</p>}
                                    </div >
                                    <div className='pb-5'>
                                        <div className='flex items-center'>
                                            <div className='label-email inline-block w-1/4 text-right text-text-gray text-nowrap'>Xác nhận mật khẩu</div>
                                            <input className='pl-2 mx-3 w-3/4 h-[35px] border-[1px] border-[#adadad] rounded-sm' type="password" {...register('confirmPassword')} disabled={disabled} />
                                        </div>
                                        {errors.confirmPassword && <p className="text-red-500 text-center">{errors.confirmPassword.message}</p>}
                                        {watch("new_password") !== watch("confirmPassword") &&
                                            getValues("confirmPassword") ? (
                                            <p className="text-red-500 text-center">Password not match</p>
                                        ) : null}
                                    </div >
                                    <div className='text-center'>
                                        {!disabled &&
                                            <button className='w-[100px] rounded-md bg-main-orange-color py-2 hover:shadow-checkout-btn' onClick={handleSubmit(onSubmit)}>
                                                <span className='text-white font-semibold tracking-wide'>Lưu</span>
                                            </button>
                                        }
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </UserManagement>
        </>
    )
}

export default ChangePassword