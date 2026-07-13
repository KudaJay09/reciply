// import { submitFeedback } from "../controllers/feedback";
import {
  createMenu,
  deleteMenuItem,
  getMenuItemById,
  getMenuItems,
  updateMenuItem,
} from "../controllers/menu";
import { checkRole } from "../middleware/checkRole";
import express from "express";
import { requirePermission } from "../middleware/requirePermission";
import { requireAuth } from "../middleware/requireAuth";
import { submitFeedback } from "../controllers/feedback";

const menuItemRouter = express.Router();

menuItemRouter.get("/", getMenuItems);

menuItemRouter.post(
  "/create",
  requireAuth,
  checkRole(["ADMIN", "MANAGER"]),
  requirePermission("create", "menu"),
  createMenu,
);

menuItemRouter.post("/:menuItemId/feedback", requireAuth, submitFeedback);

menuItemRouter.patch(
  "/update/:id",
  requireAuth,
  checkRole(["ADMIN", "MANAGER"]),
  requirePermission("update", "menu"),
  updateMenuItem,
);

menuItemRouter.get("/:id", requireAuth, getMenuItemById);

menuItemRouter.delete(
  "/delete/:id",
  requireAuth,
  checkRole(["ADMIN", "MANAGER"]),
  requirePermission("delete", "menu"),
  deleteMenuItem,
);

export default menuItemRouter;
