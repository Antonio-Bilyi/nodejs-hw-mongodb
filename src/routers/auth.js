import { Router } from "express";
import { loginUserController, refreshUserSessionController, registerUserController} from "../controllers/auth.js";
import { registerUserSchema, loginUserSchema } from "../validation/auth.js";
import { validateBody } from "../middlewares/validateBody.js";
import ctrlWrapper from "../utils/ctrlWrapper.js";

const router = Router();

router.post("/register", validateBody(registerUserSchema), ctrlWrapper(registerUserController));

router.post("/login", validateBody(loginUserSchema), ctrlWrapper(loginUserController));

router.post("/refresh", ctrlWrapper(refreshUserSessionController));

router.post("/logout", ctrlWrapper(loginUserController));

export default router;