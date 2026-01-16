import { Response } from "express";
import asyncHandler from "../../middlewares/asyncHandler";
import { BlogService } from "./blog.service";

// ✅ USER + AUTHOR → create blog
export const createBlog = asyncHandler(
  async (req: any, res: Response) => {
    const blog = await BlogService.createBlog({
      ...req.body,
      authorId: req.user.userId,
      status: "pending",
    });

    res.status(201).json({
      success: true,
      data: blog,
    });
  }
);

// 🌍 PUBLIC → active blogs only
export const getBlogs = asyncHandler(
  async (_req:any, res: Response) => {
    const blogs = await BlogService.getActiveBlogs();
    res.json({ success: true, data: blogs });
  }
);

// 🔐 ADMIN → all blogs
export const getAllBlogsAdmin = asyncHandler(
  async (_req: any, res: Response) => {
    const blogs = await BlogService.getAllBlogs();
    res.json({ success: true, data: blogs });
  }
);

// 🔐 USER / AUTHOR → my blogs
export const getMyBlogs = asyncHandler(
  async (req: any, res: Response) => {
    const blogs = await BlogService.getBlogsByAuthor(
      req.user.userId
    );

    res.json({ success: true, data: blogs });
  }
);

// 🔐 ADMIN → approve
export const approveBlog = asyncHandler(
  async (req: any, res: Response) => {
    const blog = await BlogService.approveBlog(req.params.id);
    res.json({ success: true, data: blog });
  }
);

// 🔐 ADMIN → toggle
export const toggleBlogStatus = asyncHandler(
  async (req: any, res: Response) => {
    const blog = await BlogService.toggleBlogStatus(req.params.id);
    res.json({ success: true, data: blog });
  }
);

// 🔐 OWNER / ADMIN → delete
export const deleteBlog = asyncHandler(
  async (req: any, res: Response) => {
    await BlogService.deleteBlog(req.params.id);
    res.json({ success: true });
  }
);
