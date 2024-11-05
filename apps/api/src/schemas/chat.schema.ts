import { z } from "zod";

export const chatSchema = z.object({
    senderId: z.number(),
    recipientId: z.number(),
    message: z.string(),
});
