import { NextFunction, Request, Response } from "express";

import {
  createTrackingPeriod,
  deleteTrackingPeriodById,
  getTrackingPeriodById,
  listTrackingPeriods,
  updateTrackingPeriodById,
} from "@/services/tracking-period.service";

export const createTrackingPeriodHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId } = req.user;
    const trackingPeriod = await createTrackingPeriod(userId, req.body);
    res.status(201).json(trackingPeriod);
  } catch (error) {
    next(error);
  }
};

export const listTrackingPeriodsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId } = req.user;
    const trackingPeriods = await listTrackingPeriods(userId);
    res.status(200).json(trackingPeriods);
  } catch (error) {
    next(error);
  }
};

export const getTrackingPeriodHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId } = req.user;
    const { id } = req.params as { id: string };
    const trackingPeriod = await getTrackingPeriodById(userId, id);
    res.status(200).json(trackingPeriod);
  } catch (error) {
    next(error);
  }
};

export const updateTrackingPeriodHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId } = req.user;
    const { id } = req.params as { id: string };
    const trackingPeriod = await updateTrackingPeriodById(userId, id, req.body);
    res.status(200).json(trackingPeriod);
  } catch (error) {
    next(error);
  }
};

export const deleteTrackingPeriodHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId } = req.user;
    const { id } = req.params as { id: string };
    const result = await deleteTrackingPeriodById(userId, id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
