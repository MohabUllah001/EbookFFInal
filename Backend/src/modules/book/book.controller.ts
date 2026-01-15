import type { Response } from "express";
import asyncHandler from "../../middlewares/asyncHandler";
import { BookService } from "./book.service";

// 🔐 Purchase (after payment)
export const purchaseBook = asyncHandler(async (req: any, res: Response) => {
  const userId = req.user.userId;
  const { bookId } = req.params;

  const book = await BookService.purchaseBook(bookId, userId);

  res.status(200).json({
    success: true,
    message: "Book purchased successfully",
    data: book,
  });
});

// 🔐 Read book
export const readBook = asyncHandler(async (req: any, res: Response) => {
  const userId = req.user.userId;
  const role = req.user.role;
  const { bookId } = req.params;

  const book = await BookService.readBook(bookId, userId, role);

  res.status(200).json({
    success: true,
    data: book,
  });
});

// 🔐 My Library
export const getMyBooks = asyncHandler(async (req: any, res: Response) => {
  const userId = req.user.userId;

  const books = await BookService.getMyBooks(userId);

  res.status(200).json({
    success: true,
    data: books,
  });
});
