import z from "zod";
const CreateServiceReportZodSchema = z.object({ serviceRequestId: z.string().min(1), workOrderId: z.string().min(1), technicianNotes: z.string().trim().max(3000).optional(), workDescription: z.string().trim().max(3000).optional(), materialsUsed: z.string().trim().max(2000).optional() });
const UpdateServiceReportZodSchema = CreateServiceReportZodSchema.omit({ serviceRequestId: true, workOrderId: true }).partial().refine((p) => Object.keys(p).length > 0, "At least one field is required");
export const ServiceReportValidation = { CreateServiceReportZodSchema, UpdateServiceReportZodSchema };
