import { auth } from "../lib/auth";
import { fromNodeHeaders } from "better-auth/node";
import type { Request, Response, NextFunction } from "express";

export type Role = "ADMIN" | "MANAGER" | "STAFF" | "KITCHEN" | "CUSTOMER";

export const checkRole = (allowedRoles: Role[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const session = await auth.api.getSession({
        headers: fromNodeHeaders(req.headers),
      });

      if (!session) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const userRole = (session.user as any).role;
      if (!allowedRoles.includes(userRole)) {
        return res
          .status(403)
          .json({ message: "Forbidden: Insufficient permissions" });
      }

      (req as any).user = session.user;
      next();
    } catch (error) {
      console.error("Error checking user role:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
};
