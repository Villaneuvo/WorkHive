import { userChatHistory, userChatList, userSendChat } from "@/controllers/chat.controller";
import express from "express";

const router = express.Router();

router.post("/send", userSendChat);
router.post("/history", userChatHistory);
router.get("/list", userChatList);

export default router;
