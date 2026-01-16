export type UserRole = "user" | "author" | "admin";

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  isActive: boolean;
}




