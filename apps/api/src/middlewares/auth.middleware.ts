import { PrismaClient, Role } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import prisma from "@/prisma";

interface AuthenticatedUser {
    id: number;
    name: string;
    email: string;
    role: Role;
}

export interface AuthenticatedRequest extends Request {
    user?: AuthenticatedUser;
}

export const requireVerification = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const user = await prisma.user.findUnique({
        where: { id: req.user?.id },
    });

    if (!user?.verified) {
        return res.status(403).json({
            message: "Please verify your email before accessing this resource",
        });
    }

    next();
};
