import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { RoutePath } from "../../routes";
import "./Login.scss"

const Login = () => {
  return (<>
    <Helmet>
      <title>Đăng nhập - THOL </title>
      <meta name='description' content='Beginner friendly page for learning React Helmet.' />
    </Helmet>
    <div className="container mx-auto mb-10 pl-24">
      <div className="font-extrabold uppercase text-lg mt-12 mb-8 tracking-wide">KHÁCH HÀNG ĐĂNG NHẬP</div>
      <div className="bg-[#fafafa] p-8 border-[1px] border-[#ddd] text-text-gray w-1/2 text-sm">
        <div>
          <p>Khách hàng đã đăng ký</p>
          <p>
            Nếu bạn có một tài khoản, hãy đăng nhập bằng địa chỉ email của
            bạn.
          </p>
          <form className="">
            <div className="my-2">
              <div className="label-email font-semibold tracking-wide">Email</div>
              <input className="w-full h-[35px] border-[1px] border-[#adadad] rounded-sm" type={"text"} />
            </div>
            <div className="my-2">
              <div className="label-password font-semibold tracking-wide">Mật khẩu</div>
              <input className="w-full h-[35px] border-[1px] border-[#adadad] rounded-sm" type={"password"} />
            </div>
            <div className="flex justify-between">
              <button type="submit" className="bg-main-orange-color text-white px-5 py-2 rounded-sm hover:bg-bold-main-orange-color">
                <span>Đăng nhập</span>
              </button>
              <Link to={RoutePath.RegisterPage}>
                <span className="underline">Bạn chưa có tài khoản ?</span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  </>)
};

export default Login;
