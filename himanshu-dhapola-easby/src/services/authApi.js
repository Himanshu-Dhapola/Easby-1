import {
  setLoading,
  setCustomer,
  setAccessToken,
} from "../Feature/Slices/authSlice";
import { toast } from "react-hot-toast";
import Cookies from "js-cookie";
import axios from "axios"

export function registerCustomer(customerData, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    dispatch(setLoading(true));
    try {
      const response = await axios.post(
        `https://easby-server.vercel.app/api/v1/customer/register`,
        customerData
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Signup Successfull", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      navigate("/login");
    } catch (error) {
      toast.error(error.response.data.message, {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      navigate("/signup");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function loginCustomer(loginDetails, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    dispatch(setLoading(true));
    try {
      const response = await axios.post(
        `https://easby-server.vercel.app/api/v1/customer/login`,
        loginDetails
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Login Successfull", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      dispatch(setAccessToken(response.data.accessToken));
      dispatch(setCustomer(response.data.customer));

      Cookies.set("accessToken", response.data.accessToken, {
        sameSite: "none",
        expires: 30,
        secure: true,
      });

      localStorage.setItem(
        "accessToken",
        response.data.accessToken
      );
      localStorage.setItem("customer", JSON.stringify(response.data.customer));
      navigate("/");
    } catch (error) {
      toast.error(error.response.data.message, {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      navigate("/login");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function getCustomerDetails(accessToken, navigate) {
  return async (dispatch) => {
    const token = localStorage?.getItem("accessToken");
    try {
      const response = await axios.get(
        `https://easby-server.vercel.app/api/v1/customer/details`,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      dispatch(setAccessToken(accessToken));
      dispatch(setCustomer(response.data.data));

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("customer", JSON.stringify(response.data.data));

      navigate("/");
    } catch (error) {
      //toast.error(error.response.data.message);
    }
    dispatch(setLoading(false));
  };
}
