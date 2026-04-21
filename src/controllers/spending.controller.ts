import { NextFunction, Request, Response } from "express";

import {
  createSpending,
  deleteSpendingById,
  getSpendingById,
  listSpendings,
  updateSpendingById,
} from "@/services/spending.service";

export const createSpendingHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId } = req.user;
    const spending = await createSpending(userId, req.body);
    res.status(201).json(spending);
  } catch (error) {
    next(error);
  }
};

export const listSpendingsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId } = req.user;
    const spendings = await listSpendings(userId);
    res.status(200).json(spendings);
  } catch (error) {
    next(error);
  }
};

export const getSpendingHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId } = req.user;
    const { id } = req.params as { id: string };
    const spending = await getSpendingById(userId, id);
    res.status(200).json(spending);
  } catch (error) {
    next(error);
  }
};

export const updateSpendingHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId } = req.user;
    const { id } = req.params as { id: string };
    const spending = await updateSpendingById(userId, id, req.body);
    res.status(200).json(spending);
  } catch (error) {
    next(error);
  }
};

export const deleteSpendingHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId } = req.user;
    const { id } = req.params as { id: string };
    const result = await deleteSpendingById(userId, id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
