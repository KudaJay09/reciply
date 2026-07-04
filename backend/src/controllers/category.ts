import type { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { activitiesLog } from "../lib/activitiesLog";

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    const checkExisting = await prisma.category.findUnique({
      where: { name },
    });

    if (checkExisting) {
      return res.status(400).json({ message: "Category already exists" });
    }

    const slug = name.toLowerCase().replace(/\s+/g, "-");
    const newCategory = await prisma.category.create({
      data: { name, slug },
    });
    await activitiesLog({
      action: "CREATE_CATEGORY",
      details: `Category created: ${name}`,
      userId: (req as any).user?.id || "unknown",
    });
    res.status(201).json(newCategory);
  } catch (error) {
    console.error("Error creating category:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as { id: string };
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    const checkExisting = await prisma.category.findUnique({
      where: { name },
    });

    if (checkExisting && checkExisting.id !== id) {
      return res.status(400).json({ message: "Category already exists" });
    }

    const slug = name.toLowerCase().replace(/\s+/g, "-");
    const updatedCategory = await prisma.category.update({
      where: { id },
      data: { name, slug },
    });
    await activitiesLog({
      action: "UPDATE_CATEGORY",
      details: `Category updated: ${name}`,
      userId: (req as any).user?.id || "unknown",
    });
    res.status(200).json(updatedCategory);
  } catch (error) {
    console.error("Error updating category:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as { id: string };

    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }

    await prisma.category.delete({
      where: { id },
    });
    await activitiesLog({
      action: "DELETE_CATEGORY",
      details: `Category deleted with ID: ${id}`,
      userId: (req as any).user?.id || "unknown",
    });
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error deleting category:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getCategories = async (req: Request, res: Response) => {
  try {
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const limit = Math.max(1, parseInt(req.query.limit as string) || 10);
    const skip = (page - 1) * limit;

    const [categories, totalItems] = await Promise.all([
      prisma.category.findMany({
        skip: skip,
        take: limit,
        orderBy: { name: "asc" },
      }),
      prisma.category.count(),
    ]);

    const totalPages = Math.ceil(totalItems / limit);
    res.status(200).json({
      data: categories,
      totalItems,
      itemsPerPage: limit,
      currentPage: page,
      totalPages,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
