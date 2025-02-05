import React, { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import logo from "../../assets/logo.png";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { IoClose } from "react-icons/io5";

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("token");
  const cartItemsCount = useSelector((state) => state.cart.totalQuantity);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged out successfully!");
    navigate("/login");
    setIsMobileMenuOpen(false); // Close mobile menu after logout
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${searchQuery}`);
      setIsMobileMenuOpen(false); // Close mobile menu after search
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    // Prevent body scroll when mobile menu is open
    document.body.style.overflow = !isMobileMenuOpen ? 'hidden' : 'unset';
  };

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <img src={logo} alt="logo" className="h-8 w-auto sm:h-10" />
            </Link>
          </div>

          {/* Search Input - Hidden on mobile, shown on tablet and up */}
          <div className="hidden md:flex items-center flex-1 max-w-sm mx-4">
            <form onSubmit={handleSearchSubmit} className="w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-600 text-sm"
              />
            </form>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-gray-700 hover:text-purple-600 font-medium transition-colors ${isActive ? "text-purple-600" : ""
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                `text-gray-700 hover:text-purple-600 font-medium transition-colors ${isActive ? "text-purple-600" : ""
                }`
              }
            >
              Products
            </NavLink>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `text-gray-700 hover:text-purple-600 font-medium transition-colors ${isActive ? "text-purple-600" : ""
                }`
              }
            >
              Profile
            </NavLink>
            <NavLink
              to="/cart"
              className="relative text-gray-700 hover:text-purple-600 font-medium transition-colors"
            >
              <AiOutlineShoppingCart className="text-2xl" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-3 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemsCount > 9 ? '9+' : cartItemsCount}
                </span>
              )}
            </NavLink>
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="text-purple-600 border border-purple-600 py-1.5 px-4 rounded-lg hover:bg-purple-600 hover:text-white transition-colors"
              >
                Logout
              </button>
            ) : (
              <div className="flex items-center space-x-4">
                <NavLink
                  to="/register"
                  className="text-gray-700 hover:text-purple-600 font-medium transition-colors"
                >
                  Register
                </NavLink>
                <NavLink
                  to="/login"
                  className="text-purple-600 border border-purple-600 py-1.5 px-4 rounded-lg hover:bg-purple-600 hover:text-white transition-colors"
                >
                  Login
                </NavLink>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-700 focus:outline-none p-2"
            >
              {isMobileMenuOpen ? (
                <IoClose className="w-6 h-6" />
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search - Only visible on mobile */}
        <div className="md:hidden mt-3">
          <form onSubmit={handleSearchSubmit} className="w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-600 text-sm"
            />
          </form>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
            onClick={toggleMobileMenu}
          />

          {/* Mobile Menu Content */}
          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-white shadow-xl flex flex-col overflow-y-auto">
            <div className="p-4">
              <button
                onClick={toggleMobileMenu}
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
              >
                <IoClose className="w-6 h-6" />
              </button>

              <div className="mt-8 flex flex-col space-y-4">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `text-lg font-medium ${isActive ? "text-purple-600" : "text-gray-900"}`
                  }
                  onClick={toggleMobileMenu}
                >
                  Home
                </NavLink>
                <NavLink
                  to="/products"
                  className={({ isActive }) =>
                    `text-lg font-medium ${isActive ? "text-purple-600" : "text-gray-900"}`
                  }
                  onClick={toggleMobileMenu}
                >
                  Products
                </NavLink>
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    `text-lg font-medium ${isActive ? "text-purple-600" : "text-gray-900"}`
                  }
                  onClick={toggleMobileMenu}
                >
                  Profile
                </NavLink>
                <NavLink
                  to="/cart"
                  className="text-lg font-medium text-gray-900 flex items-center"
                  onClick={toggleMobileMenu}
                >
                  <span className="flex items-center">
                    <AiOutlineShoppingCart className="text-2xl mr-2" />
                    Cart
                    {cartItemsCount > 0 && (
                      <span className="ml-2 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-1">
                        {cartItemsCount}
                      </span>
                    )}
                  </span>
                </NavLink>
              </div>

              <div className="mt-8">
                {isLoggedIn ? (
                  <button
                    onClick={handleLogout}
                    className="w-full text-center text-purple-600 border border-purple-600 py-2 px-4 rounded-lg hover:bg-purple-600 hover:text-white transition-colors"
                  >
                    Logout
                  </button>
                ) : (
                  <div className="flex flex-col space-y-4">
                    <NavLink
                      to="/register"
                      className="w-full text-center text-gray-900 py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors"
                      onClick={toggleMobileMenu}
                    >
                      Register
                    </NavLink>
                    <NavLink
                      to="/login"
                      className="w-full text-center text-purple-600 border border-purple-600 py-2 px-4 rounded-lg hover:bg-purple-600 hover:text-white transition-colors"
                      onClick={toggleMobileMenu}
                    >
                      Login
                    </NavLink>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;