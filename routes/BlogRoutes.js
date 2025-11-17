import express from "express";
import upload from "../middlewares/multer.js";
import {
  createBlog,
  getBlogs,
  getBlogBySlug,   
  removeBlogById,
  updateBlog,
} from "../controllers/blogController.js";

const blogRouter = express.Router();
blogRouter.post("/", upload.array("images", 4), createBlog);
blogRouter.get("/", getBlogs);
blogRouter.get("/:slug", getBlogBySlug);
blogRouter.put("/:id", upload.array("images", 4), updateBlog);
blogRouter.delete("/:id", removeBlogById);

export default blogRouter;
