import bcrypt from "bcrypt";
import ApiError from "../../utils/ApiError";
import { IUser } from "./user.interface";
import { User } from "./user.model";

// create user
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

// get all users (admin)
const getAllUsers = async () => {
  return User.find().select("-password");
};

// get single user
const getUserById = async (id: string) => {
  const user = await User.findById(id).select("-password");
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  return user;
};

// update role (admin approve author)
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

// 🔥 activate / deactivate user (admin)
const toggleUserStatus = async (id: string) => {
  const user = await User.findById(id);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  user.isActive = !user.isActive;
  await user.save();

  return user;
};


export const UserService = {
  createUser,
  getAllUsers,
  getUserById,
  updateUserRole,
  toggleUserStatus
};
