import React from "react";
import { assets } from "../../assets/assets";
import { motion } from "framer-motion";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const BlogTableItem = ({ blog, fetchBlogs, index }) => {
  const { title, createdAt, isPublished } = blog;
  const blogDate = new Date(createdAt);
  const { axios } = useAppContext();

  const deleteBlog = async () => {
    const confirm = window.confirm(
      "Are you sure you want to delete this blog?"
    );
    if (!confirm) return;
    try {
      const { data } = await axios.post("/api/blog/delete", { id: blog._id });
      if (data.success) {
        toast.success(data.message);
        await fetchBlogs();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const togglePublish = async () => {
    try {
      const { data } = await axios.post("/api/blog/toggle-publish", {
        id: blog._id,
      });
      if (data.success) {
        toast.success(data.message);
        await fetchBlogs();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <motion.tr
      transition={{ duration: 0.2 }}
      className="border-b border-gray-200 text-gray-700 hover:shadow-sm"
    >
      <th className="px-6 py-4 font-medium">{index}</th>
      <td className="px-6 py-4 font-semibold text-gray-800">{title}</td>
      <td className="px-6 py-4 max-sm:hidden text-gray-500">
        {blogDate.toDateString()}
      </td>
      <td className="px-6 py-4 max-sm:hidden">
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold ${
            isPublished
              ? "bg-green-100 text-green-700"
              : "bg-orange-100 text-orange-700"
          }`}
        >
          {isPublished ? "Published" : "Unpublished"}
        </span>
      </td>
      <td className="px-6 py-4 flex items-center gap-3">
        <button
        onClick={togglePublish}
          className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all ${
            isPublished
              ? "bg-gray-100 hover:bg-gray-200 text-gray-700"
              : "bg-blue-100 hover:bg-blue-200 text-blue-700"
          }`}
        >
          {isPublished ? "Unpublish" : "Publish"}
        </button>
        <img
          onClick={deleteBlog}
          src={assets.cross_icon}
          alt="delete"
          className="w-5 h-5 opacity-70 hover:opacity-100 hover:scale-110 transition-all cursor-pointer"
        />
      </td>
    </motion.tr>
  );
};

export default BlogTableItem;
