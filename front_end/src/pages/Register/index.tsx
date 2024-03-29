import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { RoutePath } from "../../routes";

const Register = () => {
  return (
    <>
      <Helmet>
        <title>Đăng ký - THOL </title>
        <meta name='description' content='Beginner friendly page for learning React Helmet.' />
      </Helmet>
      <div className="container mx-auto mb-10 mt-12 pl-4 max-w-[1140px]">
        <div className="font-extrabold uppercase text-lg  mb-8 tracking-wide">KHÁCH HÀNG ĐĂNG KÝ</div>
        <div className="bg-[#fafafa] p-8 border-[1px] border-[#ddd] text-text-gray w-1/2 text-sm">
          <div>
            <p>Khách hàng đã đăng ký</p>
            <p>
              Nếu bạn có một tài khoản, hãy đăng nhập bằng địa chỉ email của
              bạn.
            </p>
            <form>
              <div className="my-2">
                <div className="label-email font-semibold tracking-wide">Tên người dùng</div>
                <input className="w-full h-[35px] border-[1px] border-[#adadad] rounded-sm" type={"text"} />
              </div>
              <div className="my-2">
                <div className="label-email font-semibold tracking-wide">Email</div>
                <input className="w-full h-[35px] border-[1px] border-[#adadad] rounded-sm" type={"email"} />
              </div>
              <div className="my-2">
                <div className="label-password font-semibold tracking-wide">Mật khẩu</div>
                <input className="w-full h-[35px] border-[1px] border-[#adadad] rounded-sm" type={"password"} />
              </div>
              <div className="my-2">
                <div className="label-email font-semibold tracking-wide">Xác nhận mật khẩu</div>
                <input className="w-full h-[35px] border-[1px] border-[#adadad] rounded-sm" type={"password"} />
              </div>
              <div className="flex justify-between">
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
