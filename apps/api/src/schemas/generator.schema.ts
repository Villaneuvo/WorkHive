import { z } from "zod";

export const createGeneratorCVSchema = z.object({
    name: z.string(),
    email: z.string(),
    phone: z.string(),
    education: z.string(),
    major: z.string().optional(),
    institution: z.string(),
    graduationDate: z.string(),
    finalGrade: z.string(),
    skills: z.string(),
    experiences: z.array(
        z.object({
            company: z.string(),
            position: z.string(),
            workingPeriod: z.string(),
            description: z.array(z.string()),
        }),
    ),
});
