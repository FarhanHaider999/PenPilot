import React, { useState, useEffect } from "react";
import CommentTableItem from "../../components/admin/CommentTableItem";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
const Comments = () => {
  const [comments, setComments] = useState([]);
  const [filter, setFilter] = useState("Not Approved");

  const { axios } = useAppContext();

  const fetchComments = async () => {
    try {
      const { data } = await axios.get("/api/admin/comments");
      data.success ? setComments(data.comments) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div className="flex-1 px-4 sm:px-10 py-8 bg-gradient-to-b from-blue-50 to-white min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center max-w-4xl mx-auto mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Comments</h1>

        {/* Filter Buttons */}
        <div className="flex gap-3 mt-3 sm:mt-0">
          {["Approved", "Not Approved"].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`transition-all duration-200 border rounded-full px-5 py-1.5 text-sm font-medium shadow-sm hover:shadow-md ${
                filter === type
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Table Container */}
      <div className="relative max-w-4xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden">
        <table className="w-full text-sm text-gray-600">
          <thead className="bg-gray-100 text-gray-700 text-xs uppercase tracking-wider">
            <tr>
              <th scope="col" className="px-6 py-3 text-left">
                Blog Title & Comment
              </th>
              <th scope="col" className="px-6 py-3 text-left max-sm:hidden">
                Date
              </th>
              <th scope="col" className="px-6 py-3 text-left">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {comments
              .filter((comment) =>
                filter === "Approved" ? comment.isApproved : !comment.isApproved
              )
              .map((comment, index) => (
                <CommentTableItem
                  key={comment._id}
                  comment={comment}
                  index={index + 1}
                  fetchComments={fetchComments}
                />
              ))}
          </tbody>
        </table>

        {comments.filter((comment) =>
          filter === "Approved" ? comment.isApproved : !comment.isApproved
        ).length === 0 && (
          <div className="p-6 text-center text-gray-500 text-sm">
            No {filter.toLowerCase()} comments found.
          </div>
        )}
      </div>
    </div>
  );
};

export default Comments;
