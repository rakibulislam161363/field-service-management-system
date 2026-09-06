import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/AppError";
import type { CreateAssignmentPayload, UpdateAssignmentPayload } from "./assignment.interface";

const include = {
  technician: { include: { user: { select: { id: true, name: true, email: true, phone: true } } } },
  serviceRequest: { include: { category: true, customer: { select: { id: true, name: true, email: true } } } },
};

const createAssignment = async (assignedById: string, payload: CreateAssignmentPayload) => {
  const [request, technician] = await Promise.all([
    prisma.serviceRequest.findUnique({ where: { id: payload.serviceRequestId } }),
    prisma.technicianProfile.findUnique({ where: { id: payload.technicianId } }),
  ]);
  if (!request) throw new AppError(404, "Service request not found");
  if (!technician) throw new AppError(404, "Technician profile not found");
  if (!technician.isAvailable) throw new AppError(400, "Technician is not available");
  return prisma.assignment.create({ data: { ...payload, assignedById, scheduledAt: payload.scheduledAt ? new Date(payload.scheduledAt) : undefined }, include });
};

const getAllAssignments = async (userId: string, role: string) => {
  const where = role === "TECHNICIAN" ? { technician: { userId } } : role === "CUSTOMER" ? { serviceRequest: { customerId: userId } } : {};
  return prisma.assignment.findMany({ where, include, orderBy: { createdAt: "desc" } });
};

const getSingleAssignment = async (id: string, userId: string, role: string) => {
  const result = await prisma.assignment.findUnique({ where: { id }, include });
  if (!result) throw new AppError(404, "Assignment not found");
  if (role === "TECHNICIAN" && result.technician.userId !== userId) throw new AppError(403, "You are not allowed to access this assignment");
  if (role === "CUSTOMER" && result.serviceRequest.customerId !== userId) throw new AppError(403, "You are not allowed to access this assignment");
  return result;
};

const updateAssignment = async (id: string, userId: string, role: string, payload: UpdateAssignmentPayload) => {
  const assignment = await prisma.assignment.findUnique({ where: { id }, include: { technician: true } });
  if (!assignment) throw new AppError(404, "Assignment not found");
  if (role === "TECHNICIAN" && assignment.technician.userId !== userId) throw new AppError(403, "You are not allowed to update this assignment");
  if (role === "TECHNICIAN" && payload.status && !["ACCEPTED", "REJECTED"].includes(payload.status)) throw new AppError(403, "Technicians can only accept or reject assignments");
  return prisma.assignment.update({ where: { id }, data: { ...payload, scheduledAt: payload.scheduledAt ? new Date(payload.scheduledAt) : undefined }, include });
};

const deleteAssignment = async (id: string) => {
  const result = await prisma.assignment.findUnique({ where: { id } });
  if (!result) throw new AppError(404, "Assignment not found");
  return prisma.assignment.delete({ where: { id } });
};

export const AssignmentService = { createAssignment, getAllAssignments, getSingleAssignment, updateAssignment, deleteAssignment };
