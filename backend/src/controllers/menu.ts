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

export const getMenuItems = async (req: Request, res: Response) => {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const limit = Math.max(1, parseInt(req.query.limit as string) || 10);
    const skip = (page - 1) * limit;

    const whereClause = {
      isAvailable: session?.user?.role === "ADMIN" ? undefined : true,
    };

    const [rawMenuItems, totalItems] = await Promise.all([
      prisma.menuItem.findMany({
        skip: skip,
        take: limit,
        orderBy: { createdAt: "desc" }, // Order by creation date descending
        where: whereClause,
        include: {
          feedbacks: {
            select: {
              rating: true,
            },
          },
        },
      }),
      prisma.menuItem.count({
        where: whereClause,
      }),
    ]);

    //---- Add average rating and total reviews to each menu item ----//

    const menuItemsWithRatings = rawMenuItems.map((item) => {
      // Calculate average
      const totalRatings = item.feedbacks.reduce((sum, f) => sum + f.rating, 0);
      const averageRating =
        item.feedbacks.length > 0 ? totalRatings / item.feedbacks.length : 0;

      // Extract feedbacks out so we don't send useless arrays to the frontend
      const { feedbacks, ...itemData } = item;

      return {
        ...itemData,
        averageRating: Number(averageRating.toFixed(1)), // Rounds to 1 decimal place (e.g., 4.5)
        totalReviews: item.feedbacks.length, // Bonus: Good for the UI to say "4.5 stars (12 reviews)"
        feedbacks: item.feedbacks, // Include feedbacks in the response
      };
    });

    const totalPages = Math.ceil(totalItems / limit);

    res.status(200).json({
      data: menuItemsWithRatings, // Sending the mapped data!
      totalItems,
      itemsPerPage: limit,
      currentPage: page,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    });
  } catch (error) {
    console.error("Error fetching menu items:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the menu items." });
  }
};
