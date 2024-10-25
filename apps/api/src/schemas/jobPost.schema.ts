import { z } from 'zod';

export const createJobPostSchema = z.object({
    title: z.string(),
    description: z.string(),
    bannerUrl: z.string().optional(),
    category: z.string(),
    cityLocation: z.string(),
    salary: z.number().optional(),
    applicationDeadline: z
        .string()
        .transform((dateStr) => new Date(dateStr))
        .refine((date) => !isNaN(date.getTime()), {
            message: 'Invalid date format',
        }),
    adminId: z.number(),
    tags: z.array(z.string()),
});

export const updateJobPostSchema = z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    bannerUrl: z.string().optional(),
    category: z.string().optional(),
    cityLocation: z.string().optional(),
    salary: z.number().optional(),
    applicationDeadline: z
        .string()
        .transform((dateStr) => new Date(dateStr))
        .refine((date) => !isNaN(date.getTime()), {
            message: 'Invalid date format',
        })
        .optional(),
    adminId: z.number(),
});
