import z from "zod";

const CreateAssignmentZodSchema = z.object({
  serviceRequestId: z.string().min(1),
  technicianId: z.string().min(1),
  scheduledAt: z.string().datetime().optional(),
  notes: z.string().trim().max(1000).optional(),
});

const UpdateAssignmentZodSchema = z.object({
  scheduledAt: z.string().datetime().optional(),
  status: z.enum(["PENDING", "ACCEPTED", "REJECTED", "COMPLETED", "CANCELLED"]).optional(),
  notes: z.string().trim().max(1000).optional(),
}).refine((payload) => Object.keys(payload).length > 0, "At least one field is required");

export const AssignmentValidation = { CreateAssignmentZodSchema, UpdateAssignmentZodSchema };
