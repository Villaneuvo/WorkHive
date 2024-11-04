import prisma from "@/prisma";
import { createGeneratorCVSchema } from "@/schemas/generator.schema";
import { CertificateStatus, EducationalBackground } from "@prisma/client";
import { v2 as cloudinary } from "cloudinary";
import { Request, Response } from "express";
import puppeteer from "puppeteer";
import streamifier from "streamifier";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function getUserCVInfo(req: Request, res: Response) {
    const { userId } = req.params;
    try {
        const user = await prisma.user.findUnique({
            where: { id: +userId },
            include: {
                cv: {
                    include: {
                        education: true,
                        experiences: true,
                    },
                },
            },
        });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error });
    }
}

export async function getUserCertificateInfo(req: Request, res: Response) {
    const { userId } = req.params;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = (page - 1) * limit;
    const { searchTitle, sort } = req.query;
    const whereClause: any = {
        userId: +userId,
    };
    if (searchTitle) whereClause.title = { contains: searchTitle as string };

    try {
        const [certificates, totalCertificates] = await Promise.all([
            prisma.certificate.findMany({
                where: whereClause,
                include: {
                    skillAssessment: true,
                },
                skip: offset,
                take: limit,
                ...(sort && { orderBy: { expiredDate: sort === "asc" ? "asc" : "desc" } }),
            }),
            prisma.certificate.count({
                where: whereClause,
            }),
        ]);
        return res.status(200).json({
            data: certificates,
            pagination: {
                totalItems: totalCertificates,
                totalPages: Math.ceil(totalCertificates / limit),
                currentPage: page,
                pageSize: limit,
            },
        });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error });
    }
}

export async function getCertificateByUserIdAndSkillAssessmentId(req: Request, res: Response) {
    const { userId, skillAssessmentId } = req.query;
    try {
        const certificate = await prisma.certificate.findFirst({
            where: { userId: +userId!, skillAssessmentId: +skillAssessmentId! },
            include: {
                user: true,
                skillAssessment: true,
            },
        });
        return res.status(200).json(certificate);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error });
    }
}

export async function postCV(req: Request, res: Response) {
    const { userId } = req.params;
    const parsedData = createGeneratorCVSchema.parse(req.body);

    try {
        const user = await prisma.user.findUnique({
            where: { id: +userId },
            include: {
                cv: {
                    include: {
                        education: true,
                        experiences: true,
                    },
                },
            },
        });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (user.cv) {
            await prisma.cV.update({
                where: {
                    id: user.cv.id,
                },
                data: {
                    phoneNumber: parsedData.phone,
                    education: {
                        update: {
                            major: parsedData.major || "",
                            institution: parsedData.institution,
                            graduationDate: parsedData.graduationDate,
                            finalGrade: parsedData.finalGrade,
                            education: parsedData.education as EducationalBackground,
                        },
                    },
                    experiences: {
                        deleteMany: {},
                        create: parsedData.experiences.map((exp) => ({
                            company: exp.company,
                            position: exp.position,
                            workingPeriod: exp.workingPeriod,
                            description: exp.description.join(","),
                        })),
                    },
                    skills: parsedData.skills,
                },
            });
        } else {
            await prisma.cV.create({
                data: {
                    userId: +userId,
                    phoneNumber: parsedData.phone,
                    education: {
                        create: {
                            major: parsedData.major || "",
                            institution: parsedData.institution,
                            graduationDate: parsedData.graduationDate,
                            finalGrade: parsedData.finalGrade,
                            education: parsedData.education as EducationalBackground,
                        },
                    },
                    experiences: {
                        create: parsedData.experiences.map((exp) => ({
                            company: exp.company,
                            position: exp.position,
                            workingPeriod: exp.workingPeriod,
                            description: exp.description.join("\n"),
                        })),
                    },
                    skills: parsedData.skills,
                },
            });
        }
        res.status(201).json({ message: "CV created successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error });
    }
}

export async function getCV(req: Request, res: Response) {
    const browser = await puppeteer.launch({
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    try {
        const page = await browser.newPage();
        const webUrl = `${process.env.BASE_URL_WEB}/cv`;

        const response = await page.goto(webUrl, { waitUntil: "networkidle0" });
        if (!response || !response.ok()) {
            throw new Error(`Failed to load page: ${response ? response.status() : "no response"}`);
        }

        const pdfBuffer = await page.pdf({
            margin: { top: "100px", right: "50px", bottom: "100px", left: "50px" },
            printBackground: true,
            format: "A4",
        });
        res.set({
            "Content-Type": "application/pdf",
            "Content-Length": pdfBuffer.length,
            "Content-Disposition": "inline; filename=resultCV.pdf", // Changed to "inline" to preview before download or "attachment" to download it directly
            "Cache-Control": "no-cache",
        });

        res.end(pdfBuffer);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error });
    } finally {
        if (browser) {
            await browser.close();
        }
    }
}

export async function verifyCertificate(req: Request, res: Response) {
    const { verificationCode } = req.params;
    try {
        const certificate = await prisma.certificate.findFirst({
            where: { verificationCode },
        });
        if (!certificate) {
            return res.status(200).json({ message: "Certificate not found", found: false });
        }
        return res.status(200).json({ message: "Certificate is verified", found: true });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error });
    }
}

