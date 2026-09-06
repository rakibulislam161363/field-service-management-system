import express from "express";
import { auth } from "../../middleware/checkAuth";
import { validateRequest } from "../../middleware/validateRequest";
import { AssignmentController } from "./assignment.controller";
import { AssignmentValidation } from "./assignment.validation";

const router = express.Router();
router.post(
	"/",
	auth("MANAGER", "ADMIN"),
	validateRequest(AssignmentValidation.CreateAssignmentZodSchema),
	AssignmentController.createAssignment,
);
router.get(
	"/",
	auth("CUSTOMER", "TECHNICIAN", "MANAGER", "ADMIN"),
	AssignmentController.getAllAssignments,
);
router.get(
	"/:id",
	auth("CUSTOMER", "TECHNICIAN", "MANAGER", "ADMIN"),
	AssignmentController.getSingleAssignment,
);
router.patch(
	"/:id",
	auth("TECHNICIAN", "MANAGER", "ADMIN"),
	validateRequest(AssignmentValidation.UpdateAssignmentZodSchema),
	AssignmentController.updateAssignment,
);
router.delete(
	"/:id",
	auth("MANAGER", "ADMIN"),
	AssignmentController.deleteAssignment,
);
export const AssignmentRoutes = router;
