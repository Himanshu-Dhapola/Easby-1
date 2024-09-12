import PageNav from "../Navigation/PageNav";
import CartItem from "./CartItem";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getCartItem } from "../../../services/cartApi";
import { useEffect } from "react";
import { PiShoppingCartDuotone } from "react-icons/pi";

export default function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);

  const handleCheckout = () => {
    navigate("/checkout?step=2");
  };

  useEffect(() => {
    dispatch(getCartItem());
  }, []);

  return (
    <div className="min-h-screen bg-smoke font-Poppins">
      <PageNav />
      <div
        className={
          cart?.totalItem === 0
            ? `-mt-[150px]`
            : `lg:grid grid-cols-3 lg:px-16 px-4 relative`
        }
      >
        <div className="col-span-2">
          {cart?.cartItem.map((item, index) => (
            <CartItem key={index} item={item} />
          ))}
        </div>
        {cart?.totalItem === 0 ? (
          <div className="flex flex-col w-full justify-center items-center min-h-screen">
            <div className="w-[150x] h-[150px] md:w-[200px] md:h-[200px]">
              <PiShoppingCartDuotone className="w-full h-full" />
            </div>
            <p className=" font-Poppins uppercase text-color font-semibold text-lg md:text-xl mt-4">
              Cart is Empty
            </p>
          </div>
        ) : (
          <div className="px-4 md:px-5 sticky top-0 mt-5 md:mt-5">
            <div className="bg-white border rounded-lg p-3">
              <p className="text-black font-semibold">Price Details</p>
              <div>
                <div className="flex justify-between pt-3 text-black">
                  <span>Price</span>
                  <span>&#8377;{cart?.totalPrice}</span>
                </div>
                <div className="flex justify-between pt-3 text-black">
                  <span>Discount</span>
                  <span className="text-blue">-&#8377;{cart?.discount}</span>
                </div>
                <div className="flex justify-between pt-3 text-black">
                  <span>Delivery Charge</span>
                  <span className="text-blue">Free</span>
                </div>
                <div className="flex justify-between font-semibold pt-3 text-black">
                  <span>Total Amount</span>
                  <span className="text-green">
                    &#8377;{cart?.totalDiscountedPrice}
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full bg-color my-3 rounded-lg p-2 text-white font-semibold"
            >
              CHECKOUT
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
