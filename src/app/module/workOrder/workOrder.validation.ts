import z from "zod";
const CreateWorkOrderZodSchema = z.object({ serviceRequestId: z.string().min(1), assignmentId: z.string().min(1) });
const UpdateWorkOrderZodSchema = z.object({ status: z.enum(["ASSIGNED", "SCHEDULED", "TECHNICIAN_ARRIVED", "IN_PROGRESS", "COMPLETED", "CANCELLED"]).optional(), startedAt: z.string().datetime().optional(), completedAt: z.string().datetime().optional() }).refine((p) => Object.keys(p).length > 0, "At least one field is required");
export const WorkOrderValidation = { CreateWorkOrderZodSchema, UpdateWorkOrderZodSchema };
