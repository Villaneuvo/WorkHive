import { Request, Response } from "express";
import prisma from "@/prisma";

export async function getUserById(req: Request, res: Response) {
    const { id } = req.params
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: +id,
            },
            include: {
                profile: true,
                subscription: true,
                jobApplications: true,
                SkillAssessmentResult: true,
                jobSaved: true,
                skillBadges: true,
                endorsements: true,
                endorsementsGiven: true,
                Admin: true,
                Developer: true,
                cv: true,
                certificate: true,
                ratings: true,
            }
        })
        return res.status(200).json(user)
    } catch (error) {
        console.error("Error getting all subscriptions:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
}