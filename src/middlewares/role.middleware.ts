import { NextFunction, Request, Response } from "express";

import { prisma } from "@/config/prisma";

export const requireAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.userId },
      select: { role: true },
    });

    if (!user || user.role !== "admin") {
      return res.status(403).json({ message: "Admin role required" });
    }

    next();
  } catch (error) {
    next(error);
  }
};
