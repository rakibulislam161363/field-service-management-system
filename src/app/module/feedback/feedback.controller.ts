import type { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { FeedbackService } from "./feedback.service";
const createFeedback = catchAsync(async (req: Request, res: Response) =>
	sendResponse(res, {
		statusCode: 201,
		success: true,
		message: "Feedback created successfully",
		data: await FeedbackService.createFeedback({
			...req.body,
			customerId: req.user!.userId,
		}),
	}),
);
const getAllFeedbacks = catchAsync(async (_: Request, res: Response) =>
	sendResponse(res, {
		statusCode: 200,
		success: true,
		message: "Feedbacks retrieved successfully",
		data: await FeedbackService.getAllFeedbacks(),
	}),
);
const getSingleFeedback = catchAsync(async (req: Request, res: Response) =>
	sendResponse(res, {
		statusCode: 200,
		success: true,
		message: "Feedback retrieved successfully",
		data: await FeedbackService.getSingleFeedback(req.params.id as string),
	}),
);
const updateFeedback = catchAsync(async (req: Request, res: Response) =>
	sendResponse(res, {
		statusCode: 200,
		success: true,
		message: "Feedback updated successfully",
		data: await FeedbackService.updateFeedback(
			req.params.id as string,
			req.body,
		),
	}),
);
const deleteFeedback = catchAsync(async (req: Request, res: Response) =>
	sendResponse(res, {
		statusCode: 200,
		success: true,
		message: "Feedback deleted successfully",
		data: await FeedbackService.deleteFeedback(req.params.id as string),
	}),
);
export const FeedbackController = {
	createFeedback,
	getAllFeedbacks,
	getSingleFeedback,
	updateFeedback,
	deleteFeedback,
};
