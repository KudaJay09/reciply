// import { submitFeedback } from "../controllers/feedback";
import { createMenu } from "../controllers/menu";
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

export default menuItemRouter;
