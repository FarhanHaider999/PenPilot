import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Activity, MessageSquare, FileText, Newspaper } from "lucide-react";
import BlogTableItem from "../../components/admin/BlogTableItem";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    blogs: 0,
    comments: 0,
    drafts: 0,
    recentBlogs: [],
  });
const { axios } = useAppContext()

const fetchDashboard = async () => {
    try {
        const { data } = await axios.get('/api/admin/dashboard')
        data.success 
            ? setDashboardData(data.dashboardData) 
            : toast.error(data.message)
    } catch (error) {
        toast.error(error.message)
    }
}

  useEffect(() => {
    fetchDashboard();
  }, []);

  const cards = [
    {
      title: "Blogs",
      value: dashboardData.blogs,
      icon: <Activity className="w-7 h-7 text-blue-500" />,
      gradient: "from-blue-500/20 to-blue-300/10",
    },
    {
      title: "Comments",
      value: dashboardData.comments,
      icon: <MessageSquare className="w-7 h-7 text-purple-500" />,
      gradient: "from-purple-500/20 to-purple-300/10",
    },
    {
      title: "Drafts",
      value: dashboardData.drafts,
      icon: <FileText className="w-7 h-7 text-emerald-500" />,
      gradient: "from-emerald-500/20 to-emerald-300/10",
    },
  ];

  return (
    <div className="flex-1 min-h-screen p-6 md:p-10 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-8">
          Dashboard Overview
        </h1>

        {/* Top Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
              className={`bg-white/70 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all relative overflow-hidden`}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${card.gradient} rounded-2xl opacity-60`}
              />
              <div className="relative z-10 flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-gray-800">
                    {card.value}
                  </p>
                  <p className="text-gray-500 text-sm mt-1">{card.title}</p>
                </div>
                <div className="p-3 bg-white/80 rounded-xl shadow-sm">
                  {card.icon}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Latest Blogs Table */}
        <div className="mt-10">
          <div className="flex items-center gap-3 mb-5 text-gray-700">
            <Newspaper className="text-blue-500 w-6 h-6" />
            <h2 className="text-xl font-semibold">Latest Blogs</h2>
          </div>

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
                {dashboardData.recentBlogs.length > 0 ? (
                  dashboardData.recentBlogs.map((blog, index) => (
                    <BlogTableItem
                      key={blog._id}
                      blog={blog}
                      fetchBlogs={fetchDashboard}
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
      </div>
    </div>
  );
};

export default Dashboard;
