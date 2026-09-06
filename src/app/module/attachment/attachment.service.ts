import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/AppError";
const createAttachment = (data: { serviceRequestId?: string; workOrderId?: string; fileUrl: string; fileName?: string; fileType?: string }) => { if (!data.serviceRequestId && !data.workOrderId) throw new AppError(400, "Service request or work order is required"); return prisma.attachment.create({ data }); };
const getAllAttachments = (where: { serviceRequestId?: string; workOrderId?: string } = {}) => prisma.attachment.findMany({ where, orderBy: { createdAt: "desc" } });
const getSingleAttachment = async (id: string) => { const result = await prisma.attachment.findUnique({ where: { id } }); if (!result) throw new AppError(404, "Attachment not found"); return result; };
const updateAttachment = async (id: string, data: { fileName?: string; fileType?: string; fileUrl?: string }) => { await getSingleAttachment(id); return prisma.attachment.update({ where: { id }, data }); };
const deleteAttachment = async (id: string) => { await getSingleAttachment(id); return prisma.attachment.delete({ where: { id } }); };
export const AttachmentService = { createAttachment, getAllAttachments, getSingleAttachment, updateAttachment, deleteAttachment };
