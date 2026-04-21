import { NextFunction, Request, Response } from "express";

import {
  createUser,
  deleteUserById,
  getUserById,
  listUsers,
  updateUserById,
} from "@/services/user.service";
import { HttpError } from "@/utils/http-error";

export const createUserHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

export const listUsersHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const users = await listUsers(req.user.userId);
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export const getUserHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params as { id: string };

    if (id !== req.user.userId) {
      throw new HttpError(403, "Forbidden");
    }

    const user = await getUserById(id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const updateUserHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params as { id: string };
    const user = await updateUserById(id, req.body);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const deleteUserHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params as { id: string };

    if (id !== req.user.userId) {
      throw new HttpError(403, "Forbidden");
    }

    const result = await deleteUserById(id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
