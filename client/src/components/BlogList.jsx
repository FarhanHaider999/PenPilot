import React, { useState } from "react";
import { blogCategories } from "../assets/assets";
import BlogCard from "./BlogCard";
import { useAppContext } from "../context/AppContext";

const BlogList = () => {
  const [menu, setMenu] = useState("All");
  const { blogs, input } = useAppContext();

  // ✅ Defensive: always work with an array
  const allBlogs = Array.isArray(blogs) ? blogs : [];

  // ✅ Safe filter function
  const filteredBlogs = () => {
    if (!input?.trim()) return allBlogs;

    const lowerInput = input.toLowerCase();

    return allBlogs.filter(
      (blog) =>
        blog.title?.toLowerCase().includes(lowerInput) ||
        blog.category?.toLowerCase().includes(lowerInput)
    );
  };

  const visibleBlogs = filteredBlogs().filter((blog) =>
    menu === "All" ? true : blog.category === menu
  );

  return (
    <div>
      {/* Filter Menu */}
      <div className="relative flex flex-wrap justify-center gap-4 sm:gap-8 my-10">
        {blogCategories.map((item) => {
          const isActive = menu === item;

          return (
            <div key={item} className="relative group">
              <button
                onClick={() => setMenu(item)}
                className={`relative z-10 px-4 py-1 text-sm sm:text-base font-medium transition-all duration-300 ease-out
                  ${
                    isActive
                      ? "text-white scale-105"
                      : "text-gray-500 hover:text-gray-300 hover:scale-105"
                  } 
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-full`}
                aria-pressed={isActive}
              >
                {item}
              </button>

              {/* Animated Background */}
              <div
                className={`absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-500 ease-out
                  ${
                    isActive
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-75 group-hover:opacity-50"
                  }`}
                style={{ zIndex: 0 }}
              ></div>

              {/* Underline */}
              <div
                className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-primary transition-all duration-500 ease-out
                  ${
                    isActive
                      ? "w-full opacity-100"
                      : "w-0 opacity-0 group-hover:w-2/3 group-hover:opacity-70"
                  }`}
              ></div>
            </div>
          );
        })}
      </div>

      {/* Blog Cards */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4
        gap-8 mb-24 mx-8 sm:mx-16 xl:mx-40"
      >
        {visibleBlogs.length > 0 ? (
          visibleBlogs.map((blog) => <BlogCard key={blog._id} blog={blog} />)
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No blogs found.
          </p>
        )}
      </div>
    </div>
  );
};

export default BlogList;
