import Cookies from "js-cookie";
import Logo from "./Logo";
import { NavLink, useNavigate } from "react-router-dom";
import { MdOutlineSearch, MdMenu, MdClose } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchProducts } from "../../../services/productApi";
import { getOrderHistory } from "../../../services/orderApi";

export default function PageNav() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [values, setValues] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { customer } = useSelector((state) => state.auth);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleChange = (e) => {
    setValues(() => e.target.value);
  };

  const handleSearch = () => {
    if (values.trim()) {
      dispatch(searchProducts(values.trim(), navigate));
      setValues("");
    }
  };

  const handleOrderHistory = () => {
    dispatch(getOrderHistory(navigate))
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("customer");
    Cookies.set("accessToken", "", {
      sameSite: "none",
      expires: 0,
      secure: true,
    });
    navigate("/");
    window.location.reload();
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMenuOpen &&
        !event.target.closest("#side-menu") &&
        !event.target.closest("#menu-icon")
      ) {
        closeMenu();
      }
      if (
        isDropdownOpen &&
        !event.target.closest("#dropdown") &&
        !event.target.closest(".avatar")
      ) {
        setIsDropdownOpen(false); // Close the dropdown when clicked outside
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isMenuOpen, isDropdownOpen]);

  return (
    <nav className="flex justify-between font-Poppins py-3 px-4 md:px-10 bg-pearl w-full relative items-center">
      <Logo />
      <form className="flex gap-3 relative">
        <input
          type="text"
          name="search"
          value={values}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Search"
          className="placeholder:text-gray block bg-white w-[200px] sm:w-[250px] md:w-[350px] lg:w-[500px] h-8 sm:h-8 md:h-10 border border-gray rounded-lg pl-5 focus:ring-color focus:border-color pr-3 shadow-sm focus:outline-none self-center"
        />
        <MdOutlineSearch
          onClick={handleSearch}
          className="absolute right-0 self-center w-10 sm:w-12 md:w-16 lg:w-20 h-8 sm:h-8 md:h-10 bg-color cursor-pointer p-2 rounded-r-md text-white"
        />
      </form>

      <div className="flex items-center justify-center gap-1 md:hidden">
        {customer !== null ? (
          <div className="bg-color rounded-full mt-4 text-white font-semibold w-8 h-8 flex justify-center items-center mb-4 avatar">
            <p>{customer?.firstName[0].toUpperCase()}</p>
          </div>
        ) : (
          <></>
        )}
        <MdMenu
          onClick={toggleMenu}
          className="text-white w-8 h-8 cursor-pointer"
          id="menu-icon"
        />
      </div>

      <div className="hidden md:flex gap-4 items-center">
        {customer !== null ? (
          <>
            <div className="relative">
              <div
                className="bg-color rounded-full mt-4 text-white font-semibold w-8 h-8 flex justify-center items-center mb-4 cursor-pointer avatar"
                onClick={toggleDropdown}
              >
                <p>{customer?.firstName[0].toUpperCase()}</p>
              </div>
              {isDropdownOpen && (
                <div
                  className="absolute z-10 -right-12 top-12 mt-2 w-36 text-center bg-white shadow-lg rounded-lg"
                  id="dropdown"
                >
                  <h3
                    onClick={handleOrderHistory}
                    className="font-semibold text-sm uppercase hover:cursor-pointer hover:text-color hover:bg-blue hover:bg-opacity-15 p-2 rounded-lg"
                  >
                    Order History
                  </h3>
                  <h3
                    type="submit"
                    onClick={handleLogout}
                    className="font-semibold text-sm uppercase hover:cursor-pointer hover:text-color hover:bg-blue hover:bg-opacity-15 p-2 rounded-lg"
                  >
                    Logout
                  </h3>
                </div>
              )}
            </div>
            <NavLink to="/cart" className="relative">
              <FaShoppingCart className="w-7 h-7 text-white cursor-pointer hover:text-color transition ease-linear duration-100" />
            </NavLink>
          </>
        ) : (
          <div className="space-x-4">
            <NavLink to="/signup">
              <button className="text-white w-16 py-2 rounded-lg text-md font-semibold hover:text-color transition ease-linear duration-100 uppercase">
                Signup
              </button>
            </NavLink>
            <NavLink to="/login">
              <button className="text-white w-16 py-2 rounded-lg text-md font-semibold hover:text-color transition ease-linear duration-100 uppercase">
                Login
              </button>
            </NavLink>
          </div>
        )}
      </div>

      <div
        id="side-menu"
        className={`${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } fixed top-0 right-0 h-full w-56 bg-smoke shadow-md z-50 transform transition-transform duration-500 ease-in-out`}
      >
        <div className="p-5">
          <MdClose
            onClick={closeMenu}
            className="text-gray-700 w-8 h-8 cursor-pointer mb-4"
          />
          {customer !== null ? (
            <>
              <NavLink
                to="/cart"
                className="relative flex justify-center mb-4 text-white w-full py-2 rounded-lg text-md font-semibold bg-color hover:bg-opacity-80 transition ease-in duration-100 uppercase"
              >
                Cart
              </NavLink>
              <button
                onClick={handleOrderHistory}
                className="relative flex justify-center mb-4 text-white w-full py-2 rounded-lg text-md font-semibold bg-color hover:bg-opacity-80 transition ease-in duration-100 uppercase"
              >
                Order History
              </button>
              <button
                type="submit"
                onClick={handleLogout}
                className="text-white w-full py-2 rounded-lg text-md font-semibold bg-color hover:bg-opacity-80 transition ease-in duration-100 uppercase"
              >
                Logout
              </button>
            </>
          ) : (
            <div className="flex-col flex space-y-4">
              <NavLink to="/signup">
                <button className="text-white w-full py-2 rounded-lg text-md font-semibold bg-color hover:bg-opacity-80 transition ease-in duration-100 uppercase">
                  Signup
                </button>
              </NavLink>
              <NavLink to="/login">
                <button className="text-white w-full py-2 rounded-lg text-md font-semibold bg-color hover:bg-opacity-80 transition ease-in duration-100 uppercase">
                  Login
                </button>
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
