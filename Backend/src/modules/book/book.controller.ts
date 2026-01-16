import type { Response } from "express";
import asyncHandler from "../../middlewares/asyncHandler";
import ApiError from "../../utils/ApiError";
import { BookService } from "./book.service";

/**
 * 🔐 Author → Create Book (with cover + pdf)
 */
export const createBook = asyncHandler(
  async (req: any, res: Response) => {
    const { title, abstract, category, price } = req.body;

    const coverFile = req.files?.cover?.[0];
    const pdfFile = req.files?.pdf?.[0];

    if (!coverFile || !pdfFile) {
      throw new ApiError(400, "Cover and PDF are required");
    }

    const book = await BookService.createBook({
      title,
      abstract,
      category,
      price: Number(price),
      cover: `/uploads/${coverFile.filename}`,
      pdfUrl: `/uploads/${pdfFile.filename}`,
      authorId: req.user.userId,
      status: "pending",
      buyers: [],
    });

    res.status(201).json({
      success: true,
      data: book,
    });
  }
);

/**
 * 🌍 Public → Active books only
 */
export const getBooks = asyncHandler(
  async (_req: any, res: Response) => {
    const books = await BookService.getActiveBooks();
    res.json({
      success: true,
      data: books,
    });
  }
);

/**
 * 🔐 Admin → All books (active + pending)
 */
export const getAllBooksAdmin = asyncHandler(
  async (_req: any, res: Response) => {
    const books = await BookService.getAllBooks();
    res.json({
      success: true,
      data: books,
    });
  }
);

/**
 * 🔁 Admin → Toggle book status (active <-> pending)
 */
export const toggleBookStatus = asyncHandler(
  async (req: any, res: Response) => {
    const book = await BookService.toggleBookStatus(
      req.params.id
    );

    res.json({
      success: true,
      data: book,
    });
  }
);

/**
 * ❌ Admin / Author → Delete book
 */
export const deleteBook = asyncHandler(
  async (req: any, res: Response) => {
    await BookService.deleteBook(req.params.id);

    res.json({
      success: true,
      message: "Book deleted successfully",
    });
  }
);

// 🔐 AUTHOR → get own books
export const getMyBooks = asyncHandler(
  async (req: any, res: Response) => {
    const authorId = req.user.userId; // 🔥 JWT থেকে

    const books =
      await BookService.getBooksByAuthor(authorId);

    res.json({
      success: true,
      data: books,
    });
  }
);
