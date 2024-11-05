import dotenv from "dotenv";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
dotenv.config();

import prisma from "@/prisma";
import { chatSchema } from "@/schemas/chat.schema";

export const userSendChat = async (req: Request, res: Response) => {
    const parsedData = chatSchema.parse(req.body);
    const { senderId, recipientId, message } = parsedData;

    try {
        const chat = await prisma.chat.create({
            data: {
                senderId,
                recipientId,
                message,
                status: "terkirim",
            },
        });
        res.status(201).json(chat);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating chat" });
    }
};

// Endpoint untuk mengambil riwayat chat dengan pengguna tertentu
export const userChatHistory = async (req: Request, res: Response) => {
    const { senderId, recipientId } = req.body;

    try {
        const chatHistory = await prisma.chat.findMany({
            where: {
                OR: [
                    {
                        senderId: parseInt(senderId),
                        recipientId: parseInt(recipientId),
                    },
                    {
                        senderId: parseInt(recipientId),
                        recipientId: parseInt(senderId),
                    },
                ],
            },
            orderBy: {
                timestamp: "asc",
            },
        });
        res.status(200).json({
            data: chatHistory,
            message: "Chat history fetched successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching chat history" });
    }
};

// Endpoint untuk mendapatkan daftar chat terbaru per pengguna
export const userChatList = async (req: Request, res: Response) => {
    const token = req.headers.authorization?.split(" ")[1];

    const decoded = jwt.verify(token as string, process.env.JWT_SECRET || "default_secret");

    const { id } = decoded as { id: number };
    const user = await prisma.user.findUnique({
        where: {
            id: id,
        },
        include: {
            profile: true,
        },
    });

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    const userId = user.id;

    try {
        const chatList = await prisma.chat.findMany({
            where: {
                senderId: userId, // hanya mengambil pesan yang dikirim oleh userId
            },
            orderBy: {
                timestamp: "desc",
            },
            distinct: ["senderId", "recipientId"],
            include: {
                recipient: true,
            },
        });
        res.status(200).json({
            data: chatList,
            message: "Chat list fetched successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching chat list" });
    }
};
