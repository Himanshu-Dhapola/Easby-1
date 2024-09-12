import { toast } from "react-hot-toast";
import {
  setCart,
  setCartItems,
  setLoading,
  clearCart,
} from "../Feature/Slices/cartSlice";
import axios from "axios"


export function getCartItem() {
  return async (dispatch) => {
    const token = localStorage?.getItem("accessToken")
    try {
      const response = await axios.get(`https://easby-server.vercel.app/api/v1/cart`,
      {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      dispatch(setCart(response.data.data));
      dispatch(setCartItems(response.data.data.cartItem));
    } catch (error) {
      toast.error(error.response.data.message, {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    }
  };
}

export function addItemToCart(cartData) {
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
     if (token) {
        const response = await axios.put(
        `https://easby-server.vercel.app/api/v1/cart/add`,
        cartData, 
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        if (!response.data.success) {
          throw new Error(response.data.message);
        }
      }
      dispatch(getCartItem());
      toast.success("Product added to cart", {
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
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function removeCartItem(cartItemId) {
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
      const response = await axios.delete(
        `https://easby-server.vercel.app/api/v1/cart_items/${cartItemId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      dispatch(getCartItem());
      toast.success("Cart item removed", {
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
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function updateCartItem(cartData) {
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
      const response = await axios.put(
        `https://easby-server.vercel.app/api/v1/cart_items/${cartData.cartItemId}`,
        cartData,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      dispatch(getCartItem());
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

export function emptyCart() {
  return async (dispatch) => {
    const token = localStorage?.getItem("accessToken");
    try {
      const response = await axios.post(`https://easby-server.vercel.app/api/v1/cart/empty-cart`,{},
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          });
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      dispatch(clearCart());
    } catch (error) {
      toast.error(error.response.data.message, {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    }
  };
}
