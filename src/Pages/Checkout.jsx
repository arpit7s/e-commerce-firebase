import React from "react";
import { useNavigate } from "react-router-dom";
import { toast} from "react-toastify";
export default function Checkout() {

    let navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    toast.info(" Your order saved!");
    navigate("/payment");
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-12">
      <div className="bg-white shadow-md rounded p-6 w-full max-w-md mt-10">
        <h2 className="text-2xl font-bold mb-4 text-center">Checkout</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Full Name
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter your name"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Address
            </label>
            <textarea
              className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
              rows="4"
              placeholder="Enter your address"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
}
