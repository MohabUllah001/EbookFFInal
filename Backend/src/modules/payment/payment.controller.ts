import asyncHandler from "../../middlewares/asyncHandler";
import { PaymentService } from "./payment.service";
import { BookService } from "../book/book.service";
import { PurchaseService } from "../purchase/purchase.service";
import { env } from "../../config/env";
import ApiError from "../../utils/ApiError";
import { z } from "zod";
import type { Response } from "express";
import { Purchase } from "../purchase/purchase.model";
import { Types } from "mongoose";

/* ===================== VALIDATION ===================== */

const PaymentInitSchema = z.object({
  amount: z.number().positive(),
  bookId: z.string().optional(),           // single book
  bookIds: z.array(z.string()).optional(), // multiple books
});

/* ===================== INIT PAYMENT ===================== */

export const initPayment = asyncHandler(async (req: any, res: Response) => {
  const userId = req.user.userId;
  const role = req.user.role;

  const userEmail =
    req.user?.email ||
    req.body?.email ||
    "customer@ebook.local";

  const parsed = PaymentInitSchema.safeParse(req.body);
  if (!parsed.success) {
    throw new ApiError(400, "Invalid payment data");
  }

  const { amount, bookId, bookIds } = parsed.data;

  // 🔥 normalize book ids
  const ids: string[] =
    bookIds?.length ? bookIds : bookId ? [bookId] : [];

  if (ids.length === 0) {
    throw new ApiError(400, "No book selected for payment");
  }

  // 🔍 fetch books
  const books = await Promise.all(
    ids.map((id) => BookService.getSingleBook(id))
  );

  let total = 0;

  /* =====================================================
     🔐 CRITICAL CHECK: already purchased or inactive
     (THIS IS WHERE YOUR CODE IS PLACED)
  ===================================================== */

  for (const book of books) {
    const alreadyPurchased =
      await PurchaseService.hasPurchasedBook(
        userId,
        book._id.toString()
      );

    if (alreadyPurchased) {
      throw new ApiError(
        400,
        `You already purchased "${book.title}"`
      );
    }

    if (book.status !== "active") {
      throw new ApiError(403, `${book.title} is not active`);
    }

    total += book.price;
  }

  // 🔍 amount verification
  if (total !== amount) {
    throw new ApiError(400, "Payment amount mismatch");
  }

  const tranId = `TXN_${userId}_${Date.now()}`;
  const backendUrl =
    process.env.BACKEND_URL || "http://localhost:5000";

  const paymentData = {
    total_amount: amount,
    currency: "BDT",
    tran_id: tranId,

    success_url: `${backendUrl}/api/payment/success?userId=${userId}&role=${role}&bookIds=${ids.join(",")}`,
    fail_url: `${backendUrl}/api/payment/fail`,
    cancel_url: `${backendUrl}/api/payment/cancel`,

    cus_name: req.user.name || "Customer",
    cus_email: userEmail,
    cus_add1: "N/A",
    cus_city: "Dhaka",
    cus_country: "Bangladesh",
    cus_phone: "01700000000",

    shipping_method: "NO",
    product_name: books.map((b) => b.title).join(", "),
    product_category: "ebook",
    product_profile: "ebook",
  };

  const result = await PaymentService.initSSLPayment(paymentData);

  res.json({
    success: true,
    url: result.GatewayPageURL,
    transactionId: tranId,
  });
});

/* ===================== SUCCESS ===================== */

export const paymentSuccess = asyncHandler(async (req: any, res: Response) => {
  const { userId, role, bookIds } = req.query as {
    userId: string;
    role: "user" | "author" | "admin";
    bookIds: string;
  };

  if (!userId || !bookIds) {
    return res.redirect("http://localhost:5173/payment-failed");
  }

  const ids = bookIds.split(",");

  for (const bookId of ids) {
    const book = await BookService.getSingleBook(bookId);

    await Purchase.create({
      userId: new Types.ObjectId(userId),
      bookId: new Types.ObjectId(bookId),
      amount: book.price,
      transactionId: `TXN_${userId}_${Date.now()}`,
      status: "success",
    });
  }

  // 🎯 role-wise redirect
  let redirectUrl = "http://localhost:5173";

  if (role === "admin") {
    redirectUrl += "/dashboard/admin";
  } else if (role === "author") {
    redirectUrl += "/dashboard/author";
  } else {
    redirectUrl += "/dashboard/user";
  }

  return res.redirect(302, redirectUrl);
});

/* ===================== FAIL ===================== */

export const paymentFail = asyncHandler(async (_req: any, res: Response) => {
  return res.redirect("http://localhost:5173/payment-failed");
});

/* ===================== CANCEL ===================== */
/* ===================== CANCEL ===================== */
/* ===================== CANCEL ===================== */

export const paymentCancel = asyncHandler(async (_req: any, res: Response) => {
  return res.redirect(env.CLIENT_CANCEL_URL);
});
