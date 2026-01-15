import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { env } from "../../config/env";
import { User } from "../user/user.model";

interface IRegisterPayload {
  name: string;
  email: string;
  password: string;
}

interface ILoginPayload {
  email: string;
  password: string;
}

const register = async (payload: IRegisterPayload) => {
  const { name, email, password } = payload;

  // 🔍 check user exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists");
  }

  // 🔐 hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // 👤 create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role: "user", // default role
  });

  // ❌ password return করবো না
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
};

const login = async (payload: ILoginPayload) => {
  const { email, password } = payload;

  // 🔍 find user
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid email or password");
  }

  // 🔐 compare password
  const isPasswordMatch = await bcrypt.compare(
    password,
    user.password
  );

  if (!isPasswordMatch) {
    throw new Error("Invalid email or password");
  }

  // 🎟️ generate JWT
  const token = jwt.sign(
    {
      userId: user._id,
      role: user.role,
    },
    env.JWT_SECRET!,
    {
      expiresIn: "7d",
    }
  );

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};

export const AuthService = {
  register,
  login,
};
