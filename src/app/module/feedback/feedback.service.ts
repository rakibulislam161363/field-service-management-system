import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/AppError";
const include = {
	customer: { select: { id: true, name: true } },
	serviceRequest: true,
};
const createFeedback = (data: {
	serviceRequestId: string;
	customerId: string;
	rating: number;
	comment?: string;
}) => prisma.feedback.create({ data, include });
const getAllFeedbacks = () =>
	prisma.feedback.findMany({ include, orderBy: { createdAt: "desc" } });
const getSingleFeedback = async (id: string) => {
	const result = await prisma.feedback.findUnique({ where: { id }, include });
	if (!result) throw new AppError(404, "Feedback not found");
	return result;
};
const updateFeedback = async (
	id: string,
	data: { rating?: number; comment?: string },
) => {
	await getSingleFeedback(id);
	return prisma.feedback.update({ where: { id }, data, include });
};
const deleteFeedback = async (id: string) => {
	await getSingleFeedback(id);
	return prisma.feedback.delete({ where: { id } });
};
export const FeedbackService = {
	createFeedback,
	getAllFeedbacks,
	getSingleFeedback,
	updateFeedback,
	deleteFeedback,
};
