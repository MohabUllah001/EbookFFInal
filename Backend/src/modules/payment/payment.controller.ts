import asyncHandler from "../../middlewares/asyncHandler";
import { PaymentService } from "./payment.service";
import { BookService } from "../book/book.service";
import type { Response } from "express";

// 🔐 STEP 1: Init payment
export const initPayment = asyncHandler(async (req: any, res: Response) => {
  const userId = req.user.userId;
  const { amount, bookId } = req.body;

  const tranId = `TXN_${Date.now()}`;

  const data = {
    total_amount: amount,
    currency: "BDT",
    tran_id: tranId,

    // ✅ FIXED PORT (3000)
    success_url: `http://localhost:3000/api/payment/success?bookId=${bookId}&userId=${userId}`,
    fail_url: "http://localhost:3000/api/payment/fail",
    cancel_url: "http://localhost:3000/api/payment/cancel",

    cus_email: req.user.email,
  };

  const result = await PaymentService.initSSLPayment(data);

  res.json({
    success: true,
    url: result.GatewayPageURL,
  });
});

// ✅ STEP 2: SUCCESS callback
export const paymentSuccess = asyncHandler(async (req: any, res: Response) => {
  const { bookId, userId } = req.query as {
    bookId: string;
    userId: string;
  };

  // 🔥 Purchase happens ONLY here
  await BookService.purchaseBook(bookId, userId);

  // ✅ Frontend success page
  res.redirect("http://localhost:5173/payment-success");
});

// ❌ STEP 3: FAIL
export const paymentFail = asyncHandler(async (req: any, res: Response) => {
  res.redirect("http://localhost:5173/payment-failed");
});

// ❌ STEP 4: CANCEL
export const paymentCancel = asyncHandler(async (req: any, res: Response) => {
  res.redirect("http://localhost:5173/payment-cancel");
});
