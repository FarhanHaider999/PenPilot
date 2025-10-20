import express from "express";
import {
  addBlog,
  addComment,
  deleteBlogById,
  getAllBlogs,
  getBlogById,
  getBlogComments,
  togglePublish,
} from "../controllers/blogController.js";
import upload from "../middleware/multer.js";
import auth, { optionalAuth } from "../middleware/auth.js";

const blogRouter = express.Router();

blogRouter.post("/add", upload.single("image"), auth, addBlog);
blogRouter.post("/toggle-publish", togglePublish);
blogRouter.get("/all", optionalAuth, getAllBlogs);
blogRouter.post('/add-comment', addComment);
blogRouter.get('/comments/:blogId', getBlogComments);
blogRouter.get("/:blogId", getBlogById);
blogRouter.post("/:blogId", deleteBlogById);

export default blogRouter;
