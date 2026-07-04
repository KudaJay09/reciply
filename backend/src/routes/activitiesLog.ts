import { activitiesLog } from "../lib/activitiesLog";
import express from "express";
import { requireAuth } from "../middleware/requireAuth";
import { getActivitiesLog } from "../controllers/activitiesLog";

const activitiesLogRouter = express.Router();

activitiesLogRouter.get("/", requireAuth, getActivitiesLog);
activitiesLogRouter.post("/create", requireAuth, async (req, res) => {
  try {
    const { action, details } = req.body;

    if (!action) {
      return res.status(400).json({ message: "Action is required" });
    }

    await activitiesLog({
      userId: (req as any).user.id,
      action,
      details,
    });
  } catch (error) {
    console.error("Error creating activity log:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default activitiesLogRouter;
