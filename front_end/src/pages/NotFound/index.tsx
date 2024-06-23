import React from "react";
import { Helmet } from "react-helmet-async";

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>Không tìm thấy trang - THOL </title>
        <meta name='description' content='Beginner friendly page for learning React Helmet.' />
      </Helmet>
      <div className="mx-auto max-w-[1140px] py-8 h-[300px] flex justify-center items-center">
        <h1 className="text-center font-bold text-3xl text-[#555]">Oops! That page can’t be found.</h1>
      </div>
    </>
  )
};

export default NotFound;
