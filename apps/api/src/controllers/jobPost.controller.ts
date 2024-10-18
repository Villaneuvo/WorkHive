import prisma from '@/prisma';
import { Request, Response } from 'express';

export async function getAllPosts(req: Request, res: Response) {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const cityLocation = req.query.cityLocation as string || "Ambatukam";
        const offset = (page - 1) * limit;
        const title = req.query.title as string;

        const whereClause: any = {};

        if (title) {
            whereClause.title = title
        }

        if (cityLocation) {
            whereClause.cityLocation = cityLocation;
        }

        if (cityLocation === "Ambatukam") {
            delete whereClause.cityLocation;
        }

        const [jobPosts, totalJobPosts] = await Promise.all([
            prisma.jobPost.findMany({
                where: whereClause,
                include: {
                    admin: {
                        select: {
                            companyName: true,
                            phoneNumber: true,
                        },
                    },
                    tags: true,
                },
                skip: offset,
                take: limit,
            }),
            prisma.jobPost.count({
                where: whereClause,
            }),
        ]);


        res.status(200).json({
            data: jobPosts,
            pagination: {
                totalItems: totalJobPosts,
                totalPages: Math.ceil(totalJobPosts / limit),
                currentPage: page,
                pageSize: limit,
            },
        });

    } catch (error) {
        res.status(500).json({ message: "Failed to retrive posts", error })
    }
}