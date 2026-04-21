import { NextFunction, Request, Response } from "express";

import {
  createIncome,
  deleteIncomeById,
  getIncomeById,
  listIncomes,
  updateIncomeById,
} from "@/services/income.service";

export const createIncomeHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId } = req.user;
    const income = await createIncome(userId, req.body);
    res.status(201).json(income);
  } catch (error) {
    next(error);
  }
};

export const listIncomesHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId } = req.user;
    const incomes = await listIncomes(userId);
    res.status(200).json(incomes);
  } catch (error) {
    next(error);
  }
};

export const getIncomeHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId } = req.user;
    const { id } = req.params as { id: string };
    const income = await getIncomeById(userId, id);
    res.status(200).json(income);
  } catch (error) {
    next(error);
  }
};

export const updateIncomeHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId } = req.user;
    const { id } = req.params as { id: string };
    const income = await updateIncomeById(userId, id, req.body);
    res.status(200).json(income);
  } catch (error) {
    next(error);
  }
};

export const deleteIncomeHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId } = req.user;
    const { id } = req.params as { id: string };
    const result = await deleteIncomeById(userId, id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
