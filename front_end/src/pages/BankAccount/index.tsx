import React from "react";
import { Helmet } from "react-helmet-async";
import aboutUsBanner from "../../assets/images/aboutus_banner.jpg"

const BankAccount = () => {
  return <>
    <Helmet>
      <title>Tài khoản ngân hàng - THOL </title>
      <meta name='description' content='Beginner friendly page for learning React Helmet.' />
    </Helmet>
    <div className="mx-auto max-w-[1140px] py-8 px-2">
      <div className="grid grid-cols-12">
        <div className="col-span-9 max-sm:col-span-12 px-4">
          <div className="text-center">
            <div className="text-[#334862] text-xs font-bold tracking-wider mb-1">
              Chưa phân loại
            </div>
            <div className="text-[#555] font-extrabold text-3xl">Thông tin tài khoản ngân hàng – Nguyễn Gia Lộc</div>
            <div className="mx-auto h-[3px] max-w-[30px] bg-category-title mt-4 mb-3"></div>
            <div className="text-xs text-text-gray">
              POSTED ON THÁNG MƯỜI,19 2023 BY LOCNGUYEN
            </div>
          </div>
          <div className="mt-16">
            <p className="text-[#55555] font-extrabold text-2xl mb-5 tracking-wider	">Thông tin chuyển khoản mua hàng THOL</p>
            <p className="mb-5 text-[#777777] text-lg text-center">
              Thông tin chuyển khoản mua hàng THOL
            </p>
            <div className="bg-[#dff0d8] text-[#3c763d] p-4 rounded mb-6">
              <strong className="font-extrabold text-xl tracking-normal">Ngân hàng Thương Mại Cổ Phần Công Thương Việt Nam VIETINBANK
              </strong>
              <p>Chủ tài khoản: NGUYEN GIA LOC
              </p>
              <p>Số tài khoản: 12345678910
              </p>
            </div>
          </div>
        </div>
        <div className="col-span-3 max-sm:hidden px-4">
          <img src={aboutUsBanner} className="w-full" />
        </div>
      </div>
    </div>
  </>;
};

export default BankAccount;
