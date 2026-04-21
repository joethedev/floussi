import {
  createCategory,
  deleteCategoryById,
  getCategoryById,
  listCategories,
  updateCategoryById,
} from "@/services/category.service";
import { logger } from "@/utils/logger";
import { NextFunction, Request, Response } from "express";

export const createCategoryHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    logger.info("Creating category");
    const { userId } = req.user;
    const category = await createCategory({
      userId,
      ...req.body,
    });
    logger.info("Category created successfully");
    res.status(201).json(category);
  } catch (err) {
    logger.error("Error creating category", err);
    next(err);
  }
};

export const getCategories = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    logger.info("Fetching categories for user");
    const { userId } = req.user;
    const categories = await listCategories({
      userId,
      includeArchived: req.query.includeArchived as boolean | undefined,
      sortBy: req.query.sortBy as "createdAt" | "name" | undefined,
      order: req.query.order as "asc" | "desc" | undefined,
    });

    logger.info(`Retrieved ${categories.length} categories for user ${userId}`);
    res.status(200).json({
      success: true,
      count: categories.length,
      data: categories,
    });
  } catch (err) {
    logger.error("Error fetching categories", err);
    next(err);
  }
};

export const getCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId } = req.user;
    const { id } = req.params as { id: string };
    const category = await getCategoryById(userId, id);
    res.status(200).json(category);
  } catch (err) {
    logger.error("Error fetching category", err);
    next(err);
  }
};

export const updateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId } = req.user;
    const { id } = req.params as { id: string };
    const category = await updateCategoryById(userId, id, req.body);
    res.status(200).json(category);
  } catch (err) {
    logger.error("Error updating category", err);
    next(err);
  }
};

export const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId } = req.user;
    const { id } = req.params as { id: string };
    const result = await deleteCategoryById(userId, id);
    res.status(200).json(result);
  } catch (err) {
    logger.error("Error deleting category", err);
    next(err);
  }
};
