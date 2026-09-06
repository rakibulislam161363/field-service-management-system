import type { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { TechnicianService } from "./technician.service";

const createTechnician = catchAsync(async (req: Request, res: Response) => {
  const result = await TechnicianService.createTechnician(req.body);
  sendResponse(res, { statusCode: 201, success: true, message: "Technician profile created successfully", data: result });
});

const getAllTechnicians = catchAsync(async (_req: Request, res: Response) => {
  const result = await TechnicianService.getAllTechnicians();
  sendResponse(res, { statusCode: 200, success: true, message: "Technicians retrieved successfully", data: result });
});

const getSingleTechnician = catchAsync(async (req: Request, res: Response) => {
  const result = await TechnicianService.getSingleTechnician(req.params.id as string);
  sendResponse(res, { statusCode: 200, success: true, message: "Technician retrieved successfully", data: result });
});

const updateTechnician = catchAsync(async (req: Request, res: Response) => {
  const result = await TechnicianService.updateTechnician(
    req.params.id as string,
    req.user!.userId,
    req.user!.role,
    req.body,
  );
  sendResponse(res, { statusCode: 200, success: true, message: "Technician profile updated successfully", data: result });
});

const addSkill = catchAsync(async (req: Request, res: Response) => {
  const result = await TechnicianService.addSkill(
    req.params.id as string,
    req.user!.userId,
    req.user!.role,
    req.body,
  );
  sendResponse(res, { statusCode: 201, success: true, message: "Technician skill added successfully", data: result });
});

const removeSkill = catchAsync(async (req: Request, res: Response) => {
  const result = await TechnicianService.removeSkill(
    req.params.id as string,
    req.user!.userId,
    req.user!.role,
    req.params.skillId as string,
  );
  sendResponse(res, { statusCode: 200, success: true, message: "Technician skill removed successfully", data: result });
});

export const TechnicianController = {
  createTechnician,
  getAllTechnicians,
  getSingleTechnician,
  updateTechnician,
  addSkill,
  removeSkill,
};