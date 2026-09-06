import type { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { UserService } from "./user.service";

const createUser = catchAsync(async (req: Request, res: Response) =>
	sendResponse(res, {
		statusCode: 201,
		success: true,
		message: "User created successfully",
		data: await UserService.createUser(req.body),
	}),
);
const getAllUsers = catchAsync(async (_req: Request, res: Response) =>
	sendResponse(res, {
		statusCode: 200,
		success: true,
		message: "Users retrieved successfully",
		data: await UserService.getAllUsers(),
	}),
);
const getSingleUser = catchAsync(async (req: Request, res: Response) =>
	sendResponse(res, {
		statusCode: 200,
		success: true,
		message: "User retrieved successfully",
		data: await UserService.getSingleUser(req.params.id as string),
	}),
);
const updateUser = catchAsync(async (req: Request, res: Response) =>
	sendResponse(res, {
		statusCode: 200,
		success: true,
		message: "User updated successfully",
		data: await UserService.updateUser(req.params.id as string, req.body),
	}),
);
const deleteUser = catchAsync(async (req: Request, res: Response) =>
	sendResponse(res, {
		statusCode: 200,
		success: true,
		message: "User deleted successfully",
		data: await UserService.deleteUser(req.params.id as string),
	}),
);

export const UserController = {
	createUser,
	getAllUsers,
	getSingleUser,
	updateUser,
	deleteUser,
};
