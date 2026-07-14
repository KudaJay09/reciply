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

export const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as { id: string };
    const { name, seats, section, shape, status } = req.body;

    if (name) {
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
    }

    const table = await prisma.table.update({
      where: {
        id: id,
      },
      data: {
        name,
        seats,
        section,
        shape,
        status,
      },
    });

    await activitiesLog({
      userId: (req as any).user?.id,
      action: "UPDATE_TABLE",
      details: `Table updated: ${table.name}`,
    });

    res.status(200).json(table);
  } catch (error) {
    console.error("Error updating table:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as { id: string };

    const table = await prisma.table.delete({
      where: {
        id: id,
      },
    });

    await activitiesLog({
      userId: (req as any).user?.id,
      action: "REMOVE_TABLE",
      details: `Table removed: ${table.name}`,
    });

    res.status(200).json({ message: "Table removed successfully" });
  } catch (error) {
    console.error("Error removing table:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const tables = await prisma.table.findMany({
      include: {
        //     //     // Include any active reservations for today to populate the sidebar
        reservations: {
          where: {
            date: {
              gte: startOfDay,
              lte: endOfDay,
            },
            status: { in: ["PENDING", "CONFIRMED"] },
          },
          orderBy: { date: "asc" },
        },

        //     // Include active orders to know if a table is currently dining
        //     orders: {
        //       where: {
        //         status: { notIn: ["SERVED", "CANCELLED"] },
        //       },
        //     },
      },
      orderBy: { name: "asc" },
    });

    res.status(200).json(tables);
  } catch (error) {
    console.error("Error fetching tables:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as { id: string };

    if (!id) {
      return res.status(400).json({ message: "Missing table ID" });
    }

    const table = await prisma.table.findUnique({
      where: {
        id: id,
      },
    });
    res.status(200).json(table);
  } catch (error) {
    console.error("Error fetching table by ID:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
