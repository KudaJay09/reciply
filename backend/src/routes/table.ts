import express from "express";
import { checkRole } from "../middleware/checkRole";
import { create } from "../controllers/table";
import { requireAuth } from "../middleware/requireAuth";
import { requirePermission } from "../middleware/requirePermission";

const tableRouter = express.Router();

tableRouter.post(
  "/create",
  requireAuth,
  requirePermission("create", "table"),
  checkRole(["ADMIN", "MANAGER"]),
  create,
);

export default tableRouter;
