import express from "express";
import { auth } from "../../middleware/checkAuth";
import { validateRequest } from "../../middleware/validateRequest";
import { WorkOrderController } from "./workOrder.controller";
import { WorkOrderValidation } from "./workOrder.validation";
const router = express.Router();
router.post(
	"/",
	auth("MANAGER", "ADMIN"),
	validateRequest(WorkOrderValidation.CreateWorkOrderZodSchema),
	WorkOrderController.createWorkOrder,
);
router.get(
	"/",
	auth("CUSTOMER", "TECHNICIAN", "MANAGER", "ADMIN"),
	WorkOrderController.getAllWorkOrders,
);
router.get(
	"/:id",
	auth("CUSTOMER", "TECHNICIAN", "MANAGER", "ADMIN"),
	WorkOrderController.getSingleWorkOrder,
);
router.patch(
	"/:id",
	auth("TECHNICIAN", "MANAGER", "ADMIN"),
	validateRequest(WorkOrderValidation.UpdateWorkOrderZodSchema),
	WorkOrderController.updateWorkOrder,
);
router.delete(
	"/:id",
	auth("MANAGER", "ADMIN"),
	WorkOrderController.deleteWorkOrder,
);
export const WorkOrderRoutes = router;
