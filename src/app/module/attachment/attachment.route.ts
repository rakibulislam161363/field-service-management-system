import express from "express";
import { auth } from "../../middleware/checkAuth";
import { AttachmentController } from "./attachment.controller";
const router = express.Router();
router.post(
	"/",
	auth("CUSTOMER", "TECHNICIAN", "MANAGER", "ADMIN"),
	AttachmentController.createAttachment,
);
router.get(
	"/",
	auth("CUSTOMER", "TECHNICIAN", "MANAGER", "ADMIN"),
	AttachmentController.getAllAttachments,
);
router.get(
	"/:id",
	auth("CUSTOMER", "TECHNICIAN", "MANAGER", "ADMIN"),
	AttachmentController.getSingleAttachment,
);
router.patch(
	"/:id",
	auth("CUSTOMER", "TECHNICIAN", "MANAGER", "ADMIN"),
	AttachmentController.updateAttachment,
);
router.delete(
	"/:id",
	auth("CUSTOMER", "TECHNICIAN", "MANAGER", "ADMIN"),
	AttachmentController.deleteAttachment,
);
export const AttachmentRoutes = router;
