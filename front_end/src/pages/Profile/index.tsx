import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { RoutePath } from '@/routes'
import { NavLink } from 'react-router-dom'
import clsx from 'clsx'
import { checkImage, imageUpload, phoneRegExp } from '@/utils'
import { useAlertDispatch } from '@/contexts/AlertContext'
import { useAppSelector } from '@/redux-toolkit/hook'
import UserService from '@/services/UserService'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

interface UpdateUser {
    username?: string
    phone_number?: string
    address?: string
}

const schema = yup
    .object({
        username: yup.string().required('Username is required'),
        phone_number: yup.string().required('Phone number is required').length(10, "Phone number is not valid").matches(phoneRegExp, 'Phone number is not valid'),
        address: yup.string().required('Address is required'),
    })

const Profile = () => {
    const { user } = useAppSelector(state => state.auth)
    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: yupResolver(schema),
    });
    useEffect(() => {
        if (user) {
            setValue("address", user.address)
            setValue("phone_number", user.phone_number)
            setValue("username", user.username)
        }
    }, [user])
    const [avatarTemp, setAvatarTemp] = useState<string>()
    const [avatarTempFile, setAvatarTempFile] = useState<File>()
    const [disabled, setDisabled] = useState(false)

    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const dispatchAlert = useAlertDispatch()

    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (files && files.length > 0) {
            const file = files[0];
            if (checkImage(file).length > 0) {
                dispatchAlert({ errors: checkImage(file) })
                return
            }
            else {
                setAvatarTemp(URL.createObjectURL(file))
                setAvatarTempFile(file)
            }
        }
    };

    const onSubmit = async (data: UpdateUser) => {
        dispatchAlert({ loading: true })
        var image: string = ""
        if (avatarTempFile) {
            const res = await imageUpload(avatarTempFile)
            image = res.url
        }
        const newData = { ...data, avatar: image || user?.avatar }
        try {
            if (user?.id) {
                const res = await UserService.updateProfile(user.id, newData)
                dispatchAlert({ loading: false })
                dispatchAlert({ success: res.data.message })
                setDisabled(true)
                setTimeout(() => {
                    window.location.reload()
                }, 2000)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        setAvatarTemp(user?.avatar)
    }, [user])

    return (
        <>
            <Helmet>
                <title>Tài khoản của tôi - THOL </title>
                <meta name='description' content='Beginner friendly page for learning React Helmet.' />
            </Helmet>
            <div className="mx-auto max-w-[1112px] py-8 px-4 bg-[#f5f5f5] my-8">
                <div className='flex'>
                    <div className='w-[244px]'>
                        <div className='flex flex-col'>
                            <NavLink to={RoutePath.Profile} className={({ isActive }) => clsx("pl-2 py-5 font-semibold cursor-pointer hover:text-main-orange-color ", isActive && "text-main-orange-color")} >
                                Tài khoản của tôi
                            </NavLink>
                            <NavLink to={RoutePath.Purchase} className={({ isActive }) => clsx("pl-2 py-5 font-semibold cursor-pointer hover:text-main-orange-color", isActive && "text-main-orange-color")} >
                                Đơn mua
                            </NavLink>
                            <NavLink to={RoutePath.ChangePassword} className={({ isActive }) => clsx("pl-2 py-5 font-semibold cursor-pointer hover:text-main-orange-color", isActive && "text-main-orange-color")} >
                                Đổi mật khẩu
                            </NavLink>
                        </div>
                    </div>
                    <div className='w-full border border-[#e7e7e7] p-5'>
                        <div className="pb-5 border-border-color border-b">
                            <h1 className="text-black font-medium text-xl">Hồ sơ của tôi</h1>
                            <div className="text-sm">Quản lý thông tin hồ sơ để bảo mật tài khoản </div>
                        </div>
                        <div className='pt-5'>
                            <div className='flex gap-x-16'>
                                <div className='w-[70%] border-r border-border-color mt-7'>
                                    <form>
                                        <div className='pb-5 flex items-center'>
                                            <div className='inline-block w-1/4 text-right text-text-gray'>Email</div>
                                            <input className='pl-2 mx-3 w-3/4 h-[35px] border-[1px] border-[#adadad] rounded-sm' defaultValue={user?.email} disabled />
                                        </div>
                                        <div className='pb-5'>
                                            <div className='flex items-center'>
                                                <div className='inline-block w-1/4 text-right text-text-gray'>Tên người dùng</div>
                                                <input className='pl-2 mx-3 w-3/4 h-[35px] border-[1px] border-[#adadad] rounded-sm' defaultValue={user?.username} {...register('username')} disabled={disabled} />
                                            </div>
                                            {errors.username && <p className="text-red-500 text-center">{errors.username.message}</p>}
                                        </div >
                                        <div className='pb-5'>
                                            <div className='flex items-center'>
                                                <div className='inline-block w-1/4 text-right text-text-gray'>Số điện thoại</div>
                                                <input className='pl-2 mx-3 w-3/4 h-[35px] border-[1px] border-[#adadad] rounded-sm' defaultValue={user?.phone_number} {...register('phone_number')} disabled={disabled} />
                                            </div>
                                            {errors.phone_number && <p className="text-red-500 text-center">{errors.phone_number.message}</p>}
                                        </div>
                                        <div className='pb-5'>
                                            <div className='flex items-center'>
                                                <div className='inline-block w-1/4 text-right text-text-gray'>Địa chỉ</div>
                                                <input className='pl-2 mx-3 w-3/4 h-[35px] border-[1px] border-[#adadad] rounded-sm' defaultValue={user?.address} {...register('address')} disabled={disabled} />
                                            </div>
                                            {errors.address && <p className="text-red-500 text-center">{errors.address.message}</p>}
                                        </div>
                                        <div className='text-center'>
                                            {!disabled &&
                                                <button className='w-[100px] rounded-md bg-main-orange-color py-2 hover:shadow-checkout-btn' onClick={handleSubmit(onSubmit)}>
                                                    <span className='text-white font-semibold tracking-wide'>Lưu</span>
                                                </button>
                                            }
                                        </div>
                                    </form>
                                </div>
                                <div className='flex flex-col items-center gap-3 mt-2'>
                                    <div className='w-[100px] h-[100px]'>
                                        {avatarTemp && <div className="bg-cover bg-center bg-no-repeat w-full h-full rounded-full" style={{ backgroundImage: `url(${avatarTemp})` }}></div>}
                                    </div>
                                    <label
                                        className="px-5 py-2 cursor-pointer text-black border border-[#e7e7e7] hover:bg-[#00000008]"
                                        onClick={handleButtonClick}
                                    >
                                        Chọn Ảnh
                                    </label>
                                    <input className="hidden" type="file" accept=".jpg,.jpeg,.png" ref={fileInputRef} onChange={handleFileChange} />
                                    <div>
                                        <div>Dụng lượng file tối đa 1 MB</div>
                                        <div>Định dạng:.JPEG, .PNG</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile