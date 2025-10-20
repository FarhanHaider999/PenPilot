import client from "../configs/imageKit.js";
import Blog from "../models/Blogs.js";
import fs from "fs";
import Comment from "../models/Comment.js";
import main from "../configs/gemini.js";

// =============== Add Blog ==================
export const addBlog = async (req, res) => {
  try {
    const { title, subTitle, description, category, isPublished } = JSON.parse(
      req.body.blog
    );
    const imageFile = req.file;

    if (!title || !description || !category || !imageFile) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    const response = await client.files.upload({
      file: fs.createReadStream(imageFile.path),
      fileName: imageFile.originalname,
      folder: "/blogs",
    });

    const optimizedImageUrl = client.helper.buildSrc({
      urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
      src: response.filePath,
      transformation: [
        { quality: "auto" },
        { format: "webp" },
        { width: 1280 },
      ],
    });

    fs.unlinkSync(imageFile.path);

    await Blog.create({
      title,
      subTitle,
      description,
      category,
      image: optimizedImageUrl,
      author: req.user.id, // ✅ Save logged-in user
      isPublished,
    });

    res.json({ success: true, message: "Blog added successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Blogs (all for admin, only published for public)
export const getAllBlogs = async (req, res) => {
  try {
    let blogs;

    if (req.user) {
      // If user is logged in → show all blogs
      blogs = await Blog.find({}).sort({ createdAt: -1 });
    } else {
      // If not logged in → only show published blogs
      blogs = await Blog.find({ isPublished: true }).sort({ createdAt: -1 });
    }

    res.json({ success: true, blogs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// =============== Get Single Blog ==================
export const getBlogById = async (req, res) => {
  try {
    const { blogId } = req.params;
    const blog = await Blog.findById(blogId);
    if (!blog)
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    res.json({ success: true, blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// =============== Delete Blog ==================
export const deleteBlogById = async (req, res) => {
  try {
    const { id } = req.body;
    const blog = await Blog.findById(id);

    // Delete all comments associated with the blog
    await Comment.deleteMany({ blog: id });

    if (!blog)
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });

    await blog.deleteOne();
    res.json({ success: true, message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// =============== Toggle Publish ==================
export const togglePublish = async (req, res) => {
  try {
    const { id } = req.body;
    const blog = await Blog.findById(id);
    if (!blog)
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });

    blog.isPublished = !blog.isPublished;
    await blog.save();
    res.json({
      success: true,
      message: `Blog ${
        blog.isPublished ? "published" : "unpublished"
      } successfully`,
      blog,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// =============== Add Comment ==================
export const addComment = async (req, res) => {
  try {
    const { blog, name, content } = req.body;

    // Validate blog exists
    const existingBlog = await Blog.findById(blog);
    if (!existingBlog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }

    // Create comment
    const comment = await Comment.create({ blog, name, content });
    res.json({ success: true, message: "Comment added for review", comment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// =============== Get Blog Comments ==================
export const getBlogComments = async (req, res) => {
  try {
    const { blogId } = req.params;
    const comments = await Comment.find({
      blog: blogId,
      isApproved: true,
    }).sort({ createdAt: -1 });
    res.json({ success: true, comments });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};



export const generateContent = async (req, res) => {
    try {
        const { prompt } = req.body;
        const content = await main(prompt + ' Generate a blog content for this topic in simple text format')
        res.json({success: true, content})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}