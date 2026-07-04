import { prisma } from "./prisma";

export const activitiesLog = async ({
  userId,
  action,
  details,
}: {
  userId: string;
  action: string;
  details?: string;
}) => {
  try {
    const log = await prisma.activitiesLog.create({
      data: {
        userId,
        action,
        details,
      },
    });
  } catch (error) {
    console.error("Error logging activity:", error);
  }
};
