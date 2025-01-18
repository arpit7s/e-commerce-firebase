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
    <div className="mt-8 bg-white shadow p-20 rounded-lg max-w-4xl mx-auto text-center">
      <ToastContainer />
      <h2 className="text-2xl font-bold border-b pb-4">Your Cart</h2>
      <p className="text-gray-500 mt-2">Total Items: {totalQuantity}</p>

      {cartItems.length === 0 ? (
        <p className="text-gray-500 mt-4">Your cart is empty.</p>
      ) : (
        <ul className="mt-6 space-y-6">
          {cartItems.map((item) => (
            <li key={item.id} className="flex items-center space-x-4 border-b pb-4">

              {/* Product Details */}
              <div className="flex-1">
                <p className="text-gray-500">
                  ${item.price.toFixed(2)} x {item.quantity} ={" "}
                  <span className="font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                </p>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleDecrement(item.id)}
                  disabled={item.quantity === 1}
                  className={`px-2 py-1 rounded-lg bg-gray-200 hover:bg-gray-300 ${
                    item.quantity === 1 && "opacity-50 cursor-not-allowed"
                  }`}
                >
                  -
                </button>
                <span className="px-4 py-1 border rounded-lg">{item.quantity}</span>
                <button
                  onClick={() => handleIncrement(item.id)}
                  className="px-2 py-1 rounded-lg bg-gray-200 hover:bg-gray-300"
                >
                  +
                </button>
              </div>

              {/* Remove Button */}
              <button
                onClick={() => handleRemove(item.id)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
      <div>
        <button
          onClick={() => navigate('/checkout')}
          disabled={cartItems.length === 0}
          className={`w-full py-2 px-4 text-white ${cartItems.length === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} rounded-lg focus:outline-none focus:ring focus:ring-blue-300`}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
