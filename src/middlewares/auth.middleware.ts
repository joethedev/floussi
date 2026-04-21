// middlewares/auth.middleware.ts

import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { logger } from "@/utils/logger";

interface AuthPayload {
  userId: string;
  iat?: number;
  exp?: number;
}

declare global {
  namespace Express {
    interface Request {
      user: AuthPayload;
    }
  }
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    logger.warn("No token provided");
    return res.status(401).json({ message: "No token" });
  }

  // Handle both "Bearer <token>" and plain "<token>" formats
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : authHeader;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as AuthPayload;
    req.user = decoded;
    next();
  } catch (error) {
    logger.error("JWT verification failed:", error);
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ message: "Token expired" });
    }

    return res.status(401).json({ message: "Invalid token" });
  }
};
