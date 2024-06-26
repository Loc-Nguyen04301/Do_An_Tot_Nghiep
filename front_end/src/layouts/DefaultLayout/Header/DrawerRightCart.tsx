import { ConfigProvider, Drawer } from "antd"
import { DrawerStyles } from "antd/es/drawer/DrawerPanel"
import React from "react"
import ShoppingCart from "./ShoppingCart"
import { Link } from "react-router-dom"
import { RoutePath } from "@/routes"
import { useAppSelector } from "@/redux-toolkit/hook"
import { convertNumbertoMoney } from "@/utils"

interface DrawerRightCartProps {
  openRightModal: boolean
  setOpenRightModal: React.Dispatch<React.SetStateAction<boolean>>
}
const DrawerRightCart = ({
  openRightModal,
  setOpenRightModal,
}: DrawerRightCartProps) => {
  const { cartItems, totalAmount, totalQuantity } = useAppSelector(state => state.cart)

  const drawerStyles: DrawerStyles = {
    content: {
      boxShadow: "-10px 0 10px #666",
    },
  }

  const onClose = () => {
    setOpenRightModal(false)
  }

  return (
    <ConfigProvider
      drawer={{
        styles: drawerStyles,
      }}
    >
      <Drawer
        placement="right"
        open={openRightModal}
        onClose={onClose}
        width={260}
        title={<h1 className="text-center">Giỏ hàng </h1>}
        className="bg-[#f8f8f8]"
      >
        {cartItems.length > 0 ? <div className="w-full">
          <div>
            {cartItems.map((item) =>
              <Link
                key={item.id}
                to={`${RoutePath.DetailProduct}/${item.id}`}
                className="flex pb-3 border-b border-border-color category-item my-4"
                onClick={onClose}
              >
                <img
                  src={item.image}
                  className="w-[60px] h-[60px]"
                />
                <div className="inline-block ml-3">
                  <h1 className="text-[#334862] font-semibold">
                    {item.name}
                  </h1>
                  <span className="text-main-grey-color">
                    {item.quantity} *
                    <span className="text-main-grey-color px-2 font-semibold">
                      {convertNumbertoMoney(item.new_price)}
                    </span>
                  </span>
                </div>
              </Link>
            )}
          </div>
          <p className="text-center text-lg text-main-grey-color py-3 border-b-[1px] border-border-color">
            <strong>Tổng số phụ:</strong>
            <strong className="px-2 font-semibold">1.750.000₫</strong>
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
          <div className="px-4 text-center text-[#666666] text-lg">
            Chưa có sản phẩm trong giỏ hàng.
          </div>
        }
      </Drawer>
    </ConfigProvider>
  )
}

export default DrawerRightCart
