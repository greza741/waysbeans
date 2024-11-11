import { Router } from "express";
import * as productController from "../controllers/product-controller";
import { authentication } from "../middlewares/authentication";
import upload from "../middlewares/uploadFile";

const productRoute = Router();

productRoute.post(
  "/create",
  authentication,
  upload.single("image"),
  productController.create
);
productRoute.get("/", productController.getAll);
productRoute.get("/:id", productController.getById);
productRoute.put(
  "/:id",
  authentication,
  upload.single("image"),
  productController.update
);
productRoute.delete("/:id", authentication, productController.deleteProduct);

export default productRoute;
