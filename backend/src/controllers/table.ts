import { activitiesLog } from "../lib/activitiesLog";
import { prisma } from "../lib/prisma";
import type { Request, Response } from "express";

export const create = async (req: Request, res: Response) => {
  try {
    const { name, seats, section, shape } = req.body;

    if (!name || !seats || !section || !shape) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const existingTable = await prisma.table.findFirst({
      where: {
        name,
        // section,
      },
    });

    if (existingTable) {
      return res
        .status(400)
        .json({ message: "Table with this name already exists" });
    }

    const table = await prisma.table.create({
      data: {
        name,
        seats,
        section,
        shape,
      },
    });

    await activitiesLog({
      userId: (req as any).user?.id,
      action: "CREATE_TABLE",
      details: `Table created: ${table.name}`,
    });

    res.status(201).json(table);
  } catch (error) {
    console.error("Error creating table:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
