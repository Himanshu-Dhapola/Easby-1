import { Route, Routes } from "react-router-dom";
import HomePage from "../Pages/HomePage/HomePage";
import Product from "../Components/Product/Product";
import Cart from "../Components/Cart/Cart";
import ProductDetails from "../Components/ProductDetails/ProductDetails";
import Checkout from "../Components/Checkout/Checkout";
import Login from "../Components/Login/Login";
import Signup from "../Components/Signup/Signup";
import Success from "../Components/Payment/Success";
import Failed from "../Components/Payment/Failed";
import PrivateRoute from "./PrivateRoutes";
import OrderHistory from "../Components/Navigation/OrderHistory";

export default function CustomerRoutes() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/checkout"
          element={
            <PrivateRoute>
              <Checkout />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/success"
          element={
            <PrivateRoute>
              <Success />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/failed"
          element={
            <PrivateRoute>
              <Failed />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/order-history"
          element={
            <PrivateRoute>
              <OrderHistory />
            </PrivateRoute>
          }
        ></Route>
        <Route path="/products/search/:keyword" element={<Product />}></Route>
        <Route path="/products/category/:keyword" element={<Product />}></Route>
        <Route path="/product/:productId" element={<ProductDetails />}></Route>
      </Routes>
    </div>
  );
}
