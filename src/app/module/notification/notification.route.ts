import express from "express";
import { auth } from "../../middleware/checkAuth";
import { NotificationController } from "./notification.controller";
const router = express.Router();
router.post(
	"/",
	auth("MANAGER", "ADMIN"),
	NotificationController.createNotification,
);
router.get(
	"/",
	auth("CUSTOMER", "TECHNICIAN", "MANAGER", "ADMIN", "FINANCE"),
	NotificationController.getAllNotifications,
);
router.get(
	"/:id",
	auth("CUSTOMER", "TECHNICIAN", "MANAGER", "ADMIN", "FINANCE"),
	NotificationController.getSingleNotification,
);
router.patch(
	"/:id",
	auth("CUSTOMER", "TECHNICIAN", "MANAGER", "ADMIN", "FINANCE"),
	NotificationController.updateNotification,
);
router.delete(
	"/:id",
	auth("CUSTOMER", "TECHNICIAN", "MANAGER", "ADMIN", "FINANCE"),
	NotificationController.deleteNotification,
);
export const NotificationRoutes = router;
