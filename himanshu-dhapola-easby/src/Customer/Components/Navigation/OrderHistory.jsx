import { useSelector } from "react-redux";
import OrderHistoryCard from "./OrderHistoryCard";

export default function OrderHistory() {
  const { orders } = useSelector((state) => state.order);

  return (
    <div className="bg-smoke min-h-screen font-Poppins py-5">
      <h1 className="text-center uppercase text-color font-bold text-2xl md:text-4xl">
        Order History
      </h1>
      <div>
        {orders && orders.length > 0 ? (
          orders.map((item, index) => (
            <OrderHistoryCard item={item} key={index} />
          ))
        ) : (
          <div className="text-center uppercase text-black text-xl md:text-3xl mt-5 font-semibold">
            No Orders Placed Yet
          </div>
        )}
      </div>
    </div>
  );
}
