import { Router } from "express";
import AuthController from "../controllers/auth.controller.js";
import middlewares from "../middlewares/index.js";

const controller = new AuthController();
const router = Router();
// define the auth route
router.post("/signin", controller.signin);
router.post("/signout", controller.signout);
router.post("/signup", controller.signup);
router.post("/refresh", controller.refresh);
router.get("/me", middlewares.jwt(), controller.getProfile);

export default router;
