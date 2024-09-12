import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginCustomer } from "../../../services/authApi";

export default function Login() {
  const [eye, setEye] = useState(false);
  const navigate = useNavigate();
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginDetails((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginCustomer(loginDetails, navigate));
    setLoginDetails({
      email: "",
      password: "",
    });
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-smoke font-Poppins">
      <div className="w-[330px] h-[300px] md:w-[500px] md:h-[450px] bg-white rounded-lg shadow-2xl flex flex-col justify-start items-center ">
        <h2 className="text-lg font-semibold md:text-3xl text-color p-6 md:p-8 md:mt-5">
          Login To Your Account
        </h2>
        <form className="flex flex-col justify-center items-center space-y-4">
          <input
            type="email"
            name="email"
            value={loginDetails.email}
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
              value={loginDetails.password}
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
                className="absolute  right-3 bottom-2 md:right-4 md:bottom-3 text-lg hover:text-color cursor-pointer transition-all duration-300 ease-out"
              />
            )}
          </div>
        </form>
        <button
          onClick={handleLogin}
          className="bg-color uppercase text-white w-[280px] md:w-[350px] px-8 md:py-3 py-2 mt-4 md:mt-8 rounded-lg text-xl font-semibold hover:scale-110 transition-all ease-in duration-200"
        >
          Login
        </button>
        <div className="flex justify-center gap-5 text-sm md:text-base w-full mt-5 font-Poppins ">
          <p className=" font-semibold">if you don&apos;t have account?</p>
          <NavLink to="/signup">
            <button className="text-color font-bold uppercase">Signup</button>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
