import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../../components/admin/sIDEBAR.JSX";

const Layout = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex items-center justify-between h-[70px] px-4 sm:px-12 border-b border-gray-200 bg-white shadow-sm">
        {/* Custom Text Logo */}
        <h1
          onClick={() => navigate("/")}
          className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900 cursor-pointer"
        >
          <span className="text-blue-600">Pen</span>Pilot
        </h1>

        {/* Logout Button */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition-colors"
        >
          Logout
        </button>
      </div>
      {/* Sidebar */}
      <div className="flex h=[calc(100vh-70px)]">
        <Sidebar/>
        <Outlet/>
      </div>
    </>
  );
};

export default Layout;
