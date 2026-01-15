import ApiError from "../../utils/ApiError";
import { Book } from "./book.model";

// 🔐 Purchase book (after payment success)
const purchaseBook = async (bookId: string, userId: string) => {
  const book = await Book.findById(bookId);
  if (!book) throw new ApiError(404, "Book not found");

  if (book.status !== "active") {
    throw new ApiError(403, "Book is not available");
  }

  if (book.buyers.includes(userId)) {
    throw new ApiError(400, "Book already purchased");
  }

  book.buyers.push(userId);
  await book.save();

  return book;
};

// 🔐 Read book (buyer / author / admin)
const readBook = async (
  bookId: string,
  userId: string,
  role: string
) => {
  const book = await Book.findById(bookId);
  if (!book) throw new ApiError(404, "Book not found");

  if (role === "admin") return book;
  if (book.authorId === userId) return book;
  if (book.buyers.includes(userId)) return book;

  throw new ApiError(403, "You are not allowed to read this book");
};

// 🔐 My Library (purchased books)
const getMyBooks = async (userId: string) => {
  return await Book.find({
    buyers: userId,
    status: "active",
  });
};

export const BookService = {
  purchaseBook,
  readBook,
  getMyBooks,
};
