import type { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { InvoiceService } from "./invoice.service";
const createInvoice = catchAsync(async (req: Request, res: Response) =>
	sendResponse(res, {
		statusCode: 201,
		success: true,
		message: "Invoice created successfully",
		data: await InvoiceService.createInvoice(req.body),
	}),
);
const getAllInvoices = catchAsync(async (_: Request, res: Response) =>
	sendResponse(res, {
		statusCode: 200,
		success: true,
		message: "Invoices retrieved successfully",
		data: await InvoiceService.getAllInvoices(),
	}),
);
const getSingleInvoice = catchAsync(async (req: Request, res: Response) =>
	sendResponse(res, {
		statusCode: 200,
		success: true,
		message: "Invoice retrieved successfully",
		data: await InvoiceService.getSingleInvoice(req.params.id as string),
	}),
);
const updateInvoice = catchAsync(async (req: Request, res: Response) =>
	sendResponse(res, {
		statusCode: 200,
		success: true,
		message: "Invoice updated successfully",
		data: await InvoiceService.updateInvoice(req.params.id as string, req.body),
	}),
);
const deleteInvoice = catchAsync(async (req: Request, res: Response) =>
	sendResponse(res, {
		statusCode: 200,
		success: true,
		message: "Invoice deleted successfully",
		data: await InvoiceService.deleteInvoice(req.params.id as string),
	}),
);
export const InvoiceController = {
	createInvoice,
	getAllInvoices,
	getSingleInvoice,
	updateInvoice,
	deleteInvoice,
};
