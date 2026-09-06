import type { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { CustomerProfileService } from "./customerProfile.service";
const createCustomerProfile = catchAsync(async (req: Request, res: Response) =>
	sendResponse(res, {
		statusCode: 201,
		success: true,
		message: "Customer profile created successfully",
		data: await CustomerProfileService.createCustomerProfile(req.body),
	}),
);
const getAllCustomerProfiles = catchAsync(
	async (_req: Request, res: Response) =>
		sendResponse(res, {
			statusCode: 200,
			success: true,
			message: "Customer profiles retrieved successfully",
			data: await CustomerProfileService.getAllCustomerProfiles(),
		}),
);
const getSingleCustomerProfile = catchAsync(
	async (req: Request, res: Response) =>
		sendResponse(res, {
			statusCode: 200,
			success: true,
			message: "Customer profile retrieved successfully",
			data: await CustomerProfileService.getSingleCustomerProfile(
				req.params.id as string,
			),
		}),
);
const updateCustomerProfile = catchAsync(async (req: Request, res: Response) =>
	sendResponse(res, {
		statusCode: 200,
		success: true,
		message: "Customer profile updated successfully",
		data: await CustomerProfileService.updateCustomerProfile(
			req.params.id as string,
			req.body,
		),
	}),
);
const deleteCustomerProfile = catchAsync(async (req: Request, res: Response) =>
	sendResponse(res, {
		statusCode: 200,
		success: true,
		message: "Customer profile deleted successfully",
		data: await CustomerProfileService.deleteCustomerProfile(
			req.params.id as string,
		),
	}),
);
export const CustomerProfileController = {
	createCustomerProfile,
	getAllCustomerProfiles,
	getSingleCustomerProfile,
	updateCustomerProfile,
	deleteCustomerProfile,
};
