import AddressCard from "../AddressDetails/AddressCard";
import CartItem from "./CartItem";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getOrderById } from "../../../services/orderApi";
import { useLocation } from "react-router";
import { useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios"

export default function OrderSummary() {
  const dispatch = useDispatch();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const { order } = useSelector((state) => state.order);
  const { cart } = useSelector((state) => state.cart);
  const orderId = searchParams.get("order_id");

  useEffect(() => {
    dispatch(getOrderById(orderId));
  }, [orderId]);

  const handlePayment = async () => {
    const token = localStorage?.getItem("accessToken");
    const stripe = await loadStripe(import.meta.env.VITE_PUBLISHABLE_KEY);
    const body = { product: cart };
    const response = await axios.post(`https://himanshu-dhapola-easby-server.onrender.com/api/v1/payment`, body,
      {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
    const session = response.data;
    const result = stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.log("Error: ", result.error);
    }
  };

  return (
    <div className="space-y-5 pb-5 font-Poppins">
      <div>
        <AddressCard address={order?.shippingAddress} />
      </div>
      <div>
        <div className="bg-smoke">
          <div className="lg:grid grid-cols-3 lg:px-16 relative">
            <div className="col-span-2">
              {order?.orderItems.map((item, index) => (
                <CartItem item={item} key={index} />
              ))}
            </div>
            <div className="px-5 sticky top-0 h-[100h] mt-5 lg:mt-5">
              <div className="bg-white border rounded-lg p-3">
                <p className="text-black font-semibold">Price Details</p>
                <div>
                  <div className="flex justify-between pt-3 text-black">
                    <span>Price</span>
                    <span>&#8377;{order?.totalPrice}</span>
                  </div>
                  <div className="flex justify-between pt-3 text-black">
                    <span>Discount</span>
                    <span className="text-blue">-&#8377;{order?.discount}</span>
                  </div>
                  <div className="flex justify-between pt-3 text-black">
                    <span>Delivery Charge</span>
                    <span className="text-blue">Free</span>
                  </div>
                  <div className="flex justify-between font-semibold pt-3 text-black">
                    <span>Total Amount</span>
                    <span className="text-green">
                      &#8377;{order?.totalDiscountedPrice}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={handlePayment}
                className="w-full bg-color mt-3 rounded-lg p-2 text-white font-semibold"
              >
                CHECKOUT
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
