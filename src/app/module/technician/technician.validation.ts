import z from "zod";

const CreateTechnicianZodSchema = z.object({
	userId: z.string().min(1, "User is required"),
	bio: z
		.string()
		.trim()
		.max(1000, "Bio cannot exceed 1000 characters")
		.optional(),
	experience: z
		.number()
		.int()
		.nonnegative("Experience cannot be negative")
		.optional(),
	isAvailable: z.boolean().optional(),
});

const UpdateTechnicianZodSchema = z
	.object({
		bio: z
			.string()
			.trim()
			.max(1000, "Bio cannot exceed 1000 characters")
			.optional(),
		experience: z
			.number()
			.int()
			.nonnegative("Experience cannot be negative")
			.optional(),
		isAvailable: z.boolean().optional(),
	})
	.refine((payload) => Object.keys(payload).length > 0, {
		message: "At least one field is required to update a technician profile",
	});

const AddTechnicianSkillZodSchema = z.object({
	skillId: z.string().min(1, "Skill is required"),
});

export const TechnicianValidation = {
	CreateTechnicianZodSchema,
	UpdateTechnicianZodSchema,
	AddTechnicianSkillZodSchema,
};
