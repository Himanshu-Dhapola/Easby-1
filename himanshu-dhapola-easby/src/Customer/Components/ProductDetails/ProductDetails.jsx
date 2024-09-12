import { useEffect, useState } from "react";
import { Radio, RadioGroup } from "@headlessui/react";
import { useNavigate, useParams } from "react-router";
import { findProductById } from "../../../services/productApi";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../../../services/cartApi";
import ProductCard from "../../../Customer/Components/Product/ProductCard";
import axios from "axios";
import PageNav from "../Navigation/PageNav";
import Footer from "../Footer/Footer";

export default function ProductDetails() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { product } = useSelector((state) => state.product);
  const id = useParams();
  const [selectedSize, setSelectedSize] = useState(null);
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
  }

  const handleAddToCart = () => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    } else {
      if (!selectedSize) {
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 4000);
      } else {
        const data = {
          productId: id.productId,
          size: selectedSize.name,
        };
        dispatch(addItemToCart(data));
        navigate("/cart");
      }
    }
  };

  useEffect(() => {
    dispatch(findProductById(id));
    const fetchRecommendations = async () => {
      try {
        const response = await axios.get(
          `https://easby-recommendation-server.vercel.app/recommend/${id.productId}`
        );
        setRecommendedProducts(response.data);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      }
    };
    fetchRecommendations();
    window.scrollTo(0, 0);
  }, [id.productId, dispatch]);

  return (
    <div className="bg-white font-Poppins">
      <PageNav />
      {showPopup && (
        <div
          className={`fixed top-4 left-0 right-0 z-50 flex justify-center transition-transform duration-300 ${
            showPopup
              ? "translate-y-0 opacity-100"
              : "-translate-y-full opacity-0"
          }`}
        >
          <div className="text-white bg-[#333] p-3 rounded-lg shadow-lg mt-2 transition-opacity duration-300">
            <p className="text-lg font-semibold">Select a Size/Model</p>
          </div>
        </div>
      )}

      <div className="pt-6 pb-10 flex flex-col lg:flex-row justify-center items-center">
        <div className=" md:ml-10 mt-6 w-[200px] md:w-[450px] sm:px-6 rounded-lg lg:block">
          <img
            alt={product?.imageUrl}
            src={product?.imageUrl}
            className="w-full object-contain h-full object-center"
          />
        </div>

        <div className="ml-3 my-10 px-4 pb-1 flex-col flex justify-center lg:items-start">
          <div className="md:w-[600px] lg:col-span-2">
            <h1 className="text-base font-bold tracking-tight text-color md:text-2xl">
              {product?.title}
            </h1>
          </div>

          <div className="py-5 lg:col-span-2 lg:col-start-1">
            <div>
              <h3 className="sr-only">Description</h3>
              <div className="space-y-6">
                <p className="text-sm md:text-base text-gray font-semibold sm:w-[600px]">
                  {product?.description}
                </p>
              </div>
            </div>
          </div>

          <div className="lg:row-span-3">
            <h2 className="sr-only">Product information</h2>
            <div className="text-base lg:w-[550px] md:text-2xl flex justify-around">
              <p className="text-black">&#8377;{product?.discountedPrice}</p>
              <p className="text-gray line-through">&#8377;{product?.price}</p>
              <p className="text-green">{product?.discountPercentage}% off</p>
            </div>

            <form className="mt-3">
              <div className="flex">
                <h3 className="md:text-lg text-sm font-medium text-gray">
                  Color:{" "}
                  <span className=" uppercase font-semibold text-black">
                    {product?.color}
                  </span>
                </h3>
              </div>

              <div className="mt-3">
                <div className="flex items-center justify-between">
                  <h3 className="md:text-lg text-sm font-medium text-gray">
                    Size/Variety:
                  </h3>
                </div>

                <fieldset aria-label="Choose a size" className="mt-4">
                  <RadioGroup
                    value={selectedSize}
                    onChange={setSelectedSize}
                    className="grid gap-4 grid-cols-4"
                  >
                    {product?.size.map((size) => (
                      <Radio
                        key={size.name}
                        value={size}
                        className={classNames(
                          "cursor-pointer font-bold bg-white text-black shadow-sm group relative flex items-center justify-center rounded-md border p-3 md:px-4 md:py-3 text-xs md:text-base uppercase hover:bg-lightgray focus:outline-none data-[focus]:ring-2 data-[focus]:ring-blue sm:flex-1"
                        )}
                      >
                        <span className="z-10">{size.name}</span>
                        <span
                          aria-hidden="true"
                          className="pointer-events-none absolute -inset-px rounded-md border-2 border-transparent group-data-[focus]:border group-data-[checked]:border-blue group-data-[checked]:bg-lightgray"
                        />
                      </Radio>
                    ))}
                  </RadioGroup>
                </fieldset>
              </div>

              <button
                onClick={handleAddToCart}
                type="button"
                className="mt-10 uppercase font-semibold flex w-full items-center justify-center rounded-md border border-transparent bg-color px-8 py-3 text-base text-white hover:bg-color hover:scale-110 transition-all ease-in duration-200"
              >
                Add to Cart
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 bg-smoke gap-y-10 pb-10">
        <div className="lg:col-span-3 w-full">
          <h1 className="text-xl md:text-3xl uppercase font-bold pt-10 text-center pl-10 my-6 tracking-tight text-color">
            Recommended for You
          </h1>
          <div className="flex flex-wrap justify-center py-5">
            {recommendedProducts.map((item, index) => (
              <ProductCard product={item} key={index} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
