import { Router } from "express";

import {
  createCategoryHandler,
  deleteCategory,
  getCategory,
  getCategories,
  updateCategory,
} from "../controllers/category.controller";
import { authMiddleware } from "@/middlewares/auth.middleware";
import { validate } from "@/middlewares/validate.middleware";
import {
  categoryListQuerySchema,
  createCategorySchema,
  idParamSchema,
  updateCategorySchema,
} from "@/validation/schemas";

const categoryRouter = Router();

categoryRouter.get(
  "/",
  authMiddleware,
  validate({ query: categoryListQuerySchema }),
  getCategories,
);
categoryRouter.post(
  "/",
  authMiddleware,
  validate({ body: createCategorySchema }),
  createCategoryHandler,
);
categoryRouter.get(
  "/:id",
  authMiddleware,
  validate({ params: idParamSchema }),
  getCategory,
);
categoryRouter.patch(
  "/:id",
  authMiddleware,
  validate({ params: idParamSchema, body: updateCategorySchema }),
  updateCategory,
);
categoryRouter.delete(
  "/:id",
  authMiddleware,
  validate({ params: idParamSchema }),
  deleteCategory,
);

export default categoryRouter;
