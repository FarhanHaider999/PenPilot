import React, { useRef } from "react";
import { motion } from "framer-motion";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

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
    <div className="relative mx-8 sm:mx-16 xl:mx-24 mt-24 mb-16 text-gray-800">
      {/* Decorative pastel blobs */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-blue-100 rounded-full blur-3xl opacity-40 -z-10 -translate-y-1/2 -translate-x-1/2" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-100 rounded-full blur-3xl opacity-40 -z-10 translate-y-1/2 translate-x-1/2" />

      {/* Center Content */}
      <div className="text-center relative z-10">
        {/* Announcement badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center justify-center gap-3 px-6 py-2 border border-gray-200/70 bg-white/60 backdrop-blur-md rounded-full text-sm text-blue-700 font-medium shadow-sm hover:shadow-md transition-all"
        >
          <img
            src={assets.star_icon}
            alt="new feature"
            className="w-4 animate-spin-slow"
          />
          <p>Now with Built-in AI Assistant</p>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl font-extrabold mt-8 leading-snug tracking-tight text-gray-900"
        >
          Write Smarter with{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500">
            AI-Powered
          </span>{" "}
          Blogging
          <span className="text-indigo-600">.</span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-6 sm:mt-8 max-w-2xl mx-auto text-gray-600 text-base sm:text-lg leading-relaxed"
        >
          Create, edit, and publish with ease. Transform your ideas into
          beautifully written blogs — enhanced by AI, designed for speed,
          clarity, and creativity.
        </motion.p>

        {/* Search Bar with Clear functionality */}
        <motion.form
          onSubmit={onSubmitHandler}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-10 flex justify-between items-center max-w-lg mx-auto border border-gray-200 rounded-full bg-white shadow-sm hover:shadow-md transition-all overflow-hidden"
        >
          <input
            ref={inputRef}
            type="text"
            placeholder="Search for blogs..."
            required
            className="w-full px-5 py-3 text-gray-700 placeholder-gray-400 outline-none"
          />
          {input && (
            <button
              type="button"
              onClick={onClearHandler}
              className="text-gray-500 hover:text-gray-700 font-medium px-4 py-3 transition-colors"
            >
              Clear
            </button>
          )}
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium px-8 py-3 rounded-full hover:shadow-lg hover:scale-[1.03] transition-transform"
          >
            Search
          </button>
        </motion.form>
      </div>

      {/* Optional subtle background gradient image */}
      <img
        src={assets.gradientBackground}
        alt=""
        className="absolute inset-0 opacity-5 pointer-events-none -z-10"
      />
    </div>
  );
};

export default Header;
