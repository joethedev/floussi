import { Request, Response, NextFunction } from "express";
import { logger } from "@/utils/logger";

const isProd = process.env.NODE_ENV === "production";

export const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // Always log full error internally
  logger.debug(isProd);
  logger.error(err.stack);

  res.status(err.statusCode || 500).json({
    message: err.message || "Something went wrong",

    // 👇 Only show stack in dev
    ...(isProd ? {} : { stack: err.stack }),
  });
};
