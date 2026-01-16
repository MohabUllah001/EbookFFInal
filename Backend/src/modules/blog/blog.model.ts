import { Schema, model } from "mongoose";
import type { IBlog } from "./blog.interface";

const blogSchema = new Schema<IBlog>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    authorId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "active"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export const Blog = model<IBlog>("Blog", blogSchema);
