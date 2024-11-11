import { TransactionStatusEnum } from "@prisma/client";

export interface TransactionDTO {
  id: number;
  quantity: number;
  price: number;
  orderId: number;
  productId: number;
  status: TransactionStatusEnum;
}
