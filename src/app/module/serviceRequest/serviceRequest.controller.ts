import { Request, Response } from "express";
import { ServiceRequestService } from "./serviceRequest.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

const createServiceRequest = catchAsync(async (req: Request, res: Response) => {
	const user = req.user!;
	const result = await ServiceRequestService.createServiceRequest(
		user.userId,
		req.body,
	);

	sendResponse(res, {
		statusCode: 201,
		success: true,
		message: "Service request created successfully",
		data: result,
	});
});

const getAllServiceRequests = catchAsync(
	async (req: Request, res: Response) => {
		const result = await ServiceRequestService.getAllServiceRequests(
			req.user!.userId,
			req.user!.role,
		);

		sendResponse(res, {
			statusCode: 200,
			success: true,
			message: "Service requests retrieved successfully",
			data: result,
		});
	},
);

const getSingleServiceRequest = catchAsync(
	async (req: Request, res: Response) => {
		const result = await ServiceRequestService.getSingleServiceRequest(
			req.params.id as string,
			req.user!.userId,
			req.user!.role,
		);

		sendResponse(res, {
			statusCode: 200,
			success: true,
			message: "Service request retrieved successfully",
			data: result,
		});
	},
);

const updateServiceRequest = catchAsync(async (req: Request, res: Response) => {
	const result = await ServiceRequestService.updateServiceRequest(
		req.params.id as string,
		req.user!.userId,
		req.user!.role,
		req.body,
	);

	sendResponse(res, {
		statusCode: 200,
		success: true,
		message: "Service request updated successfully",
		data: result,
	});
});

const approveServiceRequest = catchAsync(
	async (req: Request, res: Response) => {
		const result = await ServiceRequestService.approveServiceRequest(
			req.params.id as string,
		);

		sendResponse(res, {
			statusCode: 200,
			success: true,
			message: "Service request approved successfully",
			data: result,
		});
	},
);

const rejectServiceRequest = catchAsync(async (req: Request, res: Response) => {
	const result = await ServiceRequestService.rejectServiceRequest(
		req.params.id as string,
	);

	sendResponse(res, {
		statusCode: 200,
		success: true,
		message: "Service request rejected successfully",
		data: result,
	});
});

const deleteServiceRequest = catchAsync(async (req: Request, res: Response) => {
	const result = await ServiceRequestService.deleteServiceRequest(
		req.params.id as string,
		req.user!.userId,
		req.user!.role,
	);

	sendResponse(res, {
		statusCode: 200,
		success: true,
		message: "Service request deleted successfully",
		data: result,
	});
});

export const ServiceRequestController = {
	createServiceRequest,
	getAllServiceRequests,
	getSingleServiceRequest,
	updateServiceRequest,
	approveServiceRequest,
	rejectServiceRequest,
	deleteServiceRequest,
};
