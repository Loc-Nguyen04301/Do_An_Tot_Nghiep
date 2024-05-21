import { useState, memo } from "react"
import type { CollapseProps } from "antd"
import { Avatar, Collapse, Rate } from "antd"
import { IDetailProduct } from ".."
import { convertNumbertoMoney, getAccessToken } from "@/utils"
import clsx from "clsx"
import ReviewContainer from "./ReviewContainer"
import { useAppSelector } from "@/redux-toolkit/hook"
import ListReview from "@/pages/DetailProduct/components/ListReview"

interface AccordingProductProps {
  product: IDetailProduct
}

const AccordingProduct = ({ product }: AccordingProductProps) => {
  const accessToken = getAccessToken()
  const [imagePreview, setImagePreview] = useState("")
  const { user } = useAppSelector(state => state.auth)

  const isReviewed = product.reviews.findIndex((review) => review.user.id === user?.id)

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
          <div className="flex justify-between text-category-title border-b-[1px] border-border-color py-3">
            <p className="font-semibold text-lg uppercase">Thương hiệu</p>
            <p>{product.brand}</p>
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
          <h3 className="font-semibold text-2xl text-category-title mb-1">
            Đánh giá sản phẩm
          </h3>
          <ListReview product={product} handlePreviewImage={handlePreviewImage} />
          {
            product.reviews.length === 0 && <p className="text-[#777777] text-[16px] text-center mt-2">
              Hiện tại sản phẩm chưa có đánh giá nào, bạn hãy trở thành người đầu tiên đánh giá cho sản phẩm này.
            </p>}
          {
            accessToken && isReviewed === -1
              ?
              <ReviewContainer product={product} handlePreviewImage={handlePreviewImage} />
              : accessToken && isReviewed !== -1
                ?
                <></>
                :
                <div className="border-2 border-main-orange-color pt-3 pl-8 pb-10 mt-10">
                  <span className="text-lg">
                    Chỉ những khách hàng đã đăng nhập mới có thể đưa ra đánh giá.
                  </span>
                </div>
          }
        </div>
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

export default memo(AccordingProduct)
