import express from "express";
import { ServiceCategoryController } from "./serviceCatagory.controller";
import { auth } from "../../middleware/checkAuth";

const router = express.Router();

router.post(
  "/",
  auth("ADMIN", "MANAGER"),
  ServiceCategoryController.createServiceCategory
);

router.get(
  "/",
  auth("ADMIN", "MANAGER", "CUSTOMER", "TECHNICIAN"),
  ServiceCategoryController.getAllServiceCategories
);

router.get(
  "/:id",
  auth("ADMIN", "MANAGER", "CUSTOMER", "TECHNICIAN"),
  ServiceCategoryController.getSingleServiceCategory
);

router.patch(
  "/:id",
  auth("ADMIN", "MANAGER"),
  ServiceCategoryController.updateServiceCategory
);

router.delete(
  "/:id",
  auth("ADMIN", "MANAGER"),
  ServiceCategoryController.deleteServiceCategory
);

export const ServiceCategoryRoutes = router;