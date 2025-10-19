import React from "react";
import { useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";
import { motion } from "framer-motion";

const BlogCard = ({ blog }) => {
  const navigate = useNavigate();
  if (!blog) return null;

  const { _id, title, description, category, image } = blog;

  // Clean HTML and extract preview
  const cleanHTML = DOMPurify.sanitize(description);
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = cleanHTML;
  const previewText = tempDiv.textContent?.slice(0, 160) + "...";

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      onClick={() => navigate(`/blog/${_id}`)}
      className="group relative cursor-pointer overflow-hidden rounded-xl bg-white dark:bg-[#0b0b0b]
                 border border-gray-200/70 dark:border-white/10 shadow-sm hover:shadow-xl 
                 transition-all duration-500 flex flex-col"
    >
      {/* Image */}
      <div className="relative overflow-hidden h-52">
        <motion.img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

        {/* Category badge */}
        <div className="absolute bottom-3 left-3 text-xs font-medium px-3 py-1 rounded-md text-white bg-gray-900/70 backdrop-blur-sm">
          {category}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col justify-between flex-grow p-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white leading-tight">
            {title}
          </h3>
          <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            {previewText}
          </p>
        </div>

        <div className="mt-5 flex justify-between items-center border-t border-gray-100 dark:border-white/10 pt-4">
          <motion.button
            whileHover={{ x: 4 }}
            className="text-sm font-medium text-blue-600 dark:text-blue-400 flex items-center gap-1.5 transition-all"
          >
            Read More
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              />
            </svg>
          </motion.button>
          <span className="text-xs text-gray-400 dark:text-gray-500 select-none">
            ⏱ 5 min read
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default BlogCard;
