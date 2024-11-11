import { Request, Response } from "express";
import * as dashboardService from "../services/dashboard-service";

export const getDashboard = async (req: Request, res: Response) => {
  try {
    const dashboardData = await dashboardService.getDashboardData();
    res.status(200).json(dashboardData);
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
