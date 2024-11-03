import { getCV, getUserCVInfo, postCV } from "@/controllers/generator.controller";
import { Router } from "express";

const router = Router();

router.get("/cv", getCV);
router.get("/userInfo/:userId", getUserCVInfo);
router.post("/cv/:userId", postCV);

export default router;
