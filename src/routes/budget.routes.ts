import { Router } from "express";

import {
  createBudgetHandler,
  deleteBudgetHandler,
  getBudgetHandler,
  listBudgetsHandler,
  updateBudgetHandler,
} from "@/controllers/budget.controller";
import { authMiddleware } from "@/middlewares/auth.middleware";
import { validate } from "@/middlewares/validate.middleware";
import {
  createBudgetSchema,
  idParamSchema,
  updateBudgetSchema,
} from "@/validation/schemas";

const budgetRouter = Router();

budgetRouter.get("/", authMiddleware, listBudgetsHandler);
budgetRouter.post(
  "/",
  authMiddleware,
  validate({ body: createBudgetSchema }),
  createBudgetHandler,
);
budgetRouter.get(
  "/:id",
  authMiddleware,
  validate({ params: idParamSchema }),
  getBudgetHandler,
);
budgetRouter.patch(
  "/:id",
  authMiddleware,
  validate({ params: idParamSchema, body: updateBudgetSchema }),
  updateBudgetHandler,
);
budgetRouter.delete(
  "/:id",
  authMiddleware,
  validate({ params: idParamSchema }),
  deleteBudgetHandler,
);

export default budgetRouter;
