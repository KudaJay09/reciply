import {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategories,
} from "../controllers/category";
import express from "express";
import { requireAuth } from "../middleware/requireAuth";
import { checkRole } from "../middleware/checkRole";
import { requirePermission } from "../middleware/requirePermission";

const categoryRouter = express.Router();

categoryRouter.post(
  "/create",
  requireAuth,
  requirePermission("create", "category"),
  checkRole(["ADMIN", "MANAGER"]),
  createCategory,
);
categoryRouter.get("/", getCategories);
categoryRouter.patch(
  "/update/:id",
  requireAuth,
  requirePermission("update", "category"),
  checkRole(["ADMIN", "MANAGER"]),
  updateCategory,
);
categoryRouter.delete(
  "/delete/:id",
  requireAuth,
  requirePermission("delete", "category"),
  checkRole(["ADMIN", "MANAGER"]),
  deleteCategory,
);

export default categoryRouter;
