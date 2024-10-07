import { z } from 'zod';

export const userAuthSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

export const adminRegisterSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    companyName: z.string(),
    phoneNumber: z.string(),
});
