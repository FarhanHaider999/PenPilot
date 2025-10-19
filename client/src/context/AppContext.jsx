import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();

  // === STATE ===
  const [token, setToken] = useState(
    () => localStorage.getItem("token") || null
  );
  const [blogs, setBlogs] = useState([]); // 🧩 store blogs
  const [loadingBlogs, setLoadingBlogs] = useState(true);
  const [input, setInput] = useState(""); // for BlogList search

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

  // === FETCH BLOGS ===
  const fetchBlogs = async () => {
    try {
      setLoadingBlogs(true);
      const { data } = await axios.get("/api/blog/all");
      if (data?.success) {
        setBlogs(data.blogs || []);
      } else {
        setBlogs([]);
        toast.error(data.message || "Failed to load blogs");
      }
    } catch (err) {
      console.error("Error fetching blogs:", err);
      toast.error("Error fetching blogs");
      setBlogs([]);
    } finally {
      setLoadingBlogs(false);
    }
  };

  // === CALL ON MOUNT ===
 useEffect(() => {
  fetchBlogs();
}, [token]);


  // === LOGIN ===
  const login = (newToken) => {
    if (!newToken) {
      toast.error("Invalid token");
      return;
    }
    setToken(newToken);
    toast.success("Login successful!");

    // ✅ Fetch all blogs after login
    setTimeout(() => {
      fetchBlogs();
    }, 300);

    navigate("/admin");
  };

  // === LOGOUT ===
  const logout = () => {
    setToken(null);
    toast.success("Logged out successfully!");
    navigate("/");
  };

  // === REFETCH AFTER ADDING BLOG ===
  const refreshBlogs = () => fetchBlogs();

  // === CONTEXT VALUE ===
  const value = {
    axios,
    navigate,
    token,
    setToken,
    login,
    logout,
    blogs,
    loadingBlogs,
    fetchBlogs,
    refreshBlogs,
    input,
    setInput,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// === HOOK ===
export const useAppContext = () => useContext(AppContext);
