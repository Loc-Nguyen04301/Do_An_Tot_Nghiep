import React from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { RoutePath } from "@/routes";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAlertDispatch } from "@/contexts/AlertContext";
import AuthService from "@/services/AuthService";
import { LoginInterface } from "@/types";
import { useAppDispatch } from "@/redux-toolkit/hook";
import { login } from "@/redux-toolkit/authSlice";
import OAuthLogin from "@/pages/Login/OAuthLogin";

import "./Login.scss"

const schema = yup
  .object({
    email: yup.string().required('Email is required').email('Must be a valid email'),
    password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
  })

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const dispatch = useAppDispatch()
  const dispatchAlert = useAlertDispatch()
  const navigate = useNavigate()

  const onSubmit = async (data: LoginInterface) => {
    dispatchAlert({ loading: true })
    try {
      const res = await AuthService.login(data)
      const { user, access_token, refresh_token } = res.data.data
      dispatch(login({ user, access_token, refresh_token }))
      dispatchAlert({ loading: false })
      navigate(RoutePath.Home)
    } catch (error: any) {
      dispatchAlert({ errors: error.message })
    }
  };

  return (<>
    <Helmet>
      <title>Đăng nhập - THOL </title>
      <meta name='description' content='Beginner friendly page for learning React Helmet.' />
    </Helmet>
    <div className="container mx-auto mb-10 mt-12 px-4 max-w-[1140px]">
      <div className="font-extrabold uppercase text-lg mb-8 tracking-wide max-md:text-center">KHÁCH HÀNG ĐĂNG NHẬP</div>
      <div className="bg-[#fafafa] p-8 border-[1px] border-[#ddd] text-text-gray w-1/2 text-sm max-md:w-full">
        <div>
          <p>Khách hàng đã đăng ký</p>
          <p>
            Nếu bạn có một tài khoản, hãy đăng nhập bằng địa chỉ email của
            bạn.
          </p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="my-2">
              <div className="label-email font-semibold tracking-wide">Email</div>
              <input className="w-full h-[35px] border-[1px] border-[#adadad] rounded-sm" type={"email"} {...register('email')} autoComplete="current-email" />
              {errors.email && <p className="text-red-500">{errors.email.message}</p>}
            </div>
            <div className="my-2">
              <div className="label-password font-semibold tracking-wide">Mật khẩu</div>
              <input className="w-full h-[35px] border-[1px] border-[#adadad] rounded-sm" type={"password"} {...register('password')} autoComplete="current-password" />
              {errors.password && <p className="text-red-500">{errors.password.message}</p>}
            </div>
            <Link className="underline block" to={RoutePath.RegisterPage}>Quên mật khẩu?</Link>
            <button type="submit" className="my-3 bg-main-orange-color text-white px-5 py-2 rounded-sm hover:bg-bold-main-orange-color">
              <span>Đăng nhập</span>
            </button>
            <p>Bạn chưa có tài khoản?
              <Link className="ml-1 underline text-main-orange-color" to={RoutePath.RegisterPage}>Tạo tài khoản mới</Link>
            </p>
            <div className="my-3 text-center strike overflow-hidden">
              <span className="text-slate-600 dark:text-slate-500 text-base">Hoặc</span>
            </div>
            <OAuthLogin />
          </form>
        </div>
      </div >
    </div >
  </>)
};

export default Login;
