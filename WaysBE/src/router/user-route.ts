import { Router } from "express";
import * as userController from "../controllers/user-controller";
import upload from "../middlewares/uploadFile";
import { authentication } from "../middlewares/authentication";
const userRoute = Router();

userRoute.put(
  "/edit",
  authentication,
  upload.single("avatar"),
  userController.updateUserController
);

userRoute.get(
  "/transaction",
  authentication,
  userController.getUserTransactionItemsController
);
userRoute.get(
  "/admin-transaction",
  authentication,
  userController.getUserTransactionItemsAdminController
);

export default userRoute;
