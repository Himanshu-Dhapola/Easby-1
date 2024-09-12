import PropTypes from "prop-types";
import { RiDeleteBin6Line } from "react-icons/ri";
import { LuPlusCircle, LuMinusCircle } from "react-icons/lu";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router";
import { removeCartItem, updateCartItem } from "../../../services/cartApi";
import { useState, useEffect } from "react";

export default function CartItem({ item }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const [wordLimit, setWordLimit] = useState(20);
  const querySearch = new URLSearchParams(location.search);
  const step = querySearch.get("step");

  useEffect(() => {
    const handleResize = () => {
      setWordLimit(window.innerWidth < 768 ? 20 : 30);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleCartItemQuantity = (num) => {
    const data = {
      quantity: item.quantity + num,
      cartItemId: item._id,
    };
    if (data.quantity > 0) {
      dispatch(updateCartItem(data));
    }
  };

  const handleRemoveCartItem = () => {
    dispatch(removeCartItem(item._id));
  };

  const truncateDescription = (description) => {
    if (typeof description !== "string") {
      return ""; 
    }

    const words = description.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return description;
  };


  return (
    <div className="p-3 md:p-5 shadow-lg border rounded-lg m-5 bg-white font-Poppins">
      <div className="flex items-center">
        <div className="w-[15rem] md:w-[40rem]">
          <img
            src={item.product?.imageUrl}
            alt=""
            className="w-full h-full object-contain object-center"
          />
        </div>
        <div className="ml-5 space-y-1 text-[8px] sm:text-[10px] md:text-base">
          <p className="font-semibold">{item.product?.title}</p>
          <p>{truncateDescription(item.product?.description)}</p>
          <p className="text-[10px] md:text-base">
            Size/Variety: <span>{item.size}</span>{" "}
            <span className="uppercase text-[10px] md:text-base">
              {item.product?.color}
            </span>
          </p>
          <p>
            Brand:{" "}
            <span className="uppercase text-[10px] md:text-base">
              {item.product?.brand}
            </span>
          </p>
          <div className="md:text-base text-[10px] sm:px-5 font-semibold tracking-tight flex justify-between space-x-8">
            <p className="text-black">&#8377;{item.discountedPrice}</p>
            <p className="text-gray line-through">&#8377;{item.price}</p>
            <p className="text-green">
              {item.product?.discountPercentage}% off
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-start md:flex-row md:items-start md:space-x-4 pt-3">
        <div className="flex items-center space-x-2 md:space-x-5 pl-3 sm:pl-5 text-[12px] md:text-xl">
          {step !== "3" && (
            <>
              <LuMinusCircle
                className="text-blue cursor-pointer"
                onClick={() => handleCartItemQuantity(-1)}
                disabled={item.quantity <= 1}
              />
              <span className="border font-semibold px-4 rounded-md text-center">
                {item.quantity}
              </span>
              <LuPlusCircle
                className="text-blue cursor-pointer"
                onClick={() => handleCartItemQuantity(1)}
              />
              <RiDeleteBin6Line
                className="text-color cursor-pointer text-[12px] md:text-xl"
                onClick={handleRemoveCartItem}
              />
            </>
          )}
          {step === "3" && (
            <span className="border text-xs md:text-lg md:ml-7 font-semibold px-2 rounded-md text-center">
              Quantity: {item.quantity}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

CartItem.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    product: PropTypes.shape({
      imageUrl: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
      brand: PropTypes.string.isRequired,
      discountPercentage: PropTypes.number.isRequired,
    }).isRequired,
    size: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    discountedPrice: PropTypes.number.isRequired,
  }).isRequired,
};
