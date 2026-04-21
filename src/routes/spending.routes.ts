import { Router } from "express";

import {
  createSpendingHandler,
  deleteSpendingHandler,
  getSpendingHandler,
  listSpendingsHandler,
  updateSpendingHandler,
} from "@/controllers/spending.controller";
import { authMiddleware } from "@/middlewares/auth.middleware";
import { validate } from "@/middlewares/validate.middleware";
import {
  createSpendingSchema,
  idParamSchema,
  updateSpendingSchema,
} from "@/validation/schemas";

const spendingRouter = Router();

spendingRouter.get("/", authMiddleware, listSpendingsHandler);
spendingRouter.post(
  "/",
  authMiddleware,
  validate({ body: createSpendingSchema }),
  createSpendingHandler,
);
spendingRouter.get(
  "/:id",
  authMiddleware,
  validate({ params: idParamSchema }),
  getSpendingHandler,
);
spendingRouter.patch(
  "/:id",
  authMiddleware,
  validate({ params: idParamSchema, body: updateSpendingSchema }),
  updateSpendingHandler,
);
spendingRouter.delete(
  "/:id",
  authMiddleware,
  validate({ params: idParamSchema }),
  deleteSpendingHandler,
);

export default spendingRouter;
