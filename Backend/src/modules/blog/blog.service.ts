import { Response } from "express";
import asyncHandler from "../../middlewares/asyncHandler";
import ApiError from "../../utils/ApiError";
import type { IBlog } from "./blog.interface";
import { Blog } from "./blog.model";

// ➕ create blog
const createBlog = async (payload: IBlog) => {
  return Blog.create(payload);
};

// 🌍 public → only active blogs
const getActiveBlogs = async () => {
  return Blog.find({ status: "active" }).sort({ createdAt: -1 });
};

// 🔐 admin → all blogs
const getAllBlogs = async () => {
  return Blog.find().sort({ createdAt: -1 });
};

// ✅ approve blog
const approveBlog = async (id: string) => {
  const blog = await Blog.findByIdAndUpdate(
    id,
    { status: "active" },
    { new: true }
  );

  if (!blog) {
    throw new ApiError(404, "Blog not found");
  }

  return blog;
};

// 🔁 admin toggle blog status
const toggleBlogStatus = async (id: string) => {
  const blog = await Blog.findById(id);
  if (!blog) {
    throw new ApiError(404, "Blog not found");
  }

  blog.status = blog.status === "active" ? "pending" : "active";
  await blog.save();

  return blog;
};

// ❌ delete blog
const deleteBlog = async (id: string) => {
  const blog = await Blog.findByIdAndDelete(id);
  if (!blog) {
    throw new ApiError(404, "Blog not found");
  }
};

// ✍️ get blogs by user / author
const getBlogsByAuthor = async (authorId: string) => {
  return Blog.find({ authorId }).sort({ createdAt: -1 });
};

export const getAllBlogsAdmin = asyncHandler(
  async (_req: any, res: Response) => {
    const blogs = await BlogService.getAllBlogs();
    res.json({ success: true, data: blogs });
  }
);


export const BlogService = {
  createBlog,
  getActiveBlogs,
  getAllBlogs,
  approveBlog,
  toggleBlogStatus,
  deleteBlog,
  getBlogsByAuthor,
  getAllBlogsAdmin
};
