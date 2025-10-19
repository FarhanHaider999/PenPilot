import express from "express";
import {
  addBlog,
  deleteBlogById,
  getAllBlogs,
  getBlogById,
  togglePublish,
} from "../controllers/blogController.js";
import upload from "../middleware/multer.js";
import auth, { optionalAuth } from "../middleware/auth.js";

const blogRouter = express.Router();

blogRouter.post("/add", upload.single("image"), auth, addBlog);
blogRouter.get("/all", optionalAuth, getAllBlogs);
blogRouter.get("/:blogId", getBlogById);
blogRouter.post("/:blogId", deleteBlogById);
blogRouter.post("/toggle-publish", auth, togglePublish);

export default blogRouter;
