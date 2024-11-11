import { Router } from "express";
import authRoute from "./auth-route";
import cartRoute from "./cart-route";
import productRoute from "./product-route";
import userRoute from "./user-route";
import checkoutRoute from "./transaction-route";
import dashboardRoute from "./dashboard-route";

const router = Router();

router.get("/", (req, res) => {
  res.send("Hello World!");
});

router.use("/auth", authRoute);
router.use("/user", userRoute);
router.use("/product", productRoute);
router.use("/cart", cartRoute);
router.use("/checkout", checkoutRoute);
router.use("/dashboard", dashboardRoute);

export default router;
