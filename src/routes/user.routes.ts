import { Router } from "express";

import {
  deleteUserHandler,
  getUserHandler,
  listUsersHandler,
  updateUserHandler,
} from "@/controllers/user.controller";
import { authMiddleware } from "@/middlewares/auth.middleware";
import { requireAdmin } from "@/middlewares/role.middleware";
import { validate } from "@/middlewares/validate.middleware";
import { idParamSchema, updateUserSchema } from "@/validation/schemas";

const userRouter = Router();

userRouter.get("/", authMiddleware, listUsersHandler);
userRouter.get(
  "/:id",
  authMiddleware,
  validate({ params: idParamSchema }),
  getUserHandler,
);
userRouter.patch(
  "/:id",
  authMiddleware,
  requireAdmin,
  validate({ params: idParamSchema, body: updateUserSchema }),
  updateUserHandler,
);
userRouter.delete(
  "/:id",
  authMiddleware,
  validate({ params: idParamSchema }),
  deleteUserHandler,
);

export default userRouter;
