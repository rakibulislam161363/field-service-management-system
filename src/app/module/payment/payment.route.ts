import { Router } from "express";
import { Role } from "../../../generated/prisma/enums";
import { auth } from "../../middleware/checkAuth";
import { PaymentController } from "./payment.controller";

const router = Router();

router.get("/my-payments", auth(Role.CUSTOMER), PaymentController.getMyPayments);

router.get(
	"/all-payments",
	auth(Role.MANAGER, Role.ADMIN, Role.FINANCE),
	PaymentController.getAllPayments,
);

router.get(
	"/:paymentId",
	auth(Role.CUSTOMER, Role.MANAGER, Role.ADMIN, Role.FINANCE),
	PaymentController.getSinglePayment,
);

export const PaymentRoutes = router;
