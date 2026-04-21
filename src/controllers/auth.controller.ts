// auth.controller.ts
import { NextFunction, Request, Response } from "express";
import { registerUser, loginUser } from "../services/auth.service";
import { logger } from "@/utils/logger";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    logger.info("Register attempt");
    const user = await registerUser(req.body);

    logger.info("User created successfully");

    res.json(user);
  } catch (err) {
    if (err instanceof Error) {
      logger.error(`Register failed: ${err.message}`);
      logger.debug(err.stack);
    } else {
      logger.error("Register failed: Unknown error");
      logger.debug(String(err));
    }
    next(err);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;

    logger.info(`Login attempt for email: ${email}`);

    const { token } = await loginUser(email, password);

    res.json({ token });
  } catch (err) {
    if (err instanceof Error) {
      logger.error(`Login failed: ${err.message}`);
      logger.debug(err.stack);
    } else {
      logger.error("Login failed: Unknown error");
      logger.debug(String(err));
    }
    next(err);
  }
};
