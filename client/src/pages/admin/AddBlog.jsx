import React, { useEffect, useRef, useState } from "react";
import { Sparkles } from "lucide-react";
import { assets, blogCategories } from "../../assets/assets";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { parse } from "marked";

export default function BlogPostCreator() {
  const { axios, refreshBlogs } = useAppContext();

  // Form state (kept consistent with your AddBlog logic)
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [category, setCategory] = useState("Startup"); // <-- restored default
  const [image, setImage] = useState(false); // file object
  const [isPublished, setIsPublished] = useState(false);

  // UI state
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(false);

  // Quill
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  // Initialize Quill
  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, { theme: "snow" });
    }
  }, []);

  // Thumbnail upload handler (keeps UI same as your first file)
  const handleThumbnailUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  // Generate content with AI (uses /api/blog/generate like AddBlog)
  const generateContent = async () => {
    if (!title) return toast.error("Please enter a title");
    try {
      setLoading(true);
      const { data } = await axios.post("/api/blog/generate", { prompt: title });
      if (data.success) {
        quillRef.current.root.innerHTML = parse(data.content);
      } else {
        toast.error(data.message || "AI generation failed");
      }
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Publish handler (kept AddBlog logic: FormData with "blog" and "image")
  const handlePublish = async () => {
    try {
      if (!title) {
        return toast.error("Please enter a blog title");
      }
      const descriptionHTML = quillRef.current?.root?.innerHTML || "";
      if (!descriptionHTML.trim()) {
        return toast.error("Please write your blog description");
      }

      setIsAdding(true);

      const blog = {
        title,
        subTitle,
        description: descriptionHTML,
        category,
        isPublished,
      };

      const formData = new FormData();
      formData.append("blog", JSON.stringify(blog));
      if (image) formData.append("image", image);

      const { data } = await axios.post("/api/blog/add", formData);

      if (data.success) {
        toast.success(data.message || "Blog published");
        refreshBlogs?.();
        // reset fields (kept same resets as AddBlog)
        setImage(false);
        setTitle("");
        setSubTitle("");
        quillRef.current.root.innerHTML = "";
        setCategory("Startup"); // reset to default exactly as AddBlog did
        setIsPublished(false);
      } else {
        toast.error(data.message || "Unable to publish");
      }
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-10">Create a New Blog Post</h1>

        <div className="flex gap-8">
          {/* Left Section */}
          <div className="flex-1 space-y-6">
            {/* Blog Title */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Blog title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter your blog title here"
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-gray-300 text-sm placeholder-gray-400"
              />
            </div>

            {/* Sub Title */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Sub title</label>
              <input
                type="text"
                value={subTitle}
                onChange={(e) => setSubTitle(e.target.value)}
                placeholder="Enter your sub title here"
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-gray-300 text-sm placeholder-gray-400"
              />
            </div>

            {/* Blog Description (Quill editor) */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Blog Description</label>
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <div ref={editorRef} className="min-h-[250px] px-3 py-3" />
              </div>
            </div>

            {/* Generate with AI Button */}
            <button
              onClick={generateContent}
              disabled={loading}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3.5 px-6 rounded-lg flex items-center justify-center gap-2 transition text-sm"
            >
              <Sparkles size={18} />
              {loading ? "Generating..." : "Generate with AI"}
            </button>
          </div>

          {/* Right Section */}
          <div className="w-80 space-y-6">
            {/* Upload Thumbnail */}
            <div className="bg-white border-2 border-dashed border-gray-300 rounded-xl p-8">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Upload Thumbnail</h3>
                <p className="text-sm text-gray-500 mb-6">Upload a thumbnail for your blog post.</p>

                {image ? (
                  <div className="mb-4">
                    <img
                      src={URL.createObjectURL(image)}
                      alt="Thumbnail preview"
                      className="w-full h-40 object-cover rounded-lg"
                    />
                  </div>
                ) : (
                  <div className="mb-4">
                    <img
                      src={assets.upload_area}
                      alt="Upload area"
                      className="w-full h-40 object-cover rounded-lg"
                    />
                  </div>
                )}

                <label className="inline-block cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleThumbnailUpload}
                    className="hidden"
                  />
                  <span className="bg-white hover:bg-gray-50 text-gray-900 font-medium py-2.5 px-8 rounded-lg inline-block transition text-sm border border-gray-300">
                    Upload
                  </span>
                </label>
              </div>
            </div>

            {/* Blog Category (restored: options from blogCategories) */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Blog category</label>
              <div className="relative">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-gray-300 appearance-none text-sm text-gray-600"
                >
                  <option value="">Select category</option>
                  {blogCategories.map((item, idx) => (
                    <option key={idx} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Publish Now */}
            <div className="flex items-center gap-3 mb-3">
              <input
                type="checkbox"
                checked={isPublished}
                className="scale-125 accent-black cursor-pointer"
                onChange={(e) => setIsPublished(e.target.checked)}
              />
              <label className="text-sm text-gray-700 whitespace-nowrap">Publish Now</label>
            </div>

            {/* Add Blog Button */}
            <button
              onClick={handlePublish}
              disabled={isAdding}
              className="w-full bg-zinc-600 hover:bg-zinc-700 text-white font-semibold py-3.5 px-6 rounded-lg transition text-sm"
            >
              {isAdding ? "Publishing..." : "Add Blog"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
