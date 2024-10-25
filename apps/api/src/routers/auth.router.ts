import { adminRegister, userRegister, verifyEmail } from "@/controllers/auth.controller";
import express from "express";

const router = express.Router();

router.post("/register", userRegister);
router.post("/admin/register", adminRegister);
router.post("/verify", verifyEmail);

export default router;
