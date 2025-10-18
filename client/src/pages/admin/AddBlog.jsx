import React, { useEffect, useRef, useState } from "react";
import { assets, blogCategories } from "../../assets/assets";
import Quill from "quill";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const AddBlog = () => {
  const { axios } = useAppContext();
  const [isAdding, setIsAdding] = useState(false);

  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const [image, setImage] = useState(false);
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [category, setCategory] = useState("Startup");
  const [isPublished, setIsPublished] = useState(false);

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      setIsAdding(true);

      const blog = {
        title,
        subTitle,
        description: quillRef.current.root.innerHTML,
        category,
        isPublished,
      };

      const formData = new FormData();
      formData.append("blog", JSON.stringify(blog));
      formData.append("image", image);

      const { data } = await axios.post("/api/blog/add", formData);

      if (data.success) {
        toast.success(data.message);
        setImage(false);
        setTitle("");
        quillRef.current.root.innerHTML = "";
        setCategory("Startup");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsAdding(false);
    }
  };

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, { theme: "snow" });
    }
  }, []);

  const generateContent = async () => {};

  return (
    <div className="flex-1 min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100 overflow-auto py-14 px-6 sm:px-10">
      <form
        onSubmit={onSubmitHandler}
        className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl border border-gray-200/70 backdrop-blur-lg p-10 sm:p-14 transition-all duration-300 hover:shadow-2xl"
      >
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-10">
          <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">
            ✍️ Create a New Blog
          </h1>
        </header>

        {/* Upload Thumbnail */}
        <div className="mb-10">
          <label className="block text-sm font-medium text-gray-800 mb-2">
            Thumbnail
          </label>
          <div className="flex items-center gap-6">
            <label
              htmlFor="image"
              className="relative flex items-center justify-center h-28 w-28 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 hover:bg-gray-100 cursor-pointer transition-all duration-200"
            >
              <img
                src={!image ? assets.upload_area : URL.createObjectURL(image)}
                alt="Upload thumbnail"
                className="object-cover w-full h-full rounded-xl"
              />
              <input
                onChange={(e) => setImage(e.target.files[0])}
                type="file"
                id="image"
                hidden
                required
              />
            </label>
            <p className="text-sm text-gray-500 leading-relaxed">
              Upload image (JPG or PNG).
            </p>
          </div>
        </div>

        {/* Title */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-800 mb-2">
            Blog Title
          </label>
          <input
            type="text"
            placeholder="Write a clear, captivating title..."
            required
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-black focus:border-black outline-none transition"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </div>

        {/* Subtitle */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-800 mb-2">
            Subtitle
          </label>
          <input
            type="text"
            placeholder="Add a short descriptive subtitle..."
            required
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-black focus:border-black outline-none transition"
            onChange={(e) => setSubTitle(e.target.value)}
            value={subTitle}
          />
        </div>

        {/* Description / Editor */}
        <div className="mb-10 relative">
          <label className="block text-sm font-medium text-gray-800 mb-2">
            Blog Description
          </label>
          <div className="border border-gray-300 rounded-xl overflow-hidden shadow-sm">
            <div
              ref={editorRef}
              className="min-h-[250px] px-3 pt-3 pb-10 bg-white"
            />
          </div>
          <button
            type="button"
            onClick={generateContent}
            className="absolute bottom-3 right-3 text-xs text-white bg-black hover:bg-gray-900 px-4 py-1.5 rounded-md flex items-center gap-2 shadow-sm transition"
          >
            <i className="fa-solid fa-wand-magic-sparkles"></i> Generate with AI
          </button>
        </div>

        {/* Category */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-800 mb-2">
            Category
          </label>
          <select
            onChange={(e) => setCategory(e.target.value)}
            name="category"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-900 focus:ring-2 focus:ring-black focus:border-black outline-none transition"
          >
            <option value="">Select category</option>
            {blogCategories.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        {/* Publish Toggle */}
        <div className="flex items-center gap-3 mb-12">
          <input
            type="checkbox"
            checked={isPublished}
            className="scale-125 accent-black cursor-pointer"
            onChange={(e) => setIsPublished(e.target.checked)}
          />
          <label className="text-sm text-gray-700 whitespace-nowrap">
            Publish Now
          </label>
          <button
            disabled={isAdding}
            type="submit"
            className="w-full h-11 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-900 transition-all duration-150 shadow-md"
          >
            {isAdding ? "Publishing Blog" : "Add Blog"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBlog;
