import prisma from "@/prisma";
import { createGeneratorCVSchema } from "@/schemas/generator.schema";
import { EducationalBackground } from "@prisma/client";
import { Request, Response } from "express";
import puppeteer from "puppeteer";

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
        const webUrl = `http://localhost:3000/test2`; // TODO: Ubah jadi Template CV URL yang sudah fix

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
