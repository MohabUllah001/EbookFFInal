import express from "express";
import cors from "cors";
import path from "path";
import errorHandler from "./middlewares/errorHandler";

import authRoutes from "./modules/auth/auth.route";
import userRoutes from "./modules/user/user.route";
import blogRoutes from "./modules/blog/blog.route";
import bookRoutes from "./modules/book/book.route";
import paymentRoutes from "./modules/payment/payment.route";
import authorRequestRoutes from "./modules/authorRequest/authorRequest.route";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

/**
 * 🔥 IMPORTANT:
 * DO NOT use express.json() globally
 * It breaks multipart/form-data (multer)
 */

// ✅ JSON routes only
app.use("/api/auth", express.json(), authRoutes);
app.use("/api/users", express.json(), userRoutes);
app.use("/api/blogs", express.json(), blogRoutes);
app.use("/api/payment", express.json(), paymentRoutes);
app.use(
  "/api/author-requests",
  express.json(),
  authorRequestRoutes
);

// ✅ FILE upload route (NO express.json here)
app.use("/api/books", bookRoutes);

// ✅ serve uploaded files
app.use(
  "/uploads",
  express.static(path.join(process.cwd(), "uploads"))
);

// ✅ GLOBAL ERROR HANDLER (LAST)
app.use(errorHandler);

export default app;
