import { Router } from "express";

import {
  createIncomeHandler,
  deleteIncomeHandler,
  getIncomeHandler,
  listIncomesHandler,
  updateIncomeHandler,
} from "@/controllers/income.controller";
import { authMiddleware } from "@/middlewares/auth.middleware";
import { validate } from "@/middlewares/validate.middleware";
import {
  createIncomeSchema,
  idParamSchema,
  updateIncomeSchema,
} from "@/validation/schemas";

const incomeRouter = Router();

incomeRouter.get("/", authMiddleware, listIncomesHandler);
incomeRouter.post(
  "/",
  authMiddleware,
  validate({ body: createIncomeSchema }),
  createIncomeHandler,
);
incomeRouter.get(
  "/:id",
  authMiddleware,
  validate({ params: idParamSchema }),
  getIncomeHandler,
);
incomeRouter.patch(
  "/:id",
  authMiddleware,
  validate({ params: idParamSchema, body: updateIncomeSchema }),
  updateIncomeHandler,
);
incomeRouter.delete(
  "/:id",
  authMiddleware,
  validate({ params: idParamSchema }),
  deleteIncomeHandler,
);

export default incomeRouter;
