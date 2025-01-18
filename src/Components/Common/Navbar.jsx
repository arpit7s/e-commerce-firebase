import React, { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import logo from "../../assets/logo.png";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { IoClose } from "react-icons/io5"; // Importing cross icon

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("token");

  // Get cart items count from Redux store
  const cartItemsCount = useSelector((state) => state.cart.totalQuantity);

  // State for search query
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${searchQuery}`);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Link to="/" className="flex items-center space-x-2">
            <img src={logo} alt="logo" className="h-10 w-auto" />
          </Link>
        </div>

        {/* Search Input */}
        <div className="flex items-center w-full max-w-sm mx-4">
          <form onSubmit={handleSearchSubmit} className="w-full flex">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-600 text-sm"
            />
          </form>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-6">
          <NavLink
            to="/"
            className="text-gray-700 hover:text-purple-600 font-medium transition-colors"
          >
            Home
          </NavLink>
          <NavLink
            to="/products"
            className="text-gray-700 hover:text-purple-600 font-medium transition-colors"
          >
            Products
          </NavLink>
          <NavLink
            to="/profile"
            className="text-gray-700 hover:text-purple-600 font-medium transition-colors"
          >
            Profile
          </NavLink>
          {/* Cart Button with count */}
          <NavLink
            to="/cart"
            className="relative text-gray-700 hover:text-purple-600 font-medium transition-colors flex items-center space-x-2 ml-auto"
          >
            <AiOutlineShoppingCart className="text-2xl" />
            {cartItemsCount > 0 && (
              <span className="absolute -top-3 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartItemsCount > 9 ? '9+' : cartItemsCount}
              </span>
            )}
          </NavLink>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center space-x-4">
          {!isLoggedIn ? (
            <>
              <NavLink
                to="/register"
                className="text-gray-700 hover:text-purple-600 font-medium transition-colors"
              >
                Register
              </NavLink>
              <NavLink
                to="/login"
                className="text-purple-600 border border-purple-600 py-1 px-4 rounded-lg hover:bg-purple-600 hover:text-white transition-colors"
              >
                Login
              </NavLink>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="text-purple-600 border border-purple-600 py-1 px-4 rounded-lg hover:bg-purple-600 hover:text-white transition-colors"
            >
              Logout
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMobileMenu}
            className="text-gray-700 focus:outline-none"
          >
            {/* Conditionally render Hamburger or Cross Icon */}
            {isMobileMenuOpen ? (
              <IoClose className="w-6 h-6" /> // Cross icon when menu is open
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg> // Hamburger icon when menu is closed
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu - Full page with background overlay */}
      {isMobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black opacity-50 z-40"
            onClick={toggleMobileMenu}
          ></div>
          <div className="md:hidden bg-white shadow-md absolute top-0 left-0 w-full h-screen px-4 py-3 flex flex-col space-y-4 z-50">
            <NavLink
              to="/"
              className="text-gray-700 hover:text-purple-600 font-medium transition-colors"
              onClick={toggleMobileMenu}
            >
              Home
            </NavLink>
            <NavLink
              to="/products"
              className="text-gray-700 hover:text-purple-600 font-medium transition-colors"
              onClick={toggleMobileMenu}
            >
              Products
            </NavLink>
            <NavLink
              to="/profile"
              className="text-gray-700 hover:text-purple-600 font-medium transition-colors"
              onClick={toggleMobileMenu}
            >
              Profile
            </NavLink>
            <NavLink
              to="/cart"
              className="relative top-3 text-gray-700 hover:text-purple-600 font-medium transition-colors flex items-center space-x-2"
              onClick={toggleMobileMenu}
            >
              <AiOutlineShoppingCart className="text-2xl" />
              {cartItemsCount > 0 && (
                <span className="fixed -top-15 -right-25 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-0.5">
                  {cartItemsCount}
                </span>
              )}
            </NavLink>

            {/* Auth Buttons in Mobile */}
            <div className="flex flex-col space-y-2">
              {!isLoggedIn ? (
                <>
                  <NavLink
                    to="/register"
                    className="text-gray-700 hover:text-purple-600 font-medium transition-colors"
                    onClick={toggleMobileMenu}
                  >
                    Register
                  </NavLink>
                  <NavLink
                    to="/login"
                    className="text-purple-600 border border-purple-600 py-1 px-4 rounded-lg hover:bg-purple-600 hover:text-white transition-colors"
                    onClick={toggleMobileMenu}
                  >
                    Login
                  </NavLink>
                </>
              ) : (
                <button
                  onClick={handleLogout}
                  className="text-purple-600 border border-purple-600 py-1 px-4 rounded-lg hover:bg-purple-600 hover:text-white transition-colors"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
