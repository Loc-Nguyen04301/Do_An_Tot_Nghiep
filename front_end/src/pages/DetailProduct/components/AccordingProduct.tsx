import React from "react"
import type { CollapseProps } from "antd"
import { Collapse } from "antd"
import { IDetailProduct } from ".."
import { convertNumbertoMoney } from "../../../utils"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar } from "@fortawesome/free-solid-svg-icons";

interface AccordingProductProps {
  product: IDetailProduct
}

const AccordingProduct = ({ product }: AccordingProductProps) => {
  const text = (
    <p style={{ paddingLeft: 24 }}>
      {product.description}
    </p>
  )

  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: (
        <a className="text-lg hover:text-main-orange-color block"
          href="#mota">
          Mô tả
        </a>
      ),
      children: text,
      showArrow: true,
    },
    {
      key: "2",
      label: (
        <a
          className="text-lg hover:text-main-orange-color block"
          href="#thongtinbosung"
        >
          Thông tin bổ sung
        </a>
      ),
      children: (
        <>
          <div className="flex justify-between text-category-title border-b-[1px] border-border-color py-3">
            <p className="font-semibold text-lg uppercase">Trọng lượng</p>
            <p>0g</p>
          </div>
          <div className="flex justify-between text-category-title border-b-[1px] border-border-color py-3">
            <p className="font-semibold text-lg uppercase">Giá</p>
            <p>{convertNumbertoMoney(product.new_price)}</p>
          </div>
        </>
      ),
      showArrow: true,
    },
    {
      key: "3",
      label: (
        <a
          className="text-lg hover:text-main-orange-color block"
          href="#danhgia"
        >
          Đánh giá (0)
        </a>
      ),
      children: (
        <div>
          <h3 className="font-bold text-2xl text-category-title mb-3">
            Đánh giá
          </h3>
          {Array.from({ length: 6 }, (_i, index) =>
            <div
              key={`${index}`}
              className="flex border-b border-border-color py-4"
            >
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRV-Gh6uC11b9BUzfJ1OAuC3MgwwQdOLZL7PA&usqp=CAU"
                alt="user_name"
                className="max-h-10 pr-2"
              />
              <div>
                <span className="text-[#222] text-xs">
                  Nguyen Gia Loc
                </span>
                <div>
                  {[...Array(3)].map((_i, index) => (
                    <FontAwesomeIcon
                      key={index}
                      icon={faStar}
                      className="text-main-orange-color"
                    />
                  ))}
                  {5 - 3 > 0 &&
                    [...Array(5 - 3)].map((_i, index) => (
                      <FontAwesomeIcon icon={faStar} key={index} className="text-main-grey-color" />
                    ))}
                </div>
                <p className="text-[#0000008a] text-xs">
                  {new Date()
                    .toISOString()
                    .substring(0, 10)}
                </p>
                <p className="text-black text-base">
                  sản phâm này rất tốt chúng tôi muốn mua số lượng lơn
                </p>
                <div className="image-lists flex gap-2 mt-3">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRV-Gh6uC11b9BUzfJ1OAuC3MgwwQdOLZL7PA&usqp=CAU"
                    alt="user_name"
                    className="max-h-16 cursor-pointer"
                  />
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRV-Gh6uC11b9BUzfJ1OAuC3MgwwQdOLZL7PA&usqp=CAU"
                    alt="user_name"
                    className="max-h-16 cursor-pointer"
                  />
                </div>
              </div>
            </div>)}
          {/* <p className="text-[#777777] text-[16px]">Chưa có đánh giá nào.</p> */}
          <div className="mt-10 border-2 border-main-orange-color pt-3 pl-8 pb-10">
            <span className="text-lg">
              Chỉ những khách hàng đã đăng nhập và mua sản phẩm này mới có thể đưa ra đánh giá.
            </span>
          </div>
        </div>
      ),
      showArrow: true,
    },
  ]
  return <Collapse accordion items={items} bordered={false} />
}

export default AccordingProduct
