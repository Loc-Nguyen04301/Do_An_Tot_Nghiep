import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { RoutePath } from '@/routes'
import { NavLink } from 'react-router-dom'
import clsx from 'clsx'
import { checkImage, imageUpload } from '@/utils'
import { useAlertDispatch } from '@/contexts/AlertContext'
import { ConfigProvider, RadioChangeEvent } from 'antd'
import { useAppSelector } from '@/redux-toolkit/hook'
import UserService from '@/services/UserService'

const Profile = () => {
    const { user } = useAppSelector(state => state.auth)
    const [avatarTemp, setAvatarTemp] = useState<string>()
    const [avatarTempFile, setAvatarTempFile] = useState<File>()

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

    const handleUpdateProfile = async () => {
        dispatchAlert({ loading: true })
        try {
            if (user?.id && avatarTempFile) {
                const res = await imageUpload(avatarTempFile)
                await UserService.updateProfile(user.id, { avatar: res.url })
                dispatchAlert({ loading: false })
                window.location.reload()
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        setAvatarTemp(user?.avatar)
    }, [user?.avatar])

    return (
        <>
            <Helmet>
                <title>Tài khoản của tôi - THOL </title>
                <meta name='description' content='Beginner friendly page for learning React Helmet.' />
            </Helmet>
            <ConfigProvider>
                <div className="mx-auto max-w-[1112px] py-8 px-4 bg-[#f5f5f5] my-8">
                    <div className='flex'>
                        <div className='w-[244px]'>
                            <div className='flex flex-col'>
                                <NavLink to={RoutePath.Profile} className={({ isActive }) => clsx("pl-2 py-5 font-semibold cursor-pointer hover:text-main-orange-color ", isActive && "text-main-orange-color")} >
                                    Tài khoản của tôi
                                </NavLink>
                                <NavLink to={RoutePath.Purchase} className={({ isActive }) => clsx("pl-2 py-5 font-semibold cursor-pointer hover:text-main-orange-color", isActive && "text-main-orange-color")} >
                                    Đơn hàng
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
                                        <div className='pb-5'>
                                            <div className='inline-block w-1/4 text-right text-text-gray'>Email</div>
                                            <div className='inline-block pl-3'>{user?.email}</div>
                                        </div>
                                        <div className='pb-5'>
                                            <div className='inline-block w-1/4 text-right text-text-gray'>Tên người dùng</div>
                                            <div className='inline-block pl-3'>{user?.username}</div>
                                        </div >
                                        <div className='pb-5'>
                                            <div className='inline-block w-1/4 text-right text-text-gray'>Số điện thoại</div>
                                            <div className='inline-block pl-3'>{user?.phone_number}</div>
                                        </div>
                                        <div className='pb-5'>
                                            <div className='inline-block w-1/4 text-right text-text-gray'>Địa chỉ</div>
                                            <div className='inline-block pl-3'>{user?.address}</div>
                                        </div>
                                        <div className='text-center'>
                                            <button className='w-[100px] rounded-md bg-main-orange-color py-2 hover:shadow-checkout-btn' onClick={handleUpdateProfile}>
                                                <span className='text-white font-semibold tracking-wide'>Lưu</span>
                                            </button>
                                        </div>
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
            </ConfigProvider>
        </>
    )
}

export default Profile