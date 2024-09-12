import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerCustomer } from "../../../services/authApi";
import { toast } from "react-hot-toast";

export default function Signup() {
  const [eye, setEye] = useState(false);
  const navigate = useNavigate();
  const [customerDetails, setCustomerDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerDetails((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const dispatch = useDispatch();

  const handleRegister = (e) => {
    e.preventDefault();
    
    if (!customerDetails.email.endsWith("@gmail.com")) {
      toast.error(
        "Enter valid Email",
        {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        }
      );
      setCustomerDetails({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      });
      return;
    }

    if (customerDetails.password.length < 6) {
      toast.error("Create a Strong Password With length greater than 6", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      return;
    }

    dispatch(registerCustomer(customerDetails, navigate));
    setCustomerDetails({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    });
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-smoke font-Poppins">
      <div className="w-[330px] h-[300px] md:w-[500px] md:h-[450px] rounded-lg shadow-2xl bg-white flex flex-col justify-start items-center">
        <h2 className="text-lg font-semibold md:text-3xl text-color p-4 md:p-8 md:mt-5">
          Signup as a New Customer
        </h2>
        <form className="flex flex-col justify-center items-center space-y-4">
          <div className="flex flex-row gap-[10px]">
            <input
              type="text"
              name="firstName"
              value={customerDetails.firstName}
              onChange={handleChange}
              autoComplete="name"
              required
              placeholder="First Name*"
              className="placeholder:text-slate-400 block bg-white w-[135px] h-8 md:w-[170px] md:h-10 border border-slate-300 rounded-lg pl-5 focus:ring-color focus:border-color pr-3 shadow-sm focus:outline-none self-center"
            />
            <input
              type="text"
              name="lastName"
              value={customerDetails.lastName}
              onChange={handleChange}
              autoComplete="name"
              required
              placeholder="Last Name*"
              className="placeholder:text-slate-400 block bg-white w-[135px] h-8 md:w-[170px] md:h-10 border border-slate-300 rounded-lg pl-5 focus:ring-color focus:border-color pr-3 shadow-sm focus:outline-none self-center"
            />
          </div>
          <input
            type="email"
            name="email"
            value={customerDetails.email}
            onChange={handleChange}
            autoComplete="email"
            required
            placeholder="Email*"
            className="placeholder:text-slate-400 block bg-white w-[280px] h-8 md:w-[350px] md:h-10 border border-slate-300 rounded-lg pl-5 focus:ring-color focus:border-color pr-3 shadow-sm focus:outline-none self-center"
          />
          <div className="relative">
            <input
              type={eye ? "text" : "password"}
              name="password"
              value={customerDetails.password}
              onChange={handleChange}
              autoComplete="current-password"
              required
              placeholder="Password*"
              className="placeholder:text-slate-400 block bg-white w-[280px] h-8 md:w-[350px] md:h-10 border border-slate-300 rounded-lg pl-5 focus:ring-color focus:border-color pr-3 shadow-sm focus:outline-none self-center"
            />
            {eye ? (
              <FaEyeSlash
                onClick={() => setEye(false)}
                className="absolute right-3 bottom-2 md:right-4 md:bottom-3 text-lg hover:text-color cursor-pointer transition-all duration-300 ease-out"
              />
            ) : (
              <FaEye
                onClick={() => setEye(true)}
                className="absolute right-3 bottom-2 md:right-4 md:bottom-3 text-lg hover:text-color cursor-pointer transition-all duration-300 ease-out"
              />
            )}
          </div>
        </form>
        <button
          onClick={handleRegister}
          className="bg-color uppercase text-white w-[280px] md:w-[350px] px-8 md:py-3 py-2 mt-4 md:mt-8 rounded-lg text-xl font-semibold hover:scale-110 transition-all ease-in duration-200"
        >
          Signup
        </button>
        <div className="flex justify-center gap-5 w-full mt-3 md:mt-5 text-sm md:text-base font-Poppins ">
          <p className=" font-semibold">if you already have account?</p>
          <NavLink to="/login">
            <button className="text-color font-bold uppercase">Login</button>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
