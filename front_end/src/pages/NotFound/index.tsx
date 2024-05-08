import React from "react";
import { Helmet } from "react-helmet-async";

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>Không tìm thấy trang - THOL </title>
        <meta name='description' content='Beginner friendly page for learning React Helmet.' />
      </Helmet>
      <div className="h-[30vh]">
        <h1 className="text-center">Not Found</h1>
      </div>
    </>
  )
};

export default NotFound;
