import type { NextFunction, Response } from "express";
import ApiError from "../utils/ApiError";
import { AuthRequest } from "./auth";

const authorize =
  (...roles: string[]) =>
  (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      throw new ApiError(403, "Forbidden");
    }
    next();
  };

export default authorize;