export async function createOrUpdateCertificate(userId: number, skillAssessmentId: number) {
    const browser = await puppeteer.launch({
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    try {
        const user = await prisma.user.findUnique({
            where: { id: +userId },
            include: {
                certificate: true,
            },
        });
        const skillAssessment = await prisma.skillAssessment.findUnique({
            where: { id: +skillAssessmentId },
        });
        let certificate = await prisma.certificate.findFirst({
            where: { userId: +userId, skillAssessmentId: +skillAssessmentId },
        });

        // Simpan certificate info ke database
        const today = new Date();
        const expiredDate = new Date();
        expiredDate.setFullYear(today.getFullYear() + 1);
        if (certificate) {
            certificate = await prisma.certificate.update({
                where: { id: certificate.id },
                data: {
                    status: "ACTIVE" as CertificateStatus,
                    completionDate: today,
                    expiredDate,
                    verificationCode: new Date().getTime().toString(),
                },
            });
        } else {
            certificate = await prisma.certificate.create({
                data: {
                    title: skillAssessment?.skillName || "Course Certificate",
                    status: "ACTIVE" as CertificateStatus,
                    completionDate: today,
                    expiredDate,
                    verificationCode: new Date().getTime().toString(),
                    userId: +userId,
                    skillAssessmentId: +skillAssessmentId,
                },
            });
        }
        const page = await browser.newPage();
        const webUrl = `${process.env.BASE_URL_WEB}/certificate/${skillAssessmentId}`;

        const response = await page.goto(webUrl, { waitUntil: "networkidle0" });
        if (!response || !response.ok()) {
            throw new Error(`Failed to load page: ${response ? response.status() : "no response"}`);
        }

        const pdfBuffer = await page.pdf({
            width: "800px",
            height: "600px",
            margin: { top: "0px", right: "0px", bottom: "0px", left: "0px" },
            printBackground: true,
        });

        // Unggah PDF ke Cloudinary dari buffer
        const uploadResult = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    resource_type: "raw", // Untuk file non-gambar, gunakan "raw"
                    folder: "pdfs", // Folder di Cloudinary
                    public_id: `resultCertificate${skillAssessment?.skillName}_${user?.email}.pdf`, // Nama file
                    upload_preset: `${process.env.CLOUDINARY_UPLOAD_PRESET}`, // Upload preset
                },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                },
            );

            // Menulis buffer ke aliran upload
            streamifier.createReadStream(pdfBuffer).pipe(uploadStream);
        });

        // Simpan URL PDF ke database
        const pdfUploadUrl = (uploadResult as any).secure_url;
        await prisma.certificate.update({
            where: { id: certificate.id },
            data: {
                pdfUrl: pdfUploadUrl,
            },
        });
    } catch (error) {
        console.error(error);
    } finally {
        if (browser) {
            await browser.close();
        }
    }
}
