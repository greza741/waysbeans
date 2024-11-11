import { Router } from "express";
import * as cartController from "../controllers/cart-controller";
import { authentication } from "../middlewares/authentication";
const cartRoute = Router();

cartRoute.get("/:userId", authentication, cartController.getCart);
cartRoute.post("/:userId/add", authentication, cartController.addItem);
cartRoute.delete(
  "/:userId/remove/:productId",
  authentication,
  cartController.removeItem
);
cartRoute.delete("/:userId/clear", authentication, cartController.clearCart);

export default cartRoute;
