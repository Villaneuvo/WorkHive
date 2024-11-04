import prisma from "@/prisma";
import { Request, Response } from 'express';

export const createEndorsement = async (req: Request, res: Response) => {
    const { userId, text, expiresAt, endorserId } = req.body;

    console.log("userId", userId);
    try {
        const endorsement = await prisma.endorsement.create({
            data: {
                userId,
                endorserId,
                text,
                expiresAt: new Date(expiresAt),
                isExpired: false,
            },
        });
        res.status(201).json(endorsement);
    } catch (error) {
        console.error("Error creating endorsement:", error);
        res.status(500).json({ message: "Failed to create endorsement", error });
    }
};

export const getUserEndorsements = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.id);

    try {
        const endorsements = await prisma.endorsement.findMany({
            where: { userId },
            include: { endorser: { select: { name: true } } },
        });
        res.status(200).json(endorsements);
    } catch (error) {
        console.error("Error retrieving endorsements:", error);
        res.status(500).json({ message: "Failed to retrieve endorsements", error });
    }
};