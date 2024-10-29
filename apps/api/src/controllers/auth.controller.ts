import { PrismaClient, Role } from "@prisma/client";
import { ZodError } from "zod";
import { Request, Response } from "express";
import { adminRegisterSchema, emailSchema, userAuthSchema, verifyEmailSchema } from "@/schemas/auth.schema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import resend from "@/resend";
import dotenv from "dotenv";
dotenv.config();

import prisma from "@/prisma";

export const sendVerificationEmail = async (user: any, token: string) => {
    const verificationUrl = `${process.env.APP_URL}/verify?token=${token}`;

    try {
        const htmlContent = `<div style="font-family: Arial, sans-serif; color: #333; padding: 20px;">
            <h1 style="color: #4CAF50;">Hello!</h1>
            <p>Please verify your email by clicking the link below:</p>
            <a href="${verificationUrl}" 
               style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none;">
                Verify Email
            </a>
            <p style="margin-top: 20px;">
                If the button doesn't work, use this link: <a href="${verificationUrl}">${verificationUrl}</a>
            </p>
        </div>`;

        const { data, error } = await resend.emails.send({
            from: "WorkHive <noreply@workhive.my.id>",
            to: user.email,
            subject: "Verify your email",
            html: htmlContent,
        });

        if (error) {
            console.error("Error sending email:", error);
            return { status: 500, message: "Error sending email", error };
        }

        return { status: 200, message: "Email sent successfully", data };
    } catch (error: any) {
        console.error("Internal server error:", error.message);
        return { status: 500, message: "Internal server error", error: error.message };
    }
};

export const sendResetPasswordEmail = async (user: any, token: string) => {
    const resetUrl = `${process.env.APP_URL}/forgot-password?token=${token}`;

    try {
        const htmlContent = `<div style="font-family: Arial, sans-serif; color: #333; padding: 20px;">
            <h1 style="color: #4CAF50;">Hello!</h1>
            <p>Please reset your password by clicking the link below:</p>
            <a href="${resetUrl}" 
               style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none;">
                Reset Password
            </a>
            <p style="margin-top: 20px;">
                If the button doesn't work, use this link: <a href="${resetUrl}">${resetUrl}</a>
            </p>
        </div>`;

        const { data, error } = await resend.emails.send({
            from: "WorkHive <noreply@workhive.my.id>",
            to: user.email,
            subject: "Reset your password",
            html: htmlContent,
        });

        if (error) {
            console.error("Error sending email:", error);
            return { status: 500, message: "Error sending email", error };
        }

        return { status: 200, message: "Email sent successfully", data };
    } catch (error: any) {
        console.error("Internal server error:", error.message);
        return { status: 500, message: "Internal server error", error: error.message };
    }
};

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
                message: "User already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
            },
        });

        const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET || "default_secret", {
            expiresIn: "1h",
        });

        const verifyEmail = await sendVerificationEmail(user, token);
        console.log(verifyEmail);

        res.status(201).json({
            message: "User registered successfully, please check your email to verify",
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
                message: "Internal server error",
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
                message: "User already exists",
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

        const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET || "default_secret", {
            expiresIn: "1h",
        });

        await sendVerificationEmail(user, token);

        res.status(201).json({
            message: "Admin registered successfully, please check your email to verify",
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
                message: "Internal server error",
                error: e,
            });
        }
    }
};

export const userLogin = async (req: Request, res: Response) => {
    try {
        const parsedData = userAuthSchema.parse(req.body);
        const { email, password } = parsedData;

        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const token = generateToken(user);

        res.json({ message: "Login successful", token });
    } catch (e) {
        if (e instanceof ZodError) {
            return res.status(400).json({ errors: e.errors });
        } else {
            res.status(500).json({ message: "Internal server error", error: e });
        }
    }
};

const generateToken = (user: any) => {
    return jwt.sign(
        {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        },
        process.env.JWT_SECRET as string,
        { expiresIn: "7d" },
    );
};

export const verifyEmail = async (req: Request, res: Response) => {
    try {
        const parsedData = verifyEmailSchema.parse(req.body);
        const { token } = parsedData;

        if (!token) {
            return res.status(400).json({ message: "Invalid or missing token" });
        }

        const decoded = jwt.verify(token as string, process.env.JWT_SECRET || "default_secret");

        const { userId } = decoded as { userId: number };

        await prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                verified: true,
            },
        });

        res.status(200).json({
            message: "Email successfully verified",
        });
    } catch (error) {
        return res.status(400).json({ message: "Invalid or expired token" });
    }
};

export const forgotPassword = async (req: Request, res: Response) => {
    try {
        const parsedData = emailSchema.parse(req.body);
        const { email } = parsedData;

        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || "default_secret", {
            expiresIn: "1h",
        });

        await sendResetPasswordEmail(user, token);

        res.status(200).json({
            message: "Reset password email sent successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error,
        });
    }
};
