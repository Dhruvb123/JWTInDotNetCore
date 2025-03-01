// src/components/Layout.jsx
import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import { useAuth } from "../context/Authcontext";

const Layout = () => {
  const { logout } = useAuth();

  return (
    <div className="p-4">
      <nav className="flex space-x-4 mb-4">
        <NavLink
          to="/home"
          className="text-blue-500"
          activeClassName="font-bold"
        >
          Home
        </NavLink>
        <NavLink
          to="/about"
          className="text-blue-500"
          activeClassName="font-bold"
        >
          About
        </NavLink>
        <NavLink
          to="/contact"
          className="text-blue-500"
          activeClassName="font-bold"
        >
          Contact
        </NavLink>
        <button
          onClick={logout}
          className="ml-auto px-4 py-2 bg-red-500 text-white rounded"
        >
          Logout
        </button>
      </nav>
      <Outlet />
    </div>
  );
};

export default Layout;
