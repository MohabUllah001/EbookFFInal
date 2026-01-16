export interface IBlog {
  title: string;
  description: string;
  image?: string;
  authorId: string;   // user বা author – দুজনেরই id
  status: "pending" | "active";
}
