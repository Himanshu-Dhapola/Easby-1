import PropTypes from "prop-types";

export default function OrderHistoryCard({ item }) {
  return (
    <div className=" p-2 md:p-5 shadow-lg border rounded-lg m-2 md:m-10 bg-white font-Poppins">
      <div className="grid grid-cols-2 space-y-3 mb-4 lg:flex lg:justify-between">
        <div className="flex justify-center items-center">
          <h1 className="text-xs md:text-xl mt-4 font-semibold text-blue">
            Date: {new Date(item?.orderDate).toLocaleDateString()}
          </h1>
        </div>
        <div className="flex justify-center items-center">
          <h1 className="text-xs md:text-xl font-semibold">
            Total Quantity: {item?.totalItem}
          </h1>
        </div>
        <div className="flex justify-center items-center">
          <h1 className="text-xs md:text-xl font-semibold text-color">
            Total Price: &#8377;{item?.totalDiscountedPrice}
          </h1>
        </div>
        <div className="flex justify-center items-center">
          <h1 className="text-xs md:text-xl font-semibold bg-green bg-opacity-20 rounded-md px-2 mb-1 text-green">
            Order Placed
          </h1>
        </div>
      </div>
      <div>
        {item?.orderItems?.map((card, ind) => (
          <div key={ind} className="flex items-center border-t md:py-5">
            <div className="w-[350px] h-[200px] mr-2">
              <img
                className="w-full h-full object-contain object-center"
                src={card?.product?.imageUrl}
                alt={card?.product?.title}
              />
            </div>
            <div className="flex p-2 flex-col space-y-2">
              <span className="text-black text-xs md:text-xl font-semibold">
                Brand: {card?.product?.brand}
              </span>
              <span className="text-color text-xs md:text-xl font-semibold">
                {card?.product?.title}
              </span>
              <span className="hidden md:block md:text-xl">
                {card?.product?.description}
              </span>

              <div className="grid grid-cols-2 space-y-2 lg:flex lg:justify-between">
                <div className="flex justify-start items-center">
                  <h1 className="text-xs md:text-xl mt-2 font-semibold text-black">
                    &#8377;{card?.product?.discountedPrice}
                  </h1>
                </div>
                <div className="flex justify-center items-center">
                  <h1 className="text-xs md:text-xl text-gray line-through font-semibold">
                    &#8377;{card?.product?.price}
                  </h1>
                </div>
                <div className="flex justify-start items-center">
                  <h1 className="text-xs md:text-xl font-semibold text-black">
                    {card?.product?.discountPercentage}% off
                  </h1>
                </div>
                <div className="flex justify-center items-center">
                  <h1 className="text-xs md:text-xl font-semibold rounded-md px-2 mb-1 text-green">
                    Qty: {card?.quantity}
                  </h1>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

OrderHistoryCard.propTypes = {
  item: PropTypes.shape({
    orderDate: PropTypes.string.isRequired,
    totalItem: PropTypes.number.isRequired,
    totalDiscountedPrice: PropTypes.number.isRequired,
    orderItems: PropTypes.arrayOf(
      PropTypes.shape({
        quantity: PropTypes.number.isRequired,
        product: PropTypes.shape({
          imageUrl: PropTypes.string.isRequired,
          title: PropTypes.string.isRequired,
          brand: PropTypes.string.isRequired,
          description: PropTypes.string.isRequired,
          price: PropTypes.number.isRequired,
          discountedPrice: PropTypes.number.isRequired,
          discountPercentage: PropTypes.number.isRequired,
        }).isRequired,
      }).isRequired
    ).isRequired,
  }).isRequired,
};
