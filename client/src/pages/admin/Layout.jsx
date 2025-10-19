import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../../components/admin/Sidebar.jsx";
import { useAppContext } from "../../context/AppContext";

const Layout = () => {
  const navigate = useNavigate();
  const { setToken, axios } = useAppContext();

  const handleLogout = () => {
    // Clear token everywhere
    setToken(null);
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];

    navigate("/login");
  };

  return (
    <>
      {/* Navbar */}
      <div className="flex items-center justify-between h-[70px] px-4 sm:px-12 border-b border-gray-200 bg-white shadow-sm">
        {/* Logo */}
        <h1
          onClick={() => navigate("/")}
          className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900 cursor-pointer"
        >
          <span className="text-blue-600">Pen</span>Pilot
        </h1>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition-colors"
        >
          Logout
        </button>
      </div>

      {/* Sidebar + Main Content */}
      <div className="flex h-[calc(100vh-70px)]">
        <Sidebar />
        <div className="flex-1 overflow-auto">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Layout;
