import dotenv from "dotenv";
import { Request, Response } from "express";
dotenv.config();

import prisma from "@/prisma";

//get all available users for interview based jobpost status 'accepted' and  not yet scheduled
export const getAllAvailableUsers = async (req: Request, res: Response) => {
    try {
        const users = await prisma.jobApplication.findMany({
            where: {
                status: "INTERVIEW",
                InterviewSchedule: {
                    none: {},
                },
            },
            include: {
                job: true,
                user: true,
            },
        });
        res.status(200).send({
            message: "Success",
            data: users,
        });
    } catch (e) {
        res.status(500).send({ message: "Something went wrong" });
    }
};

export const getAllInterviewSchedule = async (req: Request, res: Response) => {
    //return all interview schedule
    try {
        const interviewSchedule = await prisma.interviewSchedule.findMany({
            include: {
                JobApplication: {
                    include: {
                        job: true,
                        user: true,
                    },
                },
            },
        });
        res.status(200).send({
            message: "Success",
            data: interviewSchedule,
        });
    } catch (e) {
        res.status(500).send({ message: "Something went wrong" });
    }
};

export const getInterviewScheduleById = async (req: Request, res: Response) => {
    //return interview schedule by id
    try {
        const interviewSchedule = await prisma.interviewSchedule.findUnique({
            where: {
                id: parseInt(req.params.id),
            },
            include: {
                JobApplication: {
                    include: {
                        job: true,
                        user: true,
                    },
                },
            },
        });
        res.status(200).send(interviewSchedule);
    } catch (e) {
        res.status(500).send({ message: "Something went wrong" });
    }
};

export const createInterviewSchedule = async (req: Request, res: Response) => {
    //create interview schedule
    try {
        const interviewSchedule = await prisma.interviewSchedule.create({
            data: {
                jobApplicationId: req.body.jobId,
                interviewDate: new Date(req.body.interviewDate),
                status: "SCHEDULED",
            },
        });
        res.status(201).send({
            message: "Success",
            data: interviewSchedule,
        });
    } catch (e) {
        console.log(e);
        res.status(500).send({ message: "Something went wrong" });
    }
};

export const updateInterviewSchedule = async (req: Request, res: Response) => {
    //update interview schedule
    try {
        const interviewSchedule = await prisma.interviewSchedule.update({
            where: {
                id: parseInt(req.params.id),
            },
            data: {
                interviewDate: new Date(req.body.interviewDate),
                status: req.body.status,
            },
        });
        res.status(200).send({
            message: "Success",
            data: interviewSchedule,
        });
    } catch (e) {
        res.status(500).send({ message: "Something went wrong" });
    }
};

export const deleteInterviewSchedule = async (req: Request, res: Response) => {
    //delete interview schedule
    try {
        await prisma.interviewSchedule.delete({
            where: {
                id: parseInt(req.params.id),
            },
        });
        res.status(204).send();
    } catch (e) {
        res.status(500).send({ message: "Something went wrong" });
    }
};
