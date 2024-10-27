import prisma from "@/prisma";
import { Request, Response } from "express";

export async function getAllSkillAssessments(req: Request, res: Response) {
    try {

        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const offset = (page - 1) * limit;

        const [skillAssessments, totalSkillAssessments] = await Promise.all([
            prisma.skillAssessment.findMany({
                skip: offset,
                take: limit
            }),
            prisma.skillAssessment.count()
        ])

        res.status(200).json({
            data: skillAssessments,
            pagination: {
                totalItems: totalSkillAssessments,
                currentPage: page,
                totalPages: Math.ceil(totalSkillAssessments / limit)
            }
        })

    } catch (error) {
        res.status(500).json({ message: "Failed to retrive skill assessments", error })
    }
}

export async function getSkillAssessmentsQuizById(req: Request, res: Response) {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const offset = (page - 1) * limit;
        const { id } = req.params;

        const [skillAssessments, totalSkillAssessments] = await Promise.all([
            prisma.skillAssessment.findMany({
                where: {
                    id: parseInt(id)
                },
                skip: offset,
                take: limit,
                include: {
                    questions: {
                        select: {
                            questionText: true,
                            choices: true,
                        }
                    }
                }
            }),
            prisma.skillAssessment.count()
        ])

        res.status(200).json({
            data: skillAssessments,
            pagination: {
                totalItems: totalSkillAssessments,
                currentPage: page,
                totalPages: Math.ceil(totalSkillAssessments / limit)
            }
        })
    } catch (error) {
        res.status(500).json({ message: "Failed to retrive skill assessments", error })
    }
}

export async function submitSkillAssessmentAnswers(req: Request, res: Response) {
    try {
        const { userId, assessmentId, userAnswers } = req.body;
        let correctAnswers = 0;

        const skillAssessment = await prisma.skillAssessment.findUnique({
            where: { id: parseInt(assessmentId) },
            include: {
                questions: {
                    select: {
                        id: true,
                        questionText: true,
                        correctAnswerId: true,
                    },
                },
            },
        });

        if (!skillAssessment) {
            return res.status(404).json({ message: "Skill Assessment not found" });
        }


        userAnswers.forEach((userAnswer: { question: string, answerIdx: number }) => {
            const question = skillAssessment.questions.find((q) => q.questionText === userAnswer?.question);
            if (question?.correctAnswerId === userAnswer.answerIdx) {
                correctAnswers++;
            }
        });

        const totalQuestions = skillAssessment.questions.length;
        const score = (correctAnswers / totalQuestions) * 100;
        let passed = false;

        if (score >= 75) {
            passed = true;
        }

        // set skill assessment result to user
        await prisma.skillAssessmentResult.create({
            data: {
                score: score,
                passed,
                userId: 1,
                skillAssessmentId: parseInt(assessmentId),
            },
        });

        let badge = null;
        if (passed) {
            badge = await prisma.skillBadge.create({
                data: {
                    userId: 1,
                    badge: skillAssessment.skillName + " Master"
                },
            });
        }

        res.status(200).json({
            message: "Assessment completed",
            totalQuestions,
            correctAnswers,
            score,
            badge: badge?.badge,
        });

    } catch (error) {
        res.status(500).json({ message: "Error submitting assessment answers", error });
    }
}