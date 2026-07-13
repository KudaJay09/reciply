import express from "express";
import { checkRole } from "../middleware/checkRole";
import { create, getAll, getById, remove, update } from "../controllers/table";
import { requireAuth } from "../middleware/requireAuth";
import { requirePermission } from "../middleware/requirePermission";

const tableRouter = express.Router();

tableRouter.get(
  "/",
  requireAuth,
  requirePermission("read", "table"),
  checkRole(["ADMIN", "MANAGER", "STAFF", "KITCHEN"]),
  getAll,
);

tableRouter.post(
  "/create",
  requireAuth,
  requirePermission("create", "table"),
  checkRole(["ADMIN", "MANAGER"]),
  create,
);

tableRouter.patch(
  "/:id/update",
  requireAuth,
  requirePermission("update", "table"),
  checkRole(["ADMIN", "MANAGER"]),
  update,
);

tableRouter.delete(
  "/:id/delete",
  requireAuth,
  requirePermission("delete", "table"),
  remove,
);

tableRouter.get(
  "/:id",
  requireAuth,
  requirePermission("read", "table"),
  checkRole(["ADMIN", "MANAGER", "STAFF", "KITCHEN"]),
  getById,
);

export default tableRouter;
