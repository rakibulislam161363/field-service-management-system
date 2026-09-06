import type { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { AssignmentService } from "./assignment.service";

const createAssignment = catchAsync(async (req: Request, res: Response) => sendResponse(res, { statusCode: 201, success: true, message: "Assignment created successfully", data: await AssignmentService.createAssignment(req.user!.userId, req.body) }));
const getAllAssignments = catchAsync(async (req: Request, res: Response) => sendResponse(res, { statusCode: 200, success: true, message: "Assignments retrieved successfully", data: await AssignmentService.getAllAssignments(req.user!.userId, req.user!.role) }));
const getSingleAssignment = catchAsync(async (req: Request, res: Response) => sendResponse(res, { statusCode: 200, success: true, message: "Assignment retrieved successfully", data: await AssignmentService.getSingleAssignment(req.params.id as string, req.user!.userId, req.user!.role) }));
const updateAssignment = catchAsync(async (req: Request, res: Response) => sendResponse(res, { statusCode: 200, success: true, message: "Assignment updated successfully", data: await AssignmentService.updateAssignment(req.params.id as string, req.user!.userId, req.user!.role, req.body) }));
const deleteAssignment = catchAsync(async (req: Request, res: Response) => sendResponse(res, { statusCode: 200, success: true, message: "Assignment deleted successfully", data: await AssignmentService.deleteAssignment(req.params.id as string) }));

export const AssignmentController = { createAssignment, getAllAssignments, getSingleAssignment, updateAssignment, deleteAssignment };
