import { PrismaClient } from '@prisma/client';
import { ZodError } from 'zod';
import { Request, Response } from 'express';
import { userAuthSchema } from '@/schemas/auth.schema';
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
