import { Router } from "express";
import { login, register, me } from "./auth.controller";
import auth from "../../middlewares/auth";

const router = Router();

router.post("/register", register);
router.post("/login", login);

// 🔐 JWT VERIFY
router.get("/me", auth, me);

export default router;
