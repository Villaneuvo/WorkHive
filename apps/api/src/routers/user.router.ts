import { getUserById } from "@/controllers/user.controller";
import { Router } from "express";

const router = Router();

router.get("/:id", getUserById);

export default router;
