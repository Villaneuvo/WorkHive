import prisma from "@/prisma";
import { Request, Response } from 'express';


export const submitRating = async (req: Request, res: Response) => {
    const { adminId, userId, rating } = req.body;
    try {
        const newRating = await prisma.companyRating.create({
            data: { adminId, userId, rating },
        });

        const ratings = await prisma.companyRating.findMany({
            where: { adminId },
            select: { rating: true },
        });

        const totalReviews = ratings.length;
        const companyRating = ratings.reduce((acc, item) => acc + item.rating, 0) / totalReviews;

        await prisma.admin.update({
            where: { id: adminId },
            data: { companyRating, totalReviews },
        });

        res.status(201).json({ message: 'Rating submitted successfully', newRating });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error submitting rating' });
    }
};