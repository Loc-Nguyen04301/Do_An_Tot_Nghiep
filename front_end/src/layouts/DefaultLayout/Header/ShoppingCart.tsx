import React from "react"
import { RoutePath } from "../../../routes"
import { Link, Route } from "react-router-dom"
import { useAppSelector } from "../../../redux-toolkit/hook"
import { convertNumbertoMoney } from "../../../utils"

const ShoppingCart = () => {
  const { cartItems, totalAmount, totalQuantity } = useAppSelector(state => state.cart)

  return (
    <div className="dropdown-content cart left-[-60px] top-[30px] bg-white">
      {cartItems.length > 0
        ?
        <div className="pt-5 pb-8 px-5">
          <div className="min-w-[260px] max-h-[250px] overflow-y-auto">
            {cartItems.map((item) =>
              <Link to={`${RoutePath.DetailProduct}/${item.id}`} className="flex pb-3 border-b border-border-color category-item my-4" key={item.id}>
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
              </Link>)}
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
