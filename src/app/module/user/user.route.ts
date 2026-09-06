import express from "express";
import { auth } from "../../middleware/checkAuth";
import { validateRequest } from "../../middleware/validateRequest";
import { UserController } from "./user.controller";
import { UserValidation } from "./user.validation";

const router = express.Router();

router.post(
	"/",
	auth("ADMIN"),
	validateRequest(UserValidation.CreateUserZodSchema),
	UserController.createUser,
);
router.get("/", auth("ADMIN"), UserController.getAllUsers);
router.get("/:id", auth("ADMIN"), UserController.getSingleUser);
router.patch(
	"/:id",
	auth("ADMIN"),
	validateRequest(UserValidation.UpdateUserZodSchema),
	UserController.updateUser,
);
router.delete("/:id", auth("ADMIN"), UserController.deleteUser);

export const UserRoutes = router;
