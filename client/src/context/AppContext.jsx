import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();

  // === STATE ===
  const [token, setToken] = useState(() => localStorage.getItem("token") || null);

  // === SET AXIOS HEADER WHEN TOKEN CHANGES ===
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      localStorage.setItem("token", token);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("token");
    }
  }, [token]);

  // === LOGIN ===
  const login = (newToken) => {
    if (!newToken) {
      toast.error("Invalid token");
      return;
    }
    setToken(newToken);
    toast.success("Login successful!");
    navigate("/admin");
  };

  // === LOGOUT ===
  const logout = () => {
    setToken(null);
    toast.success("Logged out successfully!");
    navigate("/");
  };

  // === CONTEXT VALUE ===
  const value = {
    axios,
    navigate,
    token,
    setToken, // keep for backward use
    login,
    logout,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// === HOOK ===
export const useAppContext = () => useContext(AppContext);
