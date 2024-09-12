import PropTypes from "prop-types";
import { useNavigate } from "react-router";
import { useEffect } from "react";

export default function ProductCard({ product }) {
  const navigate = useNavigate();

  const truncateDescription = (description, maxWords) => {
    const words = description.split(" ");
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(" ") + "...";
    }
    return description;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      onClick={() => navigate(`/product/${product?._id}`)}
      className="flex font-Poppins lg:flex-col justify-center items-center border  shadow-lg rounded-2xl bg-white m-2 cursor-pointer transition-all duration-300 hover:scale-105"
    >
      <div className="w-[200px] h-[200px] flex justify-center items-center">
        <img src={product.imageUrl} alt="" className="w-full pt-2 pl-2 pr-2" />
      </div>
      <div className="flex flex-col text-[12px] md:text-base w-full pb-3 pr-3 pl-3">
        <p className="uppercase text-color font-semibold py-2">
          {product.brand}
        </p>
        <p className="break-words lg:w-[250px] text-gray">
          {truncateDescription(product.description, 18)}
        </p>
        <div className="flex lg:px-2 font-semibold justify-between pt-4">
          <p className="text-black text-sm md:text-base">
            &#8377;{product.discountedPrice}
          </p>
          <p className="text-sm md:text-base line-through text-lightgray">
            &#8377;{product.price}
          </p>
          <p className="text-sm md:text-base text-green">
            {product.discountPercentage}% off
          </p>
        </div>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    brand: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    discountedPrice: PropTypes.number.isRequired,
    discountPercentage: PropTypes.number.isRequired,
  }).isRequired,
};
