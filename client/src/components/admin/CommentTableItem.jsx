import React from "react";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const CommentTableItem = ({ comment, fetchComments }) => {
  const { blog, createdAt, _id } = comment;
  const BlogDate = new Date(createdAt);

  const { axios } = useAppContext();

  const approveComment = async () => {
    try {
      const { data } = await axios.post("/api/admin/approve-comment", {
        id: _id,
      });
      if (data.success) {
        toast.success(data.message);
        fetchComments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const deleteComment = async () => {
    try {
      const confirm = window.confirm(
        "Are you sure you want to delete this comment?"
      );
      if (!confirm) return;

      const { data } = await axios.post("/api/admin/delete-comment", {
        id: _id,
      });
      if (data.success) {
        toast.success(data.message);
        fetchComments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4 align-top">
        <div className="space-y-1">
          <p>
            <span className="font-semibold text-gray-700">Blog:</span>{" "}
            {blog.title}
          </p>
          <p>
            <span className="font-semibold text-gray-700">Name:</span>{" "}
            {comment.name}
          </p>
          <p>
            <span className="font-semibold text-gray-700">Comment:</span>{" "}
            <span className="text-gray-600">{comment.content}</span>
          </p>
        </div>
      </td>

      <td className="px-6 py-4 max-sm:hidden text-gray-500 whitespace-nowrap">
        {BlogDate.toLocaleDateString()}
      </td>

      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          {!comment.isApproved ? (
            <img
              onClick={approveComment}
              src={assets.tick_icon}
              className="w-5 h-5 hover:scale-110 transition-transform cursor-pointer"
              title="Approve Comment"
              alt="Approve"
            />
          ) : (
            <span className="text-xs border border-green-600 bg-green-100 text-green-700 rounded-full px-3 py-1 font-medium">
              Approved
            </span>
          )}
          <img
            onClick={deleteComment}
            src={assets.bin_icon}
            alt="Delete"
            className="w-5 h-5 hover:scale-110 transition-transform cursor-pointer"
            title="Delete Comment"
          />
        </div>
      </td>
    </tr>
  );
};

export default CommentTableItem;
