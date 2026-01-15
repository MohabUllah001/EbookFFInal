import express from "express";
import cors from "cors";
import errorHandler from "./middlewares/errorHandler";

import authRoutes from "./modules/auth/auth.route";
import blogRoutes from "./modules/blog/blog.route";
import bookRoutes from "./modules/book/book.route";
import paymentRoutes from "./modules/payment/payment.route";


const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/payment", paymentRoutes);

app.use(errorHandler);

export default app;
