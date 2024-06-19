import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { RoutePath } from "@/routes";
import * as yup from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { RegisterInterface } from "@/types";
import { useAlertDispatch } from "@/contexts/AlertContext";
import AuthService from "@/services/AuthService";

import "../Login/Login.scss"

const schema = yup
  .object().shape({
    username: yup.string().required('Username is required'),
    email: yup.string().required('Email is required').email('Must be a valid email'),
    password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
    confirmPassword: yup.string().required('Please confirm your password')
  })

const Register = () => {
  const dispatchAlert = useAlertDispatch()
  const { register, handleSubmit, formState: { errors }, watch, getValues, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: RegisterInterface) => {
    dispatchAlert({ loading: true })
    try {
      const res = await AuthService.register(data)
      dispatchAlert({ success: res.data.message })
      reset()
    } catch (error: any) {
      dispatchAlert({ errors: error.message })
    }
  };

  return (
    <>
      <Helmet>
        <title>Đăng ký - THOL </title>
        <meta name='description' content='Beginner friendly page for learning React Helmet.' />
      </Helmet>
      <div className="container mx-auto mb-10 mt-12 px-4 max-w-[1140px]">
        <div className="font-extrabold uppercase text-lg  mb-8 tracking-wide max-md:text-center">KHÁCH HÀNG ĐĂNG KÝ</div>
        <div className="bg-[#fafafa] p-8 border-[1px] border-[#ddd] text-text-gray w-1/2 text-sm max-md:w-full">
          <div>
            <p>Khách hàng đã đăng ký</p>
            <p>
              Nếu bạn có một tài khoản, hãy đăng nhập bằng địa chỉ email của
              bạn.
            </p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="my-2">
                <div className="label-email font-semibold tracking-wide">Tên người dùng</div>
                <input className="w-full h-[35px] border-[1px] border-[#adadad] rounded-sm" type={"text"} {...register('username')} />
                {errors.email && <p className="text-red-500">{errors.username?.message}</p>}
              </div>
              <div className="my-2">
                <div className="label-email font-semibold tracking-wide">Email</div>
                <input className="w-full h-[35px] border-[1px] border-[#adadad] rounded-sm" type={"email"} {...register('email')} />
                {errors.email && <p className="text-red-500">{errors.email.message}</p>}
              </div>
              <div className="my-2">
                <div className="label-password font-semibold tracking-wide">Mật khẩu</div>
                <input className="w-full h-[35px] border-[1px] border-[#adadad] rounded-sm" type={"password"} {...register('password')} />
                {errors.password && <p className="text-red-500">{errors.password.message}</p>}
              </div>
              <div className="my-2">
                <div className="label-email font-semibold tracking-wide">Xác nhận mật khẩu</div>
                <input className="w-full h-[35px] border-[1px] border-[#adadad] rounded-sm" type={"password"} {...register('confirmPassword')} />
                {errors.password && <p className="text-red-500">{errors.confirmPassword?.message}</p>}
                {watch("password") !== watch("confirmPassword") &&
                  getValues("confirmPassword") ? (
                  <p className="text-red-500">Password not match</p>
                ) : null}
              </div>
              <div className="flex justify-between mt-5">
                <button type="submit" className="bg-main-orange-color text-white px-5 py-2 rounded-sm hover:bg-bold-main-orange-color">
                  <span>Đăng ký</span>
                </button>
                <Link to={RoutePath.LoginPage}>
                  <span className="underline">Đăng nhập</span>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
};

export default Register;
