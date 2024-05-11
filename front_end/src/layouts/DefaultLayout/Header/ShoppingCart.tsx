import React, { useState } from "react"
import { RoutePath } from "@/routes"
import { Link, Route } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "@/redux-toolkit/hook"
import { convertNumbertoMoney } from "@/utils"
import { CloseCircleOutlined } from '@ant-design/icons';
import { ConfigProvider, Modal } from "antd"
import { deleteItemToCart } from "@/redux-toolkit/cartSlice"
import { useAlertDispatch } from "@/contexts/AlertContext"

const ShoppingCart = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { cartItems, totalAmount, totalQuantity } = useAppSelector(state => state.cart)

  const dispatch = useAppDispatch()
  const dispatchAlert = useAlertDispatch()

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = (product: any) => {
    dispatchAlert({ success: "Xóa sản phẩm thành công" })
    dispatch(deleteItemToCart(product))
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="dropdown-content !min-w-[300px] cart left-[-60px] top-[30px] bg-white !cursor-text">
      {cartItems.length > 0
        ?
        <div className="pt-5 pb-8 px-5">
          <div className="min-w-[260px] max-h-[250px] overflow-y-auto">
            {cartItems.map((item) =>
              <div key={item.id} className="flex pb-3 border-b border-border-color category-item my-4">
                <Link
                  to={`${RoutePath.DetailProduct}/${item.id}`}
                  className="flex"
                >
                  <img
                    src={item.image}
                    className="w-[60px] h-[60px]"
                  />
                  <div className="inline-block ml-3">
                    <h1 className="text-[#334862] font-semibold">
                      {item.name}
                    </h1>
                    <div>
                      <span className="text-[#777]">
                        {item.quantity} *
                        <span className="text-main-grey-color px-2 font-semibold">
                          {convertNumbertoMoney(item.new_price)}
                        </span>
                      </span>
                    </div>
                  </div>
                </Link>
                <CloseCircleOutlined className="text-lg text-category-title hover:text-main-orange-color pl-4" onClick={showModal} />
                <ConfigProvider theme={{
                  token: {
                    colorPrimary: '#f48220'
                  }
                }}>
                  <Modal centered title="Xóa sản phẩm" open={isModalOpen} onOk={() => handleOk(item)} onCancel={handleCancel}>
                    <p className='text-base'>Bạn muốn xóa sản phẩm này khỏi giỏ hàng ?</p>
                  </Modal>
                </ConfigProvider>
              </div>
            )}
          </div>
          <p className="text-center text-lg text-main-grey-color py-3 border-b-[1px] border-border-color">
            <strong>Tạm tính:</strong>
            <strong className="px-2 font-semibold">{convertNumbertoMoney(totalAmount)}</strong>
          </p>
          <div className="bg-main-orange-color hover:bg-[#d26e4b] duration-300 cursor-pointer mt-5">
            <Link to={RoutePath.CartPage}>
              <span className="uppercase text-white font-semibold tracking-wide text-center block py-2">
                Xem giỏ hàng
              </span>
            </Link>
          </div>
          <div className="bg-button-red-color hover:bg-red-800 duration-300 cursor-pointer mt-2">
            <Link to={RoutePath.CheckoutPage}>
              <span className="uppercase text-white font-semibold tracking-wide text-center block py-2">
                Thanh toán
              </span>
            </Link>
          </div>
        </div>
        :
        <div className="py-5 px-4 min-w-[260px]">
          <p className="text-center text-[#666666] text-base">
            Chưa có sản phẩm trong giỏ hàng.
          </p>
        </div>}
    </div>
  )
}

export default ShoppingCart
