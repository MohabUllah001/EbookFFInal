import { Request, Response } from "express";
import { AuthService } from "./auth.service";

export const register = async (req: Request, res: Response) => {
  const user = await AuthService.register(req.body);

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: user,
  });
};

export const login = async (req: Request, res: Response) => {
  const result = await AuthService.login(req.body);

  res.status(200).json({
    success: true,
    message: "Login successful",
    data: result,
  });
};
