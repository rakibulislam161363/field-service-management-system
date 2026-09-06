import express from "express";
import { ServiceRequestController } from "./serviceRequest.controller";
import { auth } from "../../middleware/checkAuth";
import { validateRequest } from "../../middleware/validateRequest";
import { ServiceRequestValidation } from "./serviceRequest.validation";

const router = express.Router();

router.post(
  "/",
  auth("CUSTOMER"),
  validateRequest(ServiceRequestValidation.CreateServiceRequestZodSchema),
  ServiceRequestController.createServiceRequest
);

router.get(
  "/",
  auth("CUSTOMER", "TECHNICIAN", "MANAGER", "ADMIN"),
  ServiceRequestController.getAllServiceRequests
);

router.get(
  "/:id",
  auth("CUSTOMER", "TECHNICIAN", "MANAGER", "ADMIN"),
  ServiceRequestController.getSingleServiceRequest
);

router.patch(
  "/:id",
  auth("CUSTOMER", "MANAGER", "ADMIN"),
  validateRequest(ServiceRequestValidation.UpdateServiceRequestZodSchema),
  ServiceRequestController.updateServiceRequest
);

router.patch(
  "/:id/approve",
  auth("MANAGER", "ADMIN"),
  ServiceRequestController.approveServiceRequest
);

router.patch(
  "/:id/reject",
  auth("MANAGER", "ADMIN"),
  ServiceRequestController.rejectServiceRequest
);

router.delete(
  "/:id",
  auth("CUSTOMER", "MANAGER", "ADMIN"),
  ServiceRequestController.deleteServiceRequest
);

export const ServiceRequestRoutes = router;