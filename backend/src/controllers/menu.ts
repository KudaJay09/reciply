import { type Request, type Response } from "express";
import { prisma } from "../lib/prisma";
import { fromNodeHeaders } from "better-auth/node";
import { auth } from "../lib/auth";
import { activitiesLog } from "../lib/activitiesLog";

export const createMenu = async (req: Request, res: Response) => {
  try {
    const {
      name,
      description,
      price,
      categoryId,
      isAvailable,
      discount,
      image,
    } = req.body;

    if (!name || !price || !categoryId) {
      return res
        .status(400)
        .json({ message: "Name, price and categoryId are required fields." });
    }

    const category = await prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!category) {
      return res.status(404).json({ message: "Category not found." });
    }

    const newMenuItem = await prisma.menuItem.create({
      data: {
        name,
        description,
        price,
        categoryId,
        isAvailable,
        image,
        discount,
      },
    });

    await activitiesLog({
      userId: (req as any).user?.id,
      action: "CREATE_MENU_ITEM",
      details: `Menu item created: ${newMenuItem.id}`,
    });
    res.status(201).json(newMenuItem);
  } catch (error) {
    console.error("Error creating menu:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the menu." });
  }
};

export const updateMenuItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as { id: string };
    const {
      name,
      description,
      price,
      categoryId,
      isAvailable,
      discount,
      image,
    } = req.body;

    if (!name || !price || !categoryId) {
      return res
        .status(400)
        .json({ message: "Name, price and categoryId are required fields." });
    }

    const updatedMenuItem = await prisma.menuItem.update({
      where: { id },
      data: {
        name: name?.trim(),
        description: description,
        price,
        categoryId,
        isAvailable,
        image,
        discount,
      },
    });

    await activitiesLog({
      userId: (req as any).user?.id,
      action: "UPDATE_MENU_ITEM",
      details: `Menu item updated: ${updatedMenuItem.id}`,
    });

    res.status(200).json({
      message: "Menu item updated successfully.",
      data: updatedMenuItem,
    });
  } catch (error) {
    console.error("Error updating menu:", error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the menu." });
  }
};
