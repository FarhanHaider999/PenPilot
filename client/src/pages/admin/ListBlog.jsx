import React, { useEffect, useState } from "react";
import { blog_data } from "../../assets/assets";
import BlogTableItem from "../../components/admin/BlogTableItem";

const ListBlog = () => {
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    // Simulate fetching data (replace with API later)
    setBlogs(blog_data);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="flex-1 min-h-screen p-6 md:p-10 bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-slate-800">All Blogs</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
          + Add Blog
        </button>
      </div>

      {/* Table Container */}
      <div className="relative overflow-x-auto bg-white/80 backdrop-blur-lg rounded-2xl border border-gray-100 shadow-lg">
        <table className="w-full text-sm text-gray-600">
          <thead className="text-xs text-gray-500 uppercase bg-gradient-to-r from-slate-100 to-blue-50 border-b border-gray-200">
            <tr>
              <th scope="col" className="px-6 py-4 text-left">#</th>
              <th scope="col" className="px-6 py-4 text-left">Blog Title</th>
              <th scope="col" className="px-6 py-4 text-left max-sm:hidden">Date</th>
              <th scope="col" className="px-6 py-4 text-left max-sm:hidden">Status</th>
              <th scope="col" className="px-6 py-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.length > 0 ? (
              blogs.map((blog, index) => (
                <BlogTableItem
                  key={blog._id || index}
                  blog={blog}
                  fetchBlogs={fetchBlogs}
                  index={index + 1}
                />
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-8 text-gray-400">
                  No blogs found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListBlog;
