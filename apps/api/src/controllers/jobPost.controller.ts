import prisma from "@/prisma";
import { createJobPostSchema, updateJobPostSchema } from "@/schemas/jobPost.schema";
import { Request, Response } from "express";
import { ZodError } from "zod";

export async function getAllPosts(req: Request, res: Response) {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const cityLocation = (req.query.cityLocation as string) || "Ambatukam";
        const offset = (page - 1) * limit;
        const title = req.query.title as string;
        const category = req.query.category as string;
        const provinceLocation = req.query.provinceLocation as string;

        const whereClause: any = {};

        if (title) {
            whereClause.title = title;
        }

        if (category) {
            whereClause.category = category;
        }

        if (provinceLocation) {
            whereClause.provinceLocation = provinceLocation;
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
        res.status(500).json({ message: "Failed to retrive posts", error });
    }
}

export async function getAllJobPostsByAdmin(req: Request, res: Response) {
    try {
        const { adminId } = req.params;
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const offset = (page - 1) * limit;
        const { search, category, sort } = req.query;
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
                    admin: {
                        select: {
                            companyName: true,
                            phoneNumber: true,
                        },
                    },
                    tags: true,
                    jobApplications: true,
                },
                skip: offset,
                take: limit,
                ...(sort && {
                    orderBy: {
                        applicationDeadline: sort === "asc" ? "asc" : "desc",
                    },
                }),
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
        res.status(500).json({ message: "Internal server error", error: e });
    }
}

export async function getJobPostForAdminById(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const adminId = req.query.adminId;
        if (!adminId) throw new Error("Admin ID is required");

        const jobPost = await prisma.jobPost.findUnique({
            where: {
                id: +id,
            },
            include: {
                jobApplications: {
                    include: {
                        user: true,
                    },
                },
            },
        });

        if (jobPost?.adminId !== +adminId) throw new Error("Not Authenticate");
        res.status(200).json(jobPost);
    } catch (e) {
        res.status(500).json({ message: "Internal server error", error: e });
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
                    provinceLocation: parsedData.provinceLocation,
                    applicationDeadline: parsedData.applicationDeadline,
                    type: parsedData.type,
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
            res.status(500).json({ message: "Internal server error", error: e });
        }
    }
}

export async function togglePublishJobPost(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const { published, adminId } = req.body;

        const jobPost = await prisma.jobPost.findUnique({
            where: {
                id: +id,
            },
        });

        if (!jobPost) throw new Error("Job post not found");

        if (jobPost.adminId !== adminId) throw new Error("Not Authorized");

        const updatedJobPost = await prisma.jobPost.update({
            where: {
                id: +id,
            },
            data: {
                published,
            },
        });

        res.status(200).json(updatedJobPost);
    } catch (e) {
        res.status(500).json({ message: "Internal server error", error: e });
    }
}

export async function updateJobPost(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const parsedData = updateJobPostSchema.parse(req.body);

        const jobPost = await prisma.jobPost.findUnique({
            where: {
                id: +id,
            },
        });

        if (!jobPost) throw new Error("Job post not found");

        if (jobPost.adminId !== parsedData.adminId) throw new Error("Not Authorized");

        const updatedJobPost = await prisma.jobPost.update({
            where: {
                id: +id,
            },
            data: {
                title: parsedData.title,
                description: parsedData.description,
                category: parsedData.category,
                cityLocation: parsedData.cityLocation,
                provinceLocation: parsedData.provinceLocation,
                type: parsedData.type,
                applicationDeadline: parsedData.applicationDeadline,
                salary: parsedData.salary,
                ...(parsedData.bannerUrl && { bannerUrl: parsedData.bannerUrl }),
            },
        });

        res.status(200).json(updatedJobPost);
    } catch (e) {
        if (e instanceof ZodError) {
            res.status(400).json({ errors: e.errors });
        } else {
            res.status(500).json({ message: "Internal server error", error: e });
        }
    }
}

export async function deleteJobPost(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const { adminId } = req.body;

        const jobPost = await prisma.jobPost.findUnique({
            where: {
                id: +id,
            },
        });

        if (!jobPost) throw new Error("Job post not found");

        if (jobPost.adminId !== adminId) throw new Error("Not Authorized");

        await prisma.jobPost.delete({
            where: {
                id: +id,
            },
        });

        res.status(200).json({ message: "Job post deleted" });
    } catch (e) {
        res.status(500).json({ message: "Internal server error", error: e });
    }
}

export async function getAllCompanies(req: Request, res: Response) {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const offset = (page - 1) * limit;

        // New query parameters for search and sorting
        const searchName = (req.query.companyName as string) || "";
        const searchLocation = (req.query.companyLocation as string) || "";
        const sortOrder = req.query.sort === "desc" ? "desc" : "asc"; // Defaults to ascending

        const [companies, totalCompanies] = await Promise.all([
            prisma.admin.findMany({
                where: {
                    companyName: {
                        contains: searchName, // Search by company name
                    },
                    companyCityLocation: {
                        contains: searchLocation, // Search by location
                    },
                },
                select: {
                    id: true,
                    companyName: true,
                    companyDescription: true,
                    companyCityLocation: true,
                    companyProvince: true,
                    companyBannerImg: true,
                    phoneNumber: true,
                },
                skip: offset,
                take: limit,
                orderBy: {
                    companyName: sortOrder, // Sort by company name
                },
            }),
            prisma.admin.count({
                where: {
                    companyName: {
                        contains: searchName,
                    },
                    companyCityLocation: {
                        contains: searchLocation,
                    },
                },
            }),
        ]);

        res.status(200).json({
            data: companies,
            pagination: {
                totalItems: totalCompanies,
                totalPages: Math.ceil(totalCompanies / limit),
                currentPage: page,
                pageSize: limit,
            },
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
}

// Get a single job post by id
export async function getPostById(req: Request, res: Response) {
    try {
        const postId = req.params.id;
        const jobPost = await prisma.jobPost.findUnique({
            where: {
                id: parseInt(postId),
            },
            include: {
                admin: {
                    select: {
                        companyName: true,
                        phoneNumber: true,
                    },
                },
                tags: true,
            },
        });

        if (!jobPost) {
            return res.status(404).json({ message: "Post not found" });
        }

        res.status(200).json(jobPost);
    } catch (error) {
        res.status(500).json({ message: "Failed to retrive post", error });
    }
}

// Get a single company by id
export async function getCompanyById(req: Request, res: Response) {
    try {
        const companyId = req.params.id;
        const company = await prisma.admin.findUnique({
            where: {
                id: parseInt(companyId),
            },
            select: {
                id: true,
                companyName: true,
                companyDescription: true,
                companyCityLocation: true,
                companyProvince: true,
                companyBannerImg: true,
                phoneNumber: true,
            },
        });

        if (!company) {
            return res.status(404).json({ message: "Company not found" });
        }

        res.status(200).json(company);
    } catch (error) {
        res.status(500).json({ message: "Failed to retrive company", error });
    }
}
