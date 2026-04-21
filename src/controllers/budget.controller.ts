import { NextFunction, Request, Response } from "express";

import {
  createBudget,
  deleteBudgetById,
  getBudgetById,
  listBudgets,
  updateBudgetById,
} from "@/services/budget.service";

export const createBudgetHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId } = req.user;
    const budget = await createBudget(userId, req.body);
    res.status(201).json(budget);
  } catch (error) {
    next(error);
  }
};

export const listBudgetsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId } = req.user;
    const budgets = await listBudgets(userId);
    res.status(200).json(budgets);
  } catch (error) {
    next(error);
  }
};

export const getBudgetHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId } = req.user;
    const { id } = req.params as { id: string };
    const budget = await getBudgetById(userId, id);
    res.status(200).json(budget);
  } catch (error) {
    next(error);
  }
};

export const updateBudgetHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId } = req.user;
    const { id } = req.params as { id: string };
    const budget = await updateBudgetById(userId, id, req.body);
    res.status(200).json(budget);
  } catch (error) {
    next(error);
  }
};

export const deleteBudgetHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId } = req.user;
    const { id } = req.params as { id: string };
    const result = await deleteBudgetById(userId, id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
