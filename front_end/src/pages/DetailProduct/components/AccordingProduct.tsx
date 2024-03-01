import React from "react"
import type { CollapseProps } from "antd"
import { Collapse } from "antd"

const AccordingProduct = () => {
  const text = (
    <p style={{ paddingLeft: 24 }}>
      A dog is a type of domesticated animal. Known for its loyalty and
      faithfulness, it can be found as a welcome guest in many households across
      the world.
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
        <div className="flex justify-between text-category-title border-b-[1px] border-border-color pb-[2px]">
          <p className="font-semibold text-lg uppercase">Trọng lượng</p>
          <p className="">7100g</p>
        </div>
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
          <p className="text-[#777777] text-[16px]">Chưa có đánh giá nào.</p>
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
