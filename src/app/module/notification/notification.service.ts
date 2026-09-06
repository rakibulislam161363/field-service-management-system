import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/AppError";
const createNotification = (data: {
	userId: string;
	title: string;
	message: string;
}) => prisma.notification.create({ data });
const getAllNotifications = (userId: string) =>
	prisma.notification.findMany({
		where: { userId },
		orderBy: { createdAt: "desc" },
	});
const getSingleNotification = async (id: string, userId: string) => {
	const result = await prisma.notification.findFirst({ where: { id, userId } });
	if (!result) throw new AppError(404, "Notification not found");
	return result;
};
const updateNotification = async (
	id: string,
	userId: string,
	data: { isRead?: boolean },
) => {
	await getSingleNotification(id, userId);
	return prisma.notification.update({ where: { id }, data });
};
const deleteNotification = async (id: string, userId: string) => {
	await getSingleNotification(id, userId);
	return prisma.notification.delete({ where: { id } });
};
export const NotificationService = {
	createNotification,
	getAllNotifications,
	getSingleNotification,
	updateNotification,
	deleteNotification,
};
