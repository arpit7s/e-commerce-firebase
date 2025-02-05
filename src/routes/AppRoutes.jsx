import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import Products from "../Pages/Products";
import Register from "../Pages/Register";
import Login from "../Pages/Login";
import ProductDetails from "../Pages/ProductDetails";
import Profile from "../Pages/Profile";
import ProtectedRoutes from "../utlis/ProtectedRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PageNotFound from "../Pages/PageNotFound";
import Cart from "../Pages/Cart";
import SearchPage from "../Pages/SearchPage";
import Checkout from "../Pages/Checkout";
import PaymentForm from "../Pages/PaymentForm";

const AppRoutes = () => {
  return (
    <>


      <Routes>
        <Route path="/" element={<Home />} />

        <Route element={<ProtectedRoutes />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
        </Route>

        {/* <Route path="/products" element={<Products />} /> */}
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/payment" element={<PaymentForm />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </>
  );
};

export default AppRoutes;
