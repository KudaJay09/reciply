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

export const getMenuItemById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as { id: string };

    const menuItem = await prisma.menuItem.findUnique({
      where: { id },
      include: {
        category: true, // Include the related category
      },
    });

    if (!menuItem) {
      return res.status(404).json({ message: "Menu item not found." });
    }
    res.status(200).json(menuItem);
  } catch (error) {
    console.error("Error fetching menu item:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the menu item." });
  }
};

export const deleteMenuItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as { id: string };

    await prisma.menuItem.delete({
      where: { id },
    });

    await activitiesLog({
      userId: (req as any).user?.id,
      action: "DELETE_MENU_ITEM",
      details: `Menu item deleted: ${id}`,
    });
    res.status(200).json({ message: "Menu item deleted successfully." });
  } catch (error) {
    console.error("Error deleting menu item:", error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the menu item." });
  }
};
