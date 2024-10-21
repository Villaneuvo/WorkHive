import { PrismaClient, Role } from '@prisma/client';
import { ZodError } from 'zod';
import { Request, Response } from 'express';
import { adminRegisterSchema, userAuthSchema } from '@/schemas/auth.schema';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export const userRegister = async (req: Request, res: Response) => {
    try {
        const parsedData = userAuthSchema.parse(req.body);
        const { email, password } = parsedData;

        const existingUser = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (existingUser) {
            return res.status(400).json({
                message: 'User already exists',
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
            },
        });

        res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: user.id,
                email: user.email,
            },
        });
    } catch (e) {
        if (e instanceof ZodError) {
            return res.status(400).json({ errors: e.errors });
        } else {
            res.status(500).json({
                message: 'Internal server error',
                error: e,
            });
        }
    }
};

export const adminRegister = async (req: Request, res: Response) => {
    try {
        const parsedData = adminRegisterSchema.parse(req.body);
        const { email, password, companyName, phoneNumber } = parsedData;

        const existingUser = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (existingUser) {
            return res.status(400).json({
                message: 'User already exists',
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                name: "Admin User",
                email,
                password: hashedPassword,
                role: Role.ADMIN,
                Admin: {
                    create: {
                        companyName,
                        phoneNumber,
                    },
                },
            },
            include: {
                Admin: true,
            },
        });

        res.status(201).json({
            message: 'Admin registered successfully',
            user: {
                id: user.id,
                email: user.email,
                Admin: {
                    id: user.Admin?.id,
                    companyName: user.Admin?.companyName,
                    phoneNumber: user.Admin?.phoneNumber,
                },
            },
        });
    } catch (e) {
        if (e instanceof ZodError) {
            return res.status(400).json({ errors: e.errors });
        } else {
            res.status(500).json({
                message: 'Internal server error',
                error: e,
            });
        }
    }
}