import { z } from "zod";

export const userAuthSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

export const emailSchema = z.object({
    email: z.string().email(),
});

export const adminRegisterSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    companyName: z.string(),
    phoneNumber: z.string(),
});

export const verifyEmailSchema = z.object({
    token: z.string(),
});

export const resetPasswordSchema = z.object({
    password: z.string().min(6),
    token: z.string(),
});
