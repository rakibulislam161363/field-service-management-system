import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { ServiceCategoryService } from "./serviceCatagory.service";

const createServiceCategory = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await ServiceCategoryService.createServiceCategory(req.body);

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Service category created successfully",
      data: result,
    });
  }
);

const getAllServiceCategories = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await ServiceCategoryService.getAllServiceCategories();

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Service categories retrieved successfully",
      data: result,
    });
  }
);

const getSingleServiceCategory = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const result =
      await ServiceCategoryService.getSingleServiceCategory(id as string);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Service category retrieved successfully",
      data: result,
    });
  }
);

const updateServiceCategory = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await ServiceCategoryService.updateServiceCategory(
      id as string,
      req.body
    );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Service category updated successfully",
      data: result,
    });
  }
);

const deleteServiceCategory = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const result =
      await ServiceCategoryService.deleteServiceCategory(id as string);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Service category deleted successfully",
      data: result,
    });
  }
);

export const ServiceCategoryController = {
  createServiceCategory,
  getAllServiceCategories,
  getSingleServiceCategory,
  updateServiceCategory,
  deleteServiceCategory,
};