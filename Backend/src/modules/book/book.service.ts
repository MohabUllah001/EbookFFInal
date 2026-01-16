import ApiError from "../../utils/ApiError";
import type { IBook } from "./book.interface";
import { Book } from "./book.model";

// ➕ create book
const createBook = async (payload: IBook) => {
  return Book.create(payload);
};

// 🌍 public → only active books
const getActiveBooks = async () => {
  return Book.find({ status: "active" }).sort({ createdAt: -1 });
};

// 🔐 admin → all books
const getAllBooks = async () => {
  return Book.find().sort({ createdAt: -1 });
};

// ✍️ author → own books
const getBooksByAuthor = async (authorId: string) => {
  return Book.find({ authorId }).sort({ createdAt: -1 });
};

// 📘 single book
const getSingleBook = async (id: string) => {
  const book = await Book.findById(id);
  if (!book) throw new ApiError(404, "Book not found");
  return book;
};

// ✅ admin approve
const approveBook = async (id: string) => {
  const book = await Book.findByIdAndUpdate(
    id,
    { status: "active" },
    { new: true }
  );

  if (!book) throw new ApiError(404, "Book not found");
  return book;
};

// 🔁 admin toggle
const toggleBookStatus = async (id: string) => {
  const book = await Book.findById(id);
  if (!book) throw new ApiError(404, "Book not found");

  book.status = book.status === "active" ? "pending" : "active";
  await book.save();

  return book;
};

// ❌ delete book (ADMIN / AUTHOR)
const deleteBook = async (id: string) => {
  const book = await Book.findByIdAndDelete(id);
  if (!book) {
    throw new ApiError(404, "Book not found");
  }
  return book;
};

// 🔐 purchase book (after payment success)
const purchaseBook = async (bookId: string, userId: string) => {
  const book = await Book.findById(bookId);

  if (!book) {
    throw new ApiError(404, "Book not found");
  }

  if (book.status !== "active") {
    throw new ApiError(403, "Book is not active");
  }

  if (book.buyers.includes(userId)) {
    throw new ApiError(400, "Book already purchased");
  }

  book.buyers.push(userId);
  await book.save();

  return book;
};


// ✅ EXPORT EVERYTHING (IMPORTANT)
export const BookService = {
  createBook,
  getActiveBooks,
  getAllBooks,
  getBooksByAuthor,
  getSingleBook,
  approveBook,
  toggleBookStatus,
  deleteBook,        // 🔥 THIS WAS MISSING
  purchaseBook,
};
