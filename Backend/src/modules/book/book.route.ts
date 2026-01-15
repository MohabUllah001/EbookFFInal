import { Router } from "express";
import auth from "../../middlewares/auth";
import { roleGuard } from "../../middlewares/roleGuard";
import {
  purchaseBook,
  readBook,
  getMyBooks,
} from "./book.controller";

const router = Router();

// 🔐 Purchase book (after payment)
router.post(
  "/:bookId/purchase",
  auth,
  roleGuard("user", "author"),
  purchaseBook
);

// 🔐 Read book (buyer / author / admin)
router.get(
  "/:bookId/read",
  auth,
  readBook
);

// 🔐 My Library (purchased books)
router.get(
  "/my-books",
  auth,
  getMyBooks
);

export default router;
