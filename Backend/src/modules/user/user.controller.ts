import { Response } from "express";
import asyncHandler from "../../middlewares/asyncHandler";
import { UserService } from "./user.service";

// create user
export const createUser = asyncHandler(async (req: any, res: Response) => {
  const user = await UserService.createUser(req.body);
  res.status(201).json({
    success: true,
    data: user,
  });
});

// get all users
export const getAllUsers = asyncHandler(async (req: any, res: Response) => {
  const users = await UserService.getAllUsers();
  res.json({
    success: true,
    data: users,
  });
});

// get single user
export const getUserById = asyncHandler(async (req:any, res: Response) => {
  const user = await UserService.getUserById(req.params.id);
  res.json({
    success: true,
    data: user,
  });
});

// update role (admin only)
export const updateUserRole = asyncHandler(async (req: any, res: Response) => {
  const { role } = req.body;
  const user = await UserService.updateUserRole(
    req.params.id,
    role
  );
  res.json({
    success: true,
    data: user,
  });
});

// 🔐 Admin → activate / deactivate user
export const toggleUserStatus = asyncHandler(
  async (req: any, res: Response) => {
    const user = await UserService.toggleUserStatus(
      req.params.id
    );

    res.json({
      success: true,
      data: user,
    });
  }
);
