"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useAppContext } from "../context/AppContext";
import Scene3D from "./Scene3d";

const Header = () => {
  const { setInput, input } = useAppContext();
  const inputRef = useRef();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setInput(inputRef.current.value);
  };

  const onClearHandler = () => {
    inputRef.current.value = "";
    setInput("");
  };

  return (
    <div className="relative w-full bg-white overflow-hidden min-h-screen flex flex-col lg:flex-row items-center justify-center px-8 sm:px-16 xl:px-24 gap-12">
      {/* Left Side — Text + Input */}
      <div className="flex-1 text-gray-800 flex flex-col justify-center text-center lg:text-left">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center justify-center lg:justify-start gap-3 px-6 border border-gray-200 bg-white/80 backdrop-blur-md rounded-full text-sm text-gray-700 font-medium shadow-sm hover:shadow-md transition-all"
        >
          <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
          <p>Modern Blog Platform with AI</p>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl sm:text-7xl font-bold mt-8 leading-tight tracking-tight text-gray-900"
        >
          Create Stunning <span className="text-blue-600">Blog Posts</span> with AI
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-6 sm:mt-8 max-w-2xl text-gray-600 text-base sm:text-lg leading-relaxed mx-auto lg:mx-0"
        >
          Write, edit, and publish beautiful content powered by artificial
          intelligence. Transform your ideas into engaging stories effortlessly.
        </motion.p>

        <motion.form
          onSubmit={onSubmitHandler}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-10 flex justify-between items-center max-w-lg mx-auto lg:mx-0 border border-gray-300 rounded-full bg-white shadow-lg hover:shadow-xl transition-all overflow-hidden"
        >
          <input
            ref={inputRef}
            type="text"
            placeholder="Search blogs..."
            required
            className="w-full px-6 py-4 text-gray-700 placeholder-gray-400 outline-none text-base"
          />
          {input && (
            <button
              type="button"
              onClick={onClearHandler}
              className="text-gray-500 hover:text-gray-700 font-medium px-4 py-4 transition-colors"
            >
              Clear
            </button>
          )}
          <button
            type="submit"
            className="bg-blue-600 text-white font-medium px-8 py-4 hover:bg-blue-700 transition-colors"
          >
            Search
          </button>
        </motion.form>
      </div>

      {/* Right Side — 3D Scene */}
      <div className="flex-1 h-[500px] lg:h-[700px] w-full">
        <Scene3D />
      </div>
    </div>
  );
};

export default Header;
