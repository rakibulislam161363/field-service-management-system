import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/AppError";
const include = { customer: { select: { id: true, name: true, email: true } }, serviceRequest: true, payments: true };
const createInvoice = async (data: { serviceRequestId: string; customerId: string; amount: number; dueDate?: string }) => prisma.invoice.create({ data: { ...data, amount: data.amount, dueDate: data.dueDate ? new Date(data.dueDate) : undefined }, include });
const getAllInvoices = () => prisma.invoice.findMany({ include, orderBy: { createdAt: "desc" } });
const getSingleInvoice = async (id: string) => { const result = await prisma.invoice.findUnique({ where: { id }, include }); if (!result) throw new AppError(404, "Invoice not found"); return result; };
const updateInvoice = async (id: string, data: { amount?: number; status?: "UNPAID" | "PENDING" | "PAID" | "FAILED" | "REFUNDED"; dueDate?: string }) => { await getSingleInvoice(id); return prisma.invoice.update({ where: { id }, data: { ...data, dueDate: data.dueDate ? new Date(data.dueDate) : undefined }, include }); };
const deleteInvoice = async (id: string) => { await getSingleInvoice(id); return prisma.invoice.delete({ where: { id } }); };
export const InvoiceService = { createInvoice, getAllInvoices, getSingleInvoice, updateInvoice, deleteInvoice };
