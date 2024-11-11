import { TransactionStatusEnum } from "@prisma/client";
import { prisma } from "../libs/prisma";

export const getDashboardData = async () => {
  // Get total transactions count and sum of all transaction amounts
  const totalTransactions = await prisma.transaction.count();
  const totalRevenue = await prisma.transaction.aggregate({
    _sum: { amount: true },
  });

  // Calculate revenue for each status
  const statuses = [
    "PENDING",
    "PROCESSING",
    "CANCELED",
    "SHIPPED",
    "DELIVERED",
  ];
  const revenueByStatus: Record<string, number> = {};

  for (const status of statuses) {
    const revenue = await prisma.transaction.aggregate({
      _sum: { amount: true },
      where: { status: status as TransactionStatusEnum },
    });
    revenueByStatus[status] = revenue._sum.amount || 0;
  }

  return {
    totalTransactions,
    totalRevenue: totalRevenue._sum.amount || 0,
    pendingRevenue: revenueByStatus["PENDING"],
    processingRevenue: revenueByStatus["PROCESSING"],
    canceledRevenue: revenueByStatus["CANCELED"],
    shippedRevenue: revenueByStatus["SHIPPED"],
    deliveredRevenue: revenueByStatus["DELIVERED"],
  };
};
