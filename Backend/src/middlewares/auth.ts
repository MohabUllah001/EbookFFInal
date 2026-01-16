import jwt from "jsonwebtoken";
import type { NextFunction, Response, Request } from "express";
import ApiError from "../utils/ApiError";

export interface AuthRequest extends Request {
  user?: {
    userId: string;
    role: string;
  };
}

const auth = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new ApiError(401, "Unauthorized access");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as {
      userId: string;
      role: string;
    };

    req.user = decoded;
    next();
  } catch {
    throw new ApiError(401, "Invalid or expired token");
  }
};

export default auth;
