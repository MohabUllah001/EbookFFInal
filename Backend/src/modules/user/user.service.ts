import bcrypt from "bcrypt";
import ApiError from "../../utils/ApiError";
import { User } from "./user.model";
import { HydratedDocument } from "mongoose";
import { IUser } from "./user.interface";

// =======================
// CREATE USER
// =======================
const createUser = async (payload: IUser) => {
  const exists = await User.findOne({ email: payload.email });
  if (exists) {
    throw new ApiError(400, "User already exists");
  }

  const hashedPassword = await bcrypt.hash(payload.password, 10);

  const user = await User.create({
    ...payload,
    password: hashedPassword,
  });

  return user;
};

// =======================
// GET ALL USERS (ADMIN)
// =======================
const getAllUsers = async () => {
  return User.find().select("-password");
};

// =======================
// GET SINGLE USER
// =======================
const getUserById = async (id: string) => {
  const user = await User.findById(id).select("-password");
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  return user;
};

// =======================
// UPDATE USER ROLE (ADMIN)
// =======================
const updateUserRole = async (id: string, role: string) => {
  const user = await User.findByIdAndUpdate(
    id,
    { role },
    { new: true }
  ).select("-password");

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return user;
};

// =======================
// ACTIVATE / DEACTIVATE USER (ADMIN)
// =======================
const toggleUserStatus = async (id: string) => {
  const user = await User.findById(id);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  user.isActive = !user.isActive;
  await user.save();

  return user;
};

// =======================
// UPDATE LOGGED-IN USER PROFILE
// (ONLY name & password)
// =======================
const updateMyProfile = async (
  userId: string,
  payload: { name?: string; password?: string }
) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const typedUser = user as HydratedDocument<IUser>;

  if (payload.name) {
    typedUser.name = payload.name;
  }

  if (payload.password) {
    typedUser.password = await bcrypt.hash(payload.password, 10);
  }

  await typedUser.save();

  return typedUser.toObject({
    versionKey: false,
    transform: (_, ret: any) => {
      delete ret.password;
      return ret;
    },
  });
};

// =======================
// EXPORT SERVICE
// =======================
export const UserService = {
  createUser,
  getAllUsers,
  getUserById,
  updateUserRole,
  toggleUserStatus,
  updateMyProfile,
};
