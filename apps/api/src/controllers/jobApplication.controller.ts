import prisma from "@/prisma";
import { EducationalBackground } from "@prisma/client";
import { Request, Response } from "express";

export async function getAllJobApplicationByJobPostId(req: Request, res: Response) {
    const { jobPostId } = req.params;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = (page - 1) * limit;
    const { searchName, filterAge, filterSalary, filterEducation } = req.query;

    const whereClause: any = {
        jobId: +jobPostId,
        user: {},
    };
    if (searchName) {
        whereClause.user.name = { contains: searchName as string };
    }
    switch (filterAge) {
        case "below_20":
            whereClause.user.age = { lt: 20 };
            break;
        case "20_25":
            whereClause.user.age = { gte: 20, lte: 25 };
            break;
        case "25_30":
            whereClause.user.age = { gte: 25, lte: 30 };
            break;
        case "above_30":
            whereClause.user.age = { gt: 30 };
            break;
        default:
            break;
    }
    switch (filterSalary) {
        case "below_3m":
            whereClause.expectedSalary = { lt: 3000000 };
            break;
        case "3m_5m":
            whereClause.expectedSalary = { gte: 3000000, lte: 5000000 };
            break;
        case "5m_10m":
            whereClause.expectedSalary = { gte: 5000000, lte: 10000000 };
            break;
        case "above_10m":
            whereClause.expectedSalary = { gt: 10000000 };
            break;
        default:
            break;
    }
    if (filterEducation) {
        whereClause.user.educationalBackground = filterEducation as EducationalBackground;
    }
    try {
        const [jobApplications, totalJobApplications] = await Promise.all([
            prisma.jobApplication.findMany({
                where: whereClause,
                include: {
                    user: true,
                },
                skip: offset,
                take: limit,
                orderBy: {
                    createdAt: "asc",
                },
            }),
            prisma.jobApplication.count({
                where: whereClause,
            }),
        ]);

        res.status(200).json({
            data: jobApplications,
            pagination: {
                totalItems: totalJobApplications,
                totalPages: Math.ceil(totalJobApplications / limit),
                currentPage: page,
                pageSize: limit,
            },
        });
    } catch (e) {
        res.status(500).json({
            message: "Internal server error",
            error: e,
        });
    }
}

export async function changeStatus(req: Request, res: Response) {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const updatedJobApplication = await prisma.jobApplication.update({
            where: {
                id: +id,
            },
            data: {
                status,
            },
        });

        res.status(200).json(updatedJobApplication);
    } catch (e) {
        res.status(500).json({
            message: "Internal server error",
            error: e,
        });
    }
}
