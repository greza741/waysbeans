import { Router } from "express";
import * as dashboardController from "../controllers/dashboard-controller";
import { authentication } from "../middlewares/authentication";

const dashboardRoute = Router();

dashboardRoute.get("/", authentication, dashboardController.getDashboard);

export default dashboardRoute;
