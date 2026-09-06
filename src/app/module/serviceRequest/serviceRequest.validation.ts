import z from "zod";

const serviceRequestDate = z
  .string({ message: "Preferred date must be a string" })
  .refine((value) => !Number.isNaN(Date.parse(value)), {
    message: "Preferred date must be a valid date",
  });

const CreateServiceRequestZodSchema = z.object({
  categoryId: z.string().min(1, "Category is required"),
  title: z.string().trim().min(3, "Title must be at least 3 characters long"),
  description: z
    .string()
    .trim()
    .min(10, "Description must be at least 10 characters long"),
  address: z.string().trim().min(5, "Address must be at least 5 characters long"),
  preferredDate: serviceRequestDate.optional(),
});

const UpdateServiceRequestZodSchema = z
  .object({
    categoryId: z.string().min(1, "Category is required").optional(),
    title: z.string().trim().min(3, "Title must be at least 3 characters long").optional(),
    description: z
      .string()
      .trim()
      .min(10, "Description must be at least 10 characters long")
      .optional(),
    address: z.string().trim().min(5, "Address must be at least 5 characters long").optional(),
    preferredDate: serviceRequestDate.optional(),
  })
  .refine((payload) => Object.keys(payload).length > 0, {
    message: "At least one field is required to update a service request",
  });

export const ServiceRequestValidation = {
  CreateServiceRequestZodSchema,
  UpdateServiceRequestZodSchema,
};