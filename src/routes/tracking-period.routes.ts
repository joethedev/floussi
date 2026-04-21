import { Router } from "express";

import {
  createTrackingPeriodHandler,
  deleteTrackingPeriodHandler,
  getTrackingPeriodHandler,
  listTrackingPeriodsHandler,
  updateTrackingPeriodHandler,
} from "@/controllers/tracking-period.controller";
import { authMiddleware } from "@/middlewares/auth.middleware";
import { validate } from "@/middlewares/validate.middleware";
import {
  createTrackingPeriodSchema,
  idParamSchema,
  updateTrackingPeriodSchema,
} from "@/validation/schemas";

const trackingPeriodRouter = Router();

trackingPeriodRouter.get("/", authMiddleware, listTrackingPeriodsHandler);
trackingPeriodRouter.post(
  "/",
  authMiddleware,
  validate({ body: createTrackingPeriodSchema }),
  createTrackingPeriodHandler,
);
trackingPeriodRouter.get(
  "/:id",
  authMiddleware,
  validate({ params: idParamSchema }),
  getTrackingPeriodHandler,
);
trackingPeriodRouter.patch(
  "/:id",
  authMiddleware,
  validate({ params: idParamSchema, body: updateTrackingPeriodSchema }),
  updateTrackingPeriodHandler,
);
trackingPeriodRouter.delete(
  "/:id",
  authMiddleware,
  validate({ params: idParamSchema }),
  deleteTrackingPeriodHandler,
);

export default trackingPeriodRouter;
