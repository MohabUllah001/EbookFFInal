import { Router } from "express";
import auth from "../../middlewares/auth";
import { roleGuard } from "../../middlewares/roleGuard";
import { upload } from "../../middlewares/upload";
import {
  createBook,
  getBooks,
  getAllBooksAdmin,
  toggleBookStatus,
  deleteBook,
  getMyBooks,
} from "./book.controller";

const router = Router();

// 🌍 Public
router.get("/", getBooks);

// 🔐 Admin
router.get(
  "/admin/all",
  auth,
  roleGuard("admin"),
  getAllBooksAdmin
);

// ✍️ Author upload
router.post(
  "/",
  auth,
  roleGuard("author"),
  upload.fields([
    { name: "cover", maxCount: 1 },
    { name: "pdf", maxCount: 1 },
  ]),
  createBook
);

// 🔐 Admin toggle
router.patch(
  "/:id/toggle-status",
  auth,
  roleGuard("admin"),
  toggleBookStatus
);

router.patch(
  "/:id/toggle-status",
  auth,
  roleGuard("admin"),
  toggleBookStatus
);

router.delete(
  "/:id",
  auth,
  deleteBook
);

// book.route.ts
router.get(
  "/author/my",
  auth,
  roleGuard("author"),
  getMyBooks
);


export default router;
