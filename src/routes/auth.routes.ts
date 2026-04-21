import { Router } from "express";
import { register, login } from "./../controllers/auth.controller";
import { validate } from "@/middlewares/validate.middleware";
import { loginSchema, registerSchema } from "@/validation/schemas";

const router = Router();

router.post("/register", validate({ body: registerSchema }), register);
router.post("/login", validate({ body: loginSchema }), login);

export default router;
