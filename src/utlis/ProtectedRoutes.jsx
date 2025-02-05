import React from "react";
import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";
const ProtectedRoutes = () => {
  const authToken = localStorage.getItem("token");

  if (authToken) {
    return <Outlet />;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">
          Unauthorized Access
        </h1>
        <p className="text-gray-600 mb-6">
          You are not authorized to view this page. Please log in to continue.
        </p>
        <NavLink
          to="/login"
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300 flex items-center justify-center"
        >
          Go to Login Page
        </NavLink>

      </div>
    </div>
  );
};

export default ProtectedRoutes;
