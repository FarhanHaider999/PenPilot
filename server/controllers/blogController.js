import client from "../configs/imageKit.js";
import Blog from "../models/Blogs.js";
import fs from "fs";

// Add Blog
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

    // Upload image to ImageKit
    const response = await client.files.upload({
      file: fs.createReadStream(imageFile.path),
      fileName: imageFile.originalname,
      folder: "/blogs",
    });

    // Optimize image
    const optimizedImageUrl = client.helper.buildSrc({
      urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
      src: response.filePath,
      transformation: [
        { quality: "auto" },
        { format: "webp" },
        { width: 1280 },
      ],
    });

    // Delete local temp file
    fs.unlinkSync(imageFile.path);

    // Create blog in DB
    await Blog.create({
      title,
      subTitle,
      description,
      category,
      image: optimizedImageUrl,
      author: req.user.id,
      isPublished,
    });

    return res
      .status(201)
      .json({ success: true, message: "Blog added successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Get All Blogs (for logged-in user)
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ author: req.user.id }).sort({
      createdAt: -1,
    });
    return res.json({ success: true, blogs });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Get Single Blog
export const getBlogById = async (req, res) => {
  try {
    const { blogId } = req.params;
    const blog = await Blog.findById(blogId);

    if (!blog || blog.author.toString() !== req.user.id) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found or unauthorized" });
    }

    return res.json({ success: true, blog });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Delete Blog
export const deleteBlogById = async (req, res) => {
  try {
    const { id } = req.body;
    const blog = await Blog.findById(id);

    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }

    if (blog.author.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ success: false, message: "Not authorized to delete" });
    }

    await blog.deleteOne();

    return res.json({ success: true, message: "Blog deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Toggle Blog Publish Status
export const togglePublish = async (req, res) => {
  try {
    const { id } = req.body;
    const blog = await Blog.findById(id);

    if (!blog || blog.author.toString() !== req.user.id) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found or unauthorized" });
    }

    blog.isPublished = !blog.isPublished;
    await blog.save();

    return res.json({
      success: true,
      message: "Blog publish status updated",
      blog,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
