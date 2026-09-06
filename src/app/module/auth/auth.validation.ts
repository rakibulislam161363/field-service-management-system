import z from "zod";

const CustomerRegistrationZodSchema = z.object({
	name: z.string().trim().min(3, "Name must be at least 3 characters long").max(100, "Name cannot exceed 100 characters"),
	email: z.string().trim().email("Not a valid email").transform((value) => value.toLowerCase()),
	password: z
		.string()
		.min(8, "Password must be at least 8 characters long")
		.regex(/[a-z]/, "Password must contain at least 1 lowercase letter")
		.regex(/[A-Z]/, "Password must contain at least 1 uppercase letter")
		.regex(/[0-9]/, "Password must contain at least 1 number")
		.regex(/[^A-Za-z0-9]/, "Password must contain at least 1 special character"),
});
const PatientEmailVerifyZodSchema = z.object({
	email: z.string().trim().email("Not a valid email").transform((value) => value.toLowerCase()),
	otp: z.string().regex(/^\d{6}$/, "OTP must be exactly 6 digits"),
});

const LoginZodSchema = z.object({
	email: z.email(),
	password: z
		.string()
		.min(8, "Password Must Minimum 8 Characters Long.")
		.regex(/[a-z]/, "Password must contain atleast 1 Lowercase Letter")
		.regex(/[A-Z]/, "Password must contain atleast 1 Uppercase Letter")

		.regex(/[0-9]/, "Password must contain atleast 1 Number")
		.regex(/[^A-Za-z0-9]/, "Password must contain atleast 1 Special Character"),
});

const ForgotPasswordZodSchema = z.object({
	email: z.email().transform((value) => value.toLowerCase()),
});

const ResetPasswordZodSchema = z.object({
	email: z.email().transform((value) => value.toLowerCase()),
	newPassword: z
		.string()
		.min(8, "Password Must Minimum 8 Characters Long.")
		.regex(/[a-z]/, "Password must contain atleast 1 Lowercase Letter")
		.regex(/[A-Z]/, "Password must contain atleast 1 Uppercase Letter")

		.regex(/[0-9]/, "Password must contain atleast 1 Number")
		.regex(/[^A-Za-z0-9]/, "Password must contain atleast 1 Special Character"),
	otp: z.string().regex(/^\d{6}$/, "OTP must be exactly 6 digits"),
});

const GoogleLoginZodSchema = z.object({
	idToken: z.string().min(1, "Google ID token is required"),
});

export const UserValidation = {
	CustomerRegistrationZodSchema,
	PatientEmailVerifyZodSchema,
	LoginZodSchema,
	ForgotPasswordZodSchema,
	ResetPasswordZodSchema,
	GoogleLoginZodSchema,
};
