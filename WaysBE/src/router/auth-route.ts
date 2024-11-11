import { Router } from "express";
import * as authController from "../controllers/auth-controller";
import { authentication } from "../middlewares/authentication";

const authRoute = Router();

authRoute.post("/login", authController.login);
authRoute.post("/register", authController.register);
authRoute.get("/check", authentication, authController.authCheck);

export default authRoute;
