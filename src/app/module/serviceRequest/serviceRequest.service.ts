import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/AppError";
import type {
  CreateServiceRequestPayload,
  UpdateServiceRequestPayload,
} from "./serviceRequest.interface";

const createServiceRequest = async (
  customerId: string,
  payload: CreateServiceRequestPayload
) => {
  const category = await prisma.serviceCategory.findUnique({
    where: {
      id: payload.categoryId,
    },
  });

  if (!category) {
    throw new AppError(404, "Service category not found");
  }

  const result = await prisma.serviceRequest.create({
    data: {
      customerId,
      categoryId: payload.categoryId,
      title: payload.title,
      description: payload.description,
      address: payload.address,
      preferredDate: payload.preferredDate
        ? new Date(payload.preferredDate)
        : undefined,
    },
    include: {
      category: true,
    },
  });

  return result;
};

const getAllServiceRequests = async (
  userId: string,
  role: string
) => {
  const where =
    role === "CUSTOMER"
      ? {
          customerId: userId,
        }
      : {};

  const result = await prisma.serviceRequest.findMany({
    where,
    include: {
      category: true,
      customer: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return result;
};

const getSingleServiceRequest = async (
  id: string,
  userId: string,
  role: string
) => {
  const result = await prisma.serviceRequest.findUnique({
    where: {
      id,
    },
    include: {
      category: true,
      customer: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
        },
      },
      assignments: {
        include: {
          technician: {
            select: {
              id: true,
              name: true,
              email: true,
              phone: true,
            },
          },
        },
      },
    },
  });

  if (!result) {
    throw new AppError(404, "Service request not found");
  }

  if (role === "CUSTOMER" && result.customerId !== userId) {
    throw new AppError(
      403,
      "You are not allowed to access this request"
    );
  }

  return result;
};

const updateServiceRequest = async (
  id: string,
  userId: string,
  role: string,
  payload: UpdateServiceRequestPayload
) => {
  const request = await prisma.serviceRequest.findUnique({
    where: {
      id,
    },
  });

  if (!request) {
    throw new AppError(404, "Service request not found");
  }

  if (role === "CUSTOMER" && request.customerId !== userId) {
    throw new AppError(
      403,
      "You are not allowed to update this request"
    );
  }

  if (request.status !== "PENDING") {
    throw new AppError(
      400,
      "Only pending requests can be updated"
    );
  }

  if (payload.categoryId) {
    const category = await prisma.serviceCategory.findUnique({
      where: {
        id: payload.categoryId,
      },
    });

    if (!category) {
      throw new AppError(404, "Service category not found");
    }
  }

  const result = await prisma.serviceRequest.update({
    where: {
      id,
    },
    data: {
      title: payload.title,
      description: payload.description,
      address: payload.address,
      categoryId: payload.categoryId,
      preferredDate: payload.preferredDate
        ? new Date(payload.preferredDate)
        : undefined,
    },
    include: {
      category: true,
    },
  });

  return result;
};

const approveServiceRequest = async (id: string) => {
  const request = await prisma.serviceRequest.findUnique({
    where: {
      id,
    },
  });

  if (!request) {
    throw new AppError(404, "Service request not found");
  }

  if (request.status !== "PENDING") {
    throw new AppError(
      400,
      "Only pending requests can be approved"
    );
  }

  const result = await prisma.serviceRequest.update({
    where: {
      id,
    },
    data: {
      status: "APPROVED",
    },
  });

  return result;
};

const rejectServiceRequest = async (id: string) => {
  const request = await prisma.serviceRequest.findUnique({
    where: {
      id,
    },
  });

  if (!request) {
    throw new AppError(404, "Service request not found");
  }

  if (request.status !== "PENDING") {
    throw new AppError(
      400,
      "Only pending requests can be rejected"
    );
  }

  const result = await prisma.serviceRequest.update({
    where: {
      id,
    },
    data: {
      status: "REJECTED",
    },
  });

  return result;
};

const deleteServiceRequest = async (
  id: string,
  userId: string,
  role: string
) => {
  const request = await prisma.serviceRequest.findUnique({
    where: {
      id,
    },
  });

  if (!request) {
    throw new AppError(404, "Service request not found");
  }

  if (role === "CUSTOMER" && request.customerId !== userId) {
    throw new AppError(
      403,
      "You are not allowed to delete this request"
    );
  }

  if (request.status !== "PENDING") {
    throw new AppError(
      400,
      "Only pending requests can be deleted"
    );
  }

  const result = await prisma.serviceRequest.delete({
    where: {
      id,
    },
  });

  return result;
};

export const ServiceRequestService = {
  createServiceRequest,
  getAllServiceRequests,
  getSingleServiceRequest,
  updateServiceRequest,
  approveServiceRequest,
  rejectServiceRequest,
  deleteServiceRequest,
};