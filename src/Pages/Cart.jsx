import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, incrementQuantity, decrementQuantity } from "../store/cartSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  let navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const dispatch = useDispatch();

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
    toast.success("Item removed from cart!");
  };

  const handleIncrement = (id) => {
    dispatch(incrementQuantity(id));
    toast.info("Item quantity increased!");
  };

  const handleDecrement = (id) => {
    dispatch(decrementQuantity(id));
    toast.info("Item quantity decreased!");
  };

    return (
      <div className="mt-4 sm:mt-10 bg-gray-100 py-6 px-4 sm:px-6 lg:px-8">
        <ToastContainer />
        <div className="max-w-7xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden flex flex-col lg:flex-row">
          {/* Left Section: Cart Items */}
          <div className="flex-1 px-4 sm:px-6 py-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-center py-4 sm:py-6 border-b">
              Your Shopping Cart
            </h2>
            <p className="text-base sm:text-lg text-gray-600 mb-4">Total Items: {totalQuantity}</p>
  
            {cartItems.length === 0 ? (
              <p className="text-center text-gray-400 mt-6 sm:mt-8">Your cart is empty. Start shopping now!</p>
            ) : (
              <ul className="space-y-4 sm:space-y-6">
                {cartItems.map((item) => (
                  <li key={item.id} className="flex flex-col sm:flex-row items-center sm:space-x-6 border-b pb-4 sm:pb-6">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-md shadow-lg"
                    />
                    <div className="flex-1 mt-4 sm:mt-0 text-center sm:text-left">
                      <p className="text-lg sm:text-xl text-gray-800 font-semibold">{item.title}</p>
                      <p className="text-sm sm:text-base text-gray-600 mt-1 sm:mt-2">
                        ${item.price.toFixed(2)} x {item.quantity} ={" "}
                        <span className="font-bold text-gray-800">${(item.price * item.quantity).toFixed(2)}</span>
                      </p>
                    </div>
  
                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={() => handleDecrement(item.id)}
                          disabled={item.quantity === 1}
                          className={`w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-lg text-gray-800 hover:bg-gray-300 ${
                            item.quantity === 1 && "opacity-50 cursor-not-allowed"
                          }`}
                        >
                          -
                        </button>
                        <span className="text-lg font-medium text-gray-800">{item.quantity}</span>
                        <button
                          onClick={() => handleIncrement(item.id)}
                          className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-lg text-gray-800 hover:bg-gray-300"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => handleRemove(item.id)}
                        className="bg-red-500 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-md hover:bg-red-600 focus:outline-none text-sm sm:text-base"
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
  
          {/* Right Section: Order Summary */}
          <div className="w-full lg:w-1/3 bg-gray-50 p-4 sm:p-6 border-t lg:border-t-0 lg:border-l mt-4 sm:mt-6 lg:mt-0">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">Order Summary</h3>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex justify-between text-base sm:text-lg text-gray-700">
                <p>Total Items</p>
                <p>{totalQuantity}</p>
              </div>
              <div className="flex justify-between text-base sm:text-lg text-gray-700">
                <p>Subtotal</p>
                <p>${totalPrice.toFixed(2)}</p>
              </div>
              <div className="flex justify-between text-base sm:text-lg text-gray-700">
                <p>Shipping</p>
                <p>${totalPrice > 50 ? "Free" : "5.99"}</p>
              </div>
              <div className="flex justify-between text-lg sm:text-xl font-bold text-gray-800">
                <p>Total</p>
                <p>${(totalPrice + (totalPrice > 50 ? 0 : 5.99)).toFixed(2)}</p>
              </div>
            </div>
            <div className="mt-4 sm:mt-6">
              <button
                onClick={() => navigate('/checkout')}
                disabled={cartItems.length === 0}
                className={`w-full py-2 sm:py-3 text-lg sm:text-xl text-white rounded-md focus:outline-none ${
                  cartItems.length === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

export default Cart;