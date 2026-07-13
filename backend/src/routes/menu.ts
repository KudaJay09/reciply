// import { submitFeedback } from "../controllers/feedback";
import { createMenu, updateMenuItem } from "../controllers/menu";
import { checkRole } from "../middleware/checkRole";
import express from "express";
import { requirePermission } from "../middleware/requirePermission";
import { requireAuth } from "../middleware/requireAuth";

const menuItemRouter = express.Router();

menuItemRouter.post(
  "/create",
  requireAuth,
  checkRole(["ADMIN", "MANAGER"]),
  requirePermission("create", "menu"),
  createMenu,
);

menuItemRouter.patch(
  "/update/:id",
  requireAuth,
  checkRole(["ADMIN", "MANAGER"]),
  requirePermission("update", "menu"),
  updateMenuItem,
);
export default menuItemRouter;
