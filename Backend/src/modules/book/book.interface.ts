export interface IBook {
  title: string;
  abstract: string;
  category: string;
  price: number;
  cover: string;
  pdfUrl: string;
  authorId: string;
  status: "pending" | "active";
  buyers: string[];
}