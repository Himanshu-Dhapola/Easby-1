import PropTypes from "prop-types";
import { categorySearch } from "../../../services/productApi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

export default function CategoryItem({ item }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCategory = (e) => {
    e.preventDefault();
    dispatch(categorySearch(item.category, navigate));
  };

  return (
    <div
      onClick={handleCategory}
      className="flex justify-evenly rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 bg-white cursor-pointer text-white font-semibold relative group font-Poppins"
    >
      <div className="z-10 absolute w-full h-full flex justify-center items-center bg-black/20 -bottom-10 group-hover:bottom-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
        <p>{item.category}</p>
      </div>
      <img
        src={item.image}
        alt=""
        className="w-[120px] h-[120px] lg:w-[180px] lg:h-[180px]"
      />
    </div>
  );
}

CategoryItem.propTypes = {
  item: PropTypes.shape({
    category: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
};
