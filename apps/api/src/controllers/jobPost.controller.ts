import prisma from '@/prisma';
import { Request, Response } from 'express';
import { createJobPostSchema } from '@/schemas/jobPost.schema';
import { ZodError } from 'zod';

export async function getAllJobPostsByAdmin(req: Request, res: Response) {
    try {
        const { adminId } = req.params;
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const offset = (page - 1) * limit;
        const { search, category } = req.query;

        const whereClause: any = {};
        whereClause.adminId = +adminId;

        if (search) {
            whereClause.OR = [{ title: { contains: search as string } }];
        }

        if (category) {
            whereClause.category = category as string;
        }

        const [jobPosts, totalJobPosts] = await Promise.all([
            prisma.jobPost.findMany({
                where: whereClause,
                include: {
                    tags: true,
                    jobApplications: true,
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
    } catch (e) {
        res.status(500).json({ message: 'Internal server error', error: e });
    }
}

export async function createJobPost(req: Request, res: Response) {
    try {
        const parsedData = createJobPostSchema.parse(req.body);

        await prisma.$transaction(async (prisma) => {
            const newJobPost = await prisma.jobPost.create({
                data: {
                    title: parsedData.title,
                    description: parsedData.description,
                    category: parsedData.category,
                    cityLocation: parsedData.cityLocation,
                    applicationDeadline: parsedData.applicationDeadline,
                    adminId: parsedData.adminId,
                    ...(parsedData.bannerUrl && { bannerUrl: parsedData.bannerUrl }),
                    ...(parsedData.salary && { salary: parsedData.salary }),
                },
            });

            if (parsedData.tags && parsedData.tags.length > 0) {
                const jobTags = parsedData.tags.map((tag) => ({
                    name: tag,
                    jobPostId: newJobPost.id,
                }));

                await prisma.jobTag.createMany({
                    data: jobTags,
                });
            }

            res.status(201).json(newJobPost);
        });
    } catch (e) {
        if (e instanceof ZodError) {
            res.status(400).json({ errors: e.errors });
        } else {
            res.status(500).json({ message: 'Internal server error', error: e });
        }
    }
}
