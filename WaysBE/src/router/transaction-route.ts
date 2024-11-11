import { Router } from "express";
import { authentication } from "../middlewares/authentication";
import * as transactionController from "../controllers/transaction-controller";

const checkoutRoute = Router();

checkoutRoute.post(
  "/",
  authentication,
  transactionController.createTransactionHandler
);

checkoutRoute.get(
  "/detail/:transactionId",
  authentication,
  transactionController.getTransactionStatusHandler
);

checkoutRoute.put(
  "/status",
  authentication,
  transactionController.updateTransactionStatusHandler
);

export default checkoutRoute;
