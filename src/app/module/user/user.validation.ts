import z from "zod";

const CreateUserZodSchema = z.object({
	name: z.string().trim().min(2, "Name must be at least 2 characters long"),
	email: z.string().email("Invalid email address"),
	password: z.string().min(6, "Password must be at least 6 characters long"),
	role: z
		.enum(["CUSTOMER", "TECHNICIAN", "MANAGER", "FINANCE", "ADMIN"])
		.optional(),
	phone: z.string().trim().min(5).optional(),
});

const UpdateUserZodSchema = z
	.object({
		name: z.string().trim().min(2).optional(),
		phone: z.string().trim().min(5).optional(),
		role: z
			.enum(["CUSTOMER", "TECHNICIAN", "MANAGER", "FINANCE", "ADMIN"])
			.optional(),
		status: z.enum(["ACTIVE", "BLOCKED", "DELETED"]).optional(),
		imageUrl: z.string().url().optional(),
	})
	.refine(
		(payload) => Object.keys(payload).length > 0,
		"At least one field is required",
	);

export const UserValidation = { CreateUserZodSchema, UpdateUserZodSchema };
