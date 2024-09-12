import axios from "axios";
import { toast } from "react-hot-toast";
import { setOrder, setOrders, setLoading } from "../Feature/Slices/orderSlice";

export function createOrder({ customerAddress, navigate }) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...", {
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
    dispatch(setLoading(true));
    const token = localStorage?.getItem("accessToken");
    try {
      const response = await axios.post(
        `https://easby-server.vercel.app/api/v1/order`,
        customerAddress,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      if (response.data.data._id) {
        navigate({ search: `step=3&order_id=${response.data.data._id}` });
      }
      dispatch(setOrder(response.data.data));
    } catch (error) {
      toast.error(error.response.data.message, {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export async function getAllOrders() {
  const toastId = toast.loading("Loading...", {
    style: {
      borderRadius: "10px",
      background: "#333",
      color: "#fff",
    },
  });
  let result = {};
  const token = localStorage?.getItem("accessToken");
  try {
    const response = await axios.get(`https://easby-server.vercel.app/api/v1/order/`, {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    });
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    result = response.data.data;
    toast.success("fetched all orders", {
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
  } catch (error) {
    toast.error(error.response.data.message, {
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
  }
  toast.dismiss(toastId);
  return result;
}

export function getOrderById(orderId) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...", {
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
    dispatch(setLoading(true));
    const token = localStorage?.getItem("accessToken");
    try {
      const response = await axios.get(
        `https://easby-server.vercel.app/api/v1/order/${orderId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      dispatch(setOrder(response.data.data));
    } catch (error) {
      toast.error(error.response.data.message, {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function getOrderHistory(navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...", {
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
    dispatch(setLoading(true));
    const token = localStorage?.getItem("accessToken");
    try {
      const response = await axios.get(
        `https://easby-server.vercel.app/api/v1/order_history`,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      dispatch(setOrders(response.data.data));
      navigate("/order-history");
    } catch (error) {
      toast.error(error.response.data.message, {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}
