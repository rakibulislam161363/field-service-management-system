import z from "zod";

const CustomerRegistrationZodSchema = z.object({
	body: z.object({
		name: z
			.string({ message: "Name must be a string!!!!!" })
			.min(3, "Name must be at least 3 characters long!!!")
			.max(10, "Name cannot exceed 10 characters"),

		email: z
			.string({ message: "Email must be a string!!!!!" })
			.email("Not a valid email!!"),

		password: z
			.string({ message: "Password must be a string!!!!!" })
			.min(8, "Password Must Minimum 8 Characters Long.")
			.regex(/[a-z]/, "Password must contain at least 1 Lowercase Letter")
			.regex(/[A-Z]/, "Password must contain at least 1 Uppercase Letter")
			.regex(/[0-9]/, "Password must contain at least 1 Number")
			.regex(
				/[^A-Za-z0-9]/,
				"Password must contain at least 1 Special Character",
			),

		// আপনার প্রিজমা স্কিমা অনুযায়ী এখানে সম্ভবত 'patient' এর বদলে 'customerProfile' বা এমন কিছু হওয়া উচিত ছিল।
		// তবে আপনার আগের স্কিমা ঠিক রেখে টাইপো ফিক্স করা হলো:
		customerProfile: z
			.object({
				contactNumber: z
					.string({ message: "Contact number must be a string" })
					.optional(),
			})
			.optional(),
	}),
});
const PatientEmailVerifyZodSchema = z.object({
	body: z.object({
		email: z
			.string({ message: "Email must be a string!!!!!" })
			.email("Not a valid email!!"),

		otp: z
			.string({ message: "OTP must be a string!!!!!" })
			.length(6, "OTP must be exactly 6 characters long!!!"),
	}),
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
	email: z.email(),
});

const ResetPasswordZodSchema = z.object({
	email: z.email(),
	newPassword: z
		.string()
		.min(8, "Password Must Minimum 8 Characters Long.")
		.regex(/[a-z]/, "Password must contain atleast 1 Lowercase Letter")
		.regex(/[A-Z]/, "Password must contain atleast 1 Uppercase Letter")

		.regex(/[0-9]/, "Password must contain atleast 1 Number")
		.regex(/[^A-Za-z0-9]/, "Password must contain atleast 1 Special Character"),
	otp: z.string().length(6),
});

export const UserValidation = {
	CustomerRegistrationZodSchema,
	PatientEmailVerifyZodSchema,
	LoginZodSchema,
	ForgotPasswordZodSchema,
	ResetPasswordZodSchema,
};
