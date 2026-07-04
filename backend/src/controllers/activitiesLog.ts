import type { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export const getActivitiesLog = async (req: Request, res: Response) => {
  try {
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const limit = Math.max(1, parseInt(req.query.limit as string) || 10);

    const skip = (page - 1) * limit;

    const [activities, totalItems] = await Promise.all([
      prisma.activitiesLog.findMany({
        skip: skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.activitiesLog.count(),
    ]);

    const totalPages = Math.ceil(totalItems / limit);
    res.status(200).json({
      data: activities,
      totalItems,
      itemsPerPage: limit,
      currentPage: page,
      totalPages,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    });
  } catch (error) {
    console.error("Error fetching activities log:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
