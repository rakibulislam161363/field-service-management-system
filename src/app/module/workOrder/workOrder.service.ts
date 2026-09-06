import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/AppError";
import type {
	CreateWorkOrderPayload,
	UpdateWorkOrderPayload,
} from "./workOrder.interface";
const include = {
	assignment: {
		include: {
			technician: {
				include: { user: { select: { id: true, name: true, email: true } } },
			},
		},
	},
	serviceRequest: true,
	attachments: true,
	serviceReport: true,
};
const createWorkOrder = async (payload: CreateWorkOrderPayload) => {
	const [request, assignment] = await Promise.all([
		prisma.serviceRequest.findUnique({
			where: { id: payload.serviceRequestId },
		}),
		prisma.assignment.findUnique({ where: { id: payload.assignmentId } }),
	]);
	if (!request) throw new AppError(404, "Service request not found");
	if (!assignment) throw new AppError(404, "Assignment not found");
	return prisma.workOrder.create({ data: payload, include });
};
const getAllWorkOrders = async () =>
	prisma.workOrder.findMany({ include, orderBy: { createdAt: "desc" } });
const getSingleWorkOrder = async (id: string) => {
	const result = await prisma.workOrder.findUnique({ where: { id }, include });
	if (!result) throw new AppError(404, "Work order not found");
	return result;
};
const updateWorkOrder = async (id: string, payload: UpdateWorkOrderPayload) => {
	await getSingleWorkOrder(id);
	return prisma.workOrder.update({
		where: { id },
		data: {
			...payload,
			startedAt: payload.startedAt ? new Date(payload.startedAt) : undefined,
			completedAt: payload.completedAt
				? new Date(payload.completedAt)
				: undefined,
		},
		include,
	});
};
const deleteWorkOrder = async (id: string) => {
	await getSingleWorkOrder(id);
	return prisma.workOrder.delete({ where: { id } });
};
export const WorkOrderService = {
	createWorkOrder,
	getAllWorkOrders,
	getSingleWorkOrder,
	updateWorkOrder,
	deleteWorkOrder,
};
