import { IProduct } from "./product";
export interface ITransaction {
  id: number;
  userId: number;
  cartId: number;
  transactionId: string;
  amount: number;
  status: string;
  paymentUrl: string;
  createdAt: string;
  updatedAt: string;
  TransactionItem: ITransactionItem[];
}

export interface ITransactionItem {
  id: number;
  transactionId: number;
  quantity: number;
  subTotal: number;
  createdAt: string;
  updateAt: string;
  product: IProduct;
}

export interface IAdminTransactionItems {
  id: number;
  email: string;
  password: string;
  name: string;
  avatar: string;
  gender: string;
  phone: string;
  address: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  transaction: ITransaction[];
}

export enum TransactionStatusEnum {
  PENDING,
  PROCESSING,
  SHIPPED,
  DELIVERED,
  CANCELED,
}
