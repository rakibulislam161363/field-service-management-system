import express from "express";
import { auth } from "../../middleware/checkAuth";
import { validateRequest } from "../../middleware/validateRequest";
import { TechnicianController } from "./technician.controller";
import { TechnicianValidation } from "./technician.validation";

const router = express.Router();

router.post(
	"/",
	auth("ADMIN", "MANAGER"),
	validateRequest(TechnicianValidation.CreateTechnicianZodSchema),
	TechnicianController.createTechnician,
);

router.get(
	"/",
	auth("CUSTOMER", "TECHNICIAN", "MANAGER", "ADMIN"),
	TechnicianController.getAllTechnicians,
);
router.get(
	"/:id",
	auth("CUSTOMER", "TECHNICIAN", "MANAGER", "ADMIN"),
	TechnicianController.getSingleTechnician,
);

router.patch(
	"/:id",
	auth("TECHNICIAN", "MANAGER", "ADMIN"),
	validateRequest(TechnicianValidation.UpdateTechnicianZodSchema),
	TechnicianController.updateTechnician,
);

router.post(
	"/:id/skills",
	auth("TECHNICIAN", "MANAGER", "ADMIN"),
	validateRequest(TechnicianValidation.AddTechnicianSkillZodSchema),
	TechnicianController.addSkill,
);

router.delete(
	"/:id/skills/:skillId",
	auth("TECHNICIAN", "MANAGER", "ADMIN"),
	TechnicianController.removeSkill,
);

export const TechnicianRoutes = router;
