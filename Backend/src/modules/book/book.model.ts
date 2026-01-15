import { Schema, model } from "mongoose";
import type { IBook } from "./book.interface";

const bookSchema = new Schema<IBook>(
  {
    title: { type: String, required: true },
    abstract: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    cover: { type: String, required: true },
    authorId: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "active"],
      default: "pending",
    },
    buyers: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

export const Book = model<IBook>("Book", bookSchema);
