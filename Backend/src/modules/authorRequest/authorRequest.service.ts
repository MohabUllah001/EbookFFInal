import ApiError from "../../utils/ApiError";
import { User } from "../user/user.model";
import { AuthorRequest } from "./authorRequest.model";

// user applies as author
const createAuthorRequest = async (userId: string) => {
  const exists = await AuthorRequest.findOne({ userId });
  if (exists) {
    throw new ApiError(400, "Author request already exists");
  }

  return AuthorRequest.create({ userId });
};

// admin approves request
const approveAuthorRequest = async (requestId: string) => {
  const request = await AuthorRequest.findById(requestId);
  if (!request) {
    throw new ApiError(404, "Author request not found");
  }

  request.status = "approved";
  await request.save();

  await User.findByIdAndUpdate(request.userId, {
    role: "author",
  });

  return request;
};

// admin rejects request
const rejectAuthorRequest = async (requestId: string) => {
  const request = await AuthorRequest.findById(requestId);
  if (!request) {
    throw new ApiError(404, "Author request not found");
  }

  request.status = "rejected";
  await request.save();

  return request;
};

// 🔥 ADMIN: get all pending author requests WITH USER INFO
const getAllAuthorRequests = async () => {
  const requests = await AuthorRequest.find({
    status: "pending",
  });

  const result = await Promise.all(
    requests.map(async (req) => {
      const user = await User.findById(req.userId).select(
        "name email"
      );

      return {
        _id: req._id,
        status: req.status,
        userId: req.userId,
        name: user?.name || "Unknown",
        email: user?.email || "Unknown",
      };
    })
  );

  return result;
};

export const AuthorRequestService = {
  createAuthorRequest,
  approveAuthorRequest,
  rejectAuthorRequest,
  getAllAuthorRequests,
};
