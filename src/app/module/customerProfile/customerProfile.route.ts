import express from "express";
import { auth } from "../../middleware/checkAuth";
import { CustomerProfileController } from "./customerProfile.controller";
const router = express.Router();
router.post(
	"/",
	auth("CUSTOMER", "ADMIN"),
	CustomerProfileController.createCustomerProfile,
);
router.get(
	"/",
	auth("MANAGER", "ADMIN"),
	CustomerProfileController.getAllCustomerProfiles,
);
router.get(
	"/:id",
	auth("CUSTOMER", "MANAGER", "ADMIN"),
	CustomerProfileController.getSingleCustomerProfile,
);
router.patch(
	"/:id",
	auth("CUSTOMER", "ADMIN"),
	CustomerProfileController.updateCustomerProfile,
);
router.delete(
	"/:id",
	auth("ADMIN"),
	CustomerProfileController.deleteCustomerProfile,
);
export const CustomerProfileRoutes = router;
