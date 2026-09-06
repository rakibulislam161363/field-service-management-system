import z from "zod";
export const SkillValidation = { SkillZodSchema: z.object({ name: z.string().trim().min(2), description: z.string().trim().max(500).optional() }) };
