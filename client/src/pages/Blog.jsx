import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Clock,
  Calendar,
  Tag,
  ArrowLeft,
  Share2,
  Bookmark,
} from "lucide-react";
import { blog_data } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { comments_data } from "../assets/assets";
import Loader from "../components/Loader";

const Blog = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const [data, setData] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);

  const [commentName, setCommentName] = useState("");
  const [commentText, setCommentText] = useState("");
  const [commentSubmitted, setCommentSubmitted] = useState(false);

  useEffect(() => {
    const fetchBlogData = () => {
      const foundData = blog_data.find((item) => item._id === id);
      setData(foundData);
      setTimeout(() => setIsVisible(true), 100);
    };

    fetchBlogData();
  }, [id]);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setReadingProgress(progress);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  const parseHtmlContent = (html) => {
    if (!html) return [];

    const temp = document.createElement("div");
    temp.innerHTML = html;
    const elements = [];

    Array.from(temp.childNodes).forEach((node, index) => {
      if (node.nodeType === 1) {
        const tag = node.tagName.toLowerCase();
        const text = node.textContent;

        if (tag === "h1") {
          elements.push(
            <h1
              key={`h1-${index}`}
              className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent leading-tight"
            >
              {text}
            </h1>
          );
        } else if (tag === "h2") {
          elements.push(
            <h2
              key={`h2-${index}`}
              className="text-2xl md:text-3xl font-bold mt-12 mb-4 text-gray-800 flex items-center gap-3"
            >
              <span className="w-1.5 h-8 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full"></span>
              {text}
            </h2>
          );
        } else if (tag === "p") {
          const isBold = node.querySelector("strong") !== null;
          elements.push(
            <p
              key={`p-${index}`}
              className={`text-lg leading-relaxed mb-6 text-gray-700 ${
                isBold ? "font-semibold text-gray-900 mt-8" : ""
              }`}
            >
              {text}
            </p>
          );
        }
      }
    });

    return elements;
  };

  if (!data) {
    return <Loader/>
  }

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-100 z-50">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-300"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Decorative Background Elements */}
      <div className="fixed top-20 right-10 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-30 pointer-events-none" />
      <div className="fixed bottom-20 left-10 w-96 h-96 bg-purple-50 rounded-full blur-3xl opacity-30 pointer-events-none" />

      {/* Navbar */}
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-100 transition-all duration-300">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back</span>
          </button>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-all hover:scale-110">
              <Share2 className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-all hover:scale-110">
              <Bookmark className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main
        className={`max-w-4xl mx-auto px-6 py-12 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {/* Category Badge */}
        <div className="flex items-center gap-3 mb-6">
          {data.category && (
            <>
              <span className="px-4 py-1.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full text-sm font-medium shadow-lg shadow-blue-200 flex items-center gap-2">
                <Tag className="w-4 h-4" />
                {data.category}
              </span>
              <span className="text-gray-400">•</span>
            </>
          )}
          <span className="text-sm text-gray-500 flex items-center gap-2">
            <Clock className="w-4 h-4" />5 min read
          </span>
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
          {data.title}
        </h1>

        {/* Subtitle */}
        {data.subTitle && (
          <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed font-light">
            {data.subTitle}
          </p>
        )}

        {/* Meta Info */}
        <div className="flex items-center gap-6 mb-12 pb-8 border-b border-gray-100">
          {data.createdAt && (
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar className="w-5 h-5" />
              <span className="text-sm">
                Published {formatDate(data.createdAt)}
              </span>
            </div>
          )}
          {data.updatedAt && data.updatedAt !== data.createdAt && (
            <>
              <span className="text-gray-300">•</span>
              <span className="text-sm text-gray-500">
                Updated {formatDate(data.updatedAt)}
              </span>
            </>
          )}
        </div>

        {/* Featured Image */}
        {data.image && (
          <div className="relative mb-16 rounded-2xl overflow-hidden shadow-2xl group">
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <img
              src={data.image}
              alt={data.title || "Blog image"}
              className="w-full h-[400px] md:h-[500px] object-cover transform group-hover:scale-105 transition-transform duration-700"
            />
          </div>
        )}

        {/* Content */}
        <article className="prose prose-lg max-w-none">
          <div className="space-y-6">
            {data.description && parseHtmlContent(data.description)}
          </div>
        </article>

        {/* Divider */}
        <div className="my-16 flex items-center justify-center">
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
          <div className="mx-4 w-2 h-2 bg-gray-300 rounded-full" />
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
        </div>

        
      </main>
      {/* Comments Section */}
      <section className="max-w-4xl mx-auto px-6 pb-24 mt-16 border-t border-gray-100 pt-12">
        <h2 className="text-3xl font-bold mb-8 text-gray-900 flex items-center gap-3">
          💬 Comments
          <span className="text-sm text-gray-400 font-normal">
            (
            {
              comments_data.filter(
                (c) => c.blog._id === data._id && c.isApproved
              ).length
            }
            )
          </span>
        </h2>

        {/* List of Approved Comments */}
        <div className="space-y-6 mb-12">
          {comments_data
            .filter(
              (comment) => comment.blog._id === data._id && comment.isApproved
            )
            .map((comment) => (
              <div
                key={comment._id}
                className="p-5 rounded-xl border border-gray-100 bg-gray-50 hover:shadow-sm transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">
                    {comment.name}
                  </h4>
                  <span className="text-xs text-gray-400">
                    {new Date(comment.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  {comment.content}
                </p>
              </div>
            ))}

          {/* No comments yet */}
          {comments_data.filter((c) => c.blog._id === data._id && c.isApproved)
            .length === 0 && (
            <p className="text-gray-500 italic">
              No comments yet. Be the first to comment!
            </p>
          )}
        </div>

        {/* Add Comment Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!commentName.trim() || !commentText.trim()) {
              alert("Please fill out all fields");
              return;
            }

            const newComment = {
              _id: Date.now().toString(),
              blog: { _id: data._id },
              name: commentName,
              content: commentText,
              isApproved: false,
              createdAt: new Date().toISOString(),
            };

            console.log("📝 New comment submitted:", newComment);
            setCommentSubmitted(true);
            setCommentName("");
            setCommentText("");

            setTimeout(() => setCommentSubmitted(false), 3000);
          }}
          className="p-6 bg-white border border-gray-200 rounded-2xl shadow-sm"
        >
          <h3 className="text-2xl font-semibold mb-6 text-gray-900">
            Leave a Comment
          </h3>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Your Name
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={commentName}
              onChange={(e) => setCommentName(e.target.value)}
              placeholder="John Doe"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Comment
            </label>
            <textarea
              rows="4"
              className="w-full border border-gray-300 rounded-lg p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Write your comment..."
            ></textarea>
          </div>

          <button
            type="submit"
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-medium hover:shadow-lg hover:scale-105 transition-all"
          >
            Submit Comment
          </button>

          {commentSubmitted && (
            <p className="mt-4 text-green-600 font-medium">
              ✅ Your comment has been submitted for review.
            </p>
          )}
        </form>
      </section>

      {/* Floating Action Button */}
      <button
        className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full shadow-2xl hover:scale-110 transition-all flex items-center justify-center group"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <ArrowLeft className="w-6 h-6 rotate-90 group-hover:-translate-y-1 transition-transform" />
      </button>
    </div>
  );
};

export default Blog;
