import { Types } from "mongoose";

export interface IBook {
  title: string;
  abstract: string;
  category: string;
  price: number;
  cover: string;
  pdfUrl: string;
  authorId: Types.ObjectId;
  status: "pending" | "active";
  buyers: string[];
}
