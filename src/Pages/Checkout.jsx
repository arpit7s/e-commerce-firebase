import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaTruck, FaCreditCard, FaShieldAlt } from "react-icons/fa";

export default function Checkout() {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    toast.info("Your order has been saved!");
    navigate("/payment");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 m-5">
      <div className="max-w-7xl mx-auto">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-24">
          {/* Left Column - Checkout Form */}
          <div className="lg:col-span-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-8">Checkout</h1>

            {/* Progress Indicator */}
            <div className="mb-8">
              <nav aria-label="Progress">
                <ol className="flex items-center space-x-4 sm:space-x-8">
                  <li className="relative pr-8">
                    <div className="absolute inset-0 flex items-center" aria-hidden="true">
                      <div className="h-0.5 w-full bg-indigo-600" />
                    </div>
                    <div className="relative flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600">
                      <span className="text-xs font-semibold text-white">1</span>
                    </div>
                    <span className="mt-2 block text-sm font-medium text-indigo-600">Shipping</span>
                  </li>
                  <li className="relative pr-8">
                    <div className="absolute inset-0 flex items-center" aria-hidden="true">
                      <div className="h-0.5 w-full bg-gray-200" />
                    </div>
                    <div className="relative flex h-6 w-6 items-center justify-center rounded-full bg-gray-100">
                      <span className="text-xs font-semibold text-gray-500">2</span>
                    </div>
                    <span className="mt-2 block text-sm font-medium text-gray-500">Payment</span>
                  </li>
                </ol>
              </nav>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Shipping Address Section */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h2 className="text-xl sm:text-2xl font-semibold mb-4 flex items-center">
                  <FaTruck className="mr-2 text-indigo-600" />
                  Shipping Address
                </h2>

                <div className="mb-4">
                  <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1">
                    Saved Addresses
                  </label>
                  <select className="w-full p-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500">
                    <option>Select a saved address</option>
                    <option>New Address</option>
                  </select>
                </div>

                <div className="grid grid-cols-6 gap-4 sm:grid-cols-12">
                  <div className="col-span-6 sm:col-span-12">
                    <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-12">
                    <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1">
                      Street Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-6">
                    <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1">
                      City <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-6">
                    <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1">
                      ZIP / Postal Code <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Method Section */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h2 className="text-xl sm:text-2xl font-semibold mb-4 flex items-center">
                  <FaTruck className="mr-2 text-indigo-600" />
                  Shipping Method
                </h2>

                <div className="space-y-4">
                  <div className="flex items-center p-4 border rounded-md hover:border-indigo-500">
                    <input
                      type="radio"
                      name="shipping"
                      id="standard"
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                      defaultChecked
                    />
                    <label htmlFor="standard" className="ml-3 flex flex-col">
                      <span className="block text-sm sm:text-base font-medium text-gray-700">Standard Shipping</span>
                      <span className="block text-sm text-gray-500">5-7 business days • $5.99</span>
                    </label>
                  </div>

                  <div className="flex items-center p-4 border rounded-md hover:border-indigo-500">
                    <input
                      type="radio"
                      name="shipping"
                      id="express"
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label htmlFor="express" className="ml-3 flex flex-col">
                      <span className="block text-sm sm:text-base font-medium text-gray-700">Express Shipping</span>
                      <span className="block text-sm text-gray-500">2-3 business days • $12.99</span>
                    </label>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 transition-colors font-medium flex items-center justify-center"
              >
                <FaCreditCard className="mr-2" />
                Continue to Payment
              </button>

              <p className="text-center text-sm sm:text-base text-gray-500">
                <a href="/cart" className="text-indigo-600 hover:text-indigo-500">
                  ← Return to Cart
                </a>
              </p>
            </form>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1 mt-10 lg:mt-0">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl sm:text-2xl font-semibold mb-4">Order Summary</h2>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal (3 items)</span>
                  <span className="font-medium">$247.00</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">$5.99</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Taxes</span>
                  <span className="font-medium">$24.70</span>
                </div>

                <hr className="my-4" />

                <div className="flex justify-between text-lg sm:text-xl font-bold">
                  <span>Total</span>
                  <span>$277.69</span>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="mt-8 border-t pt-6">
                <div className="flex items-center justify-center space-x-4">
                  <FaShieldAlt className="text-green-600 text-2xl" />
                  <span className="text-sm sm:text-base text-gray-600">
                    Secure Checkout • Satisfaction Guarantee
                  </span>
                </div>
                <div className="mt-4 flex justify-center space-x-6">
                  <img src="/payment-icons.png" alt="Payment Methods" className="h-8 sm:h-10" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
