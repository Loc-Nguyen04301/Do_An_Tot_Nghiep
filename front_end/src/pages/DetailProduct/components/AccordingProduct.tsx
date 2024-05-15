import { useState } from "react"
import type { CollapseProps } from "antd"
import { Collapse, Rate } from "antd"
import { IDetailProduct } from ".."
import { convertNumbertoMoney, getAccessToken } from "@/utils"
import clsx from "clsx"
import ReviewContainer from "./ReviewContainer"
import { useAppSelector } from "@/redux-toolkit/hook"

interface AccordingProductProps {
  product: IDetailProduct
}

const AccordingProduct = ({ product }: AccordingProductProps) => {
  const accessToken = getAccessToken()
  const [imagePreview, setImagePreview] = useState("")
  const { user } = useAppSelector(state => state.auth)

  const isReviewed = product.reviews.findIndex((review) => review.user.id === user.id)
  console.log(isReviewed)

  const handlePreviewImage = (src: string) => {
    setImagePreview(src)
  }

  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: (
        <a className="text-lg hover:text-main-orange-color block"
          href="#mota">
          Mô tả
        </a>
      ),
      children:
        <p style={{ paddingLeft: 24 }}>
          {product.description}
        </p>,
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
          Đánh giá ({product._count.reviews})
        </a>
      ),
      children: (
        <div>
          <h3 className="font-semibold text-2xl text-category-title mb-3">
            Đánh giá sản phẩm
          </h3>
          {product.reviews.map((review) =>
            <div
              key={`${review.id}`}
              className="flex border-b border-border-color py-4"
            >
              <img
                src={review.user.avatar}
                className="max-h-10 pr-2 mt-1"
              />
              <div>
                <span className="text-[#222] text-xs">
                  {review.user.username}
                </span>
                <div>
                  <Rate disabled defaultValue={review.star} />
                </div>
                <p className="text-[#0000008a] text-xs">
                  {review.created_at.substring(0, 10)}
                </p>
                <p className="text-black text-base">
                  {review.description}
                </p>
                <div className="image-lists flex gap-2 mt-3">
                  {review.images.map((image, index) =>
                    <img
                      key={index}
                      src={image}
                      className="max-h-[100px] cursor-zoom-in hover:opacity-70"
                      onClick={() => handlePreviewImage(image)}
                    />)}
                </div>
              </div>
            </div>)}
          {product.reviews.length === 0 && <p className="text-[#777777] text-[16px]">Chưa có đánh giá nào.</p>}
          <div className="pt-16">
            {
              accessToken && isReviewed === -1
                ?
                <ReviewContainer product={product} handlePreviewImage={handlePreviewImage} />
                : accessToken && isReviewed !== -1
                  ?
                  <></>
                  :
                  <div className="border-2 border-main-orange-color pt-3 pl-8 pb-10">
                    <span className="text-lg">
                      Chỉ những khách hàng đã đăng nhập và mua sản phẩm này mới có thể đưa ra đánh giá.
                    </span>
                  </div>
            }
          </div>
        </div >
      ),
      showArrow: true,
    },
  ]

  return (
    <>
      <Collapse accordion items={items} bordered={false} />
      <div id="myModal" className={clsx("modal", imagePreview.length > 0 ? "block" : "hidden")}>
        <span className="close" onClick={() => handlePreviewImage("")}>&times;</span>
        <img className="modal-content" src={imagePreview} />
      </div>
    </>
  )
}

export default AccordingProduct
