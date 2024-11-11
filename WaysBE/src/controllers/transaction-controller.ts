import { Request, Response } from "express";
import * as transactionService from "../services/transaction-service";
import { TransactionStatusEnum } from "@prisma/client";
import { prisma } from "../libs/prisma";

export const createTransactionHandler = async (req: Request, res: Response) => {
  try {
    const { userId, cartId } = req.body;
    const paymentUrl = await transactionService.createTransaction(
      userId,
      cartId
    );
    return res.status(200).json({ paymentUrl });
  } catch (error) {
    console.error("Error creating transaction:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const mapMidtransStatusToEnum: Record<string, TransactionStatusEnum> = {
  pending: TransactionStatusEnum.PENDING,
  settlement: TransactionStatusEnum.PROCESSING,
  expire: TransactionStatusEnum.CANCELED,
  deny: TransactionStatusEnum.CANCELED,
};
export const getTransactionStatusHandler = async (
  req: Request,
  res: Response
) => {
  const { transactionId } = req.params;

  try {
    const status = await transactionService.fetchTransactionStatus(
      transactionId
    );

    const midtransStatus = status;
    const mappedStatus = mapMidtransStatusToEnum[midtransStatus];

    const transaction = await prisma.transaction.findFirst({
      where: { transactionId },
      orderBy: { createdAt: "desc" },
    });

    if (transaction) {
      await prisma.transaction.update({
        where: { id: transaction.id },
        data: { status: mappedStatus },
      });
    }
    return res.status(200).json({ status });
  } catch (error) {
    console.error("Error fetching transaction status:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateTransactionStatusHandler = async (
  req: Request,
  res: Response
) => {
  const { transactionId, status } = req.body;

  try {
    const updatedTransaction = await transactionService.updateTransactionStatus(
      transactionId,
      status
    );
    return res.status(200).json(updatedTransaction);
  } catch (error) {
    console.error("Error updating transaction status:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
