import React from "react";
import { useAppContext } from "../context/AppContext";

const Navbar = () => {

  const { navigate, token } = useAppContext();

  return (
    <div className=" flex justify-between items-center py-5 mx-8 sm:mx-20 xl:mx-32">
      {/* Custom Text Logo */}
      <h1
        onClick={() => {
          navigate("/");
        }}
        className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900 cursor-pointer"
      >
        <span className="text-blue-600">Pen</span>Pilot
      </h1>

      {/* Login Button */}
      <button
        onClick={() => {
          navigate("/admin");
        }}
        className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition-all cursor-pointer"
      >
        {token ? "Dashboard" : "Login"}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default Navbar;
