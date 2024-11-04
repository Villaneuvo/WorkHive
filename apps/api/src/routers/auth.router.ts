import {
    adminRegister,
    forgotPassword,
    resetPassword,
    userLogin,
    userRegister,
    verifyEmail,
} from "@/controllers/auth.controller";
import express from "express";

const router = express.Router();

router.post("/register", userRegister);
router.post("/login", userLogin);
router.post("/admin/register", adminRegister);
router.post("/verify", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

export default router;
