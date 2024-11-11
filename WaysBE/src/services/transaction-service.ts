import { TransactionStatusEnum } from "@prisma/client";
import { MidtransClient } from "midtrans-node-client";
import { v4 as uuidv4 } from "uuid";
import { prisma } from "../libs/prisma";
import axios from "axios";

const midtrans = new MidtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY,
});

export const createTransaction = async (userId: number, cartId: number) => {
  const cart = await prisma.cart.findUnique({
    where: { id: cartId },
  });

  if (!cart) {
    throw new Error("Cart not found");
  }

  const cartItems = await prisma.cartItem.findMany({
    where: { cartId },
    include: { product: true },
  });

  if (!cartItems || cartItems.length === 0) {
    throw new Error("Cart items not found");
  }

  const amount = cart.totalPrice;
  const transactionId = uuidv4();

  // Create the main transaction entry
  const transaction = await prisma.transaction.create({
    data: {
      userId,
      cartId,
      transactionId,
      amount,
      status: "PENDING",
    },
  });

  // Create TransactionItems for each cart item
  const transactionItems = cartItems.map((item) => ({
    transactionId: transaction.id,
    productId: item.product.id,
    quantity: item.quantity,
    subTotal: item.totalPrice,
  }));

  await prisma.transactionItem.createMany({
    data: transactionItems,
  });

  const user = await prisma.user.findUnique({
    where: { id: transaction.userId },
  });

  const itemDetails = cartItems.map((item) => ({
    id: item.product.id.toString(),
    price: item.product.price,
    quantity: item.quantity,
    name: item.product.name,
  }));

  // Create Midtrans transaction
  const midtransTransaction = await midtrans.createTransaction({
    transaction_details: {
      order_id: transactionId,
      gross_amount: amount,
    },
    customer_details: {
      first_name: user?.name,
      email: user?.email,
      phone: user?.phone,
      billing_address: {
        address: user?.address,
      },
      shipping_address: {
        address: user?.address,
        phone: user?.phone,
        first_name: user?.name,
      },
    },
    item_details: itemDetails,

    callbacks: {
      finish: "http://localhost:5173/home/profile",
    },
  });

  // Update transaction with Midtrans payment URL
  await prisma.transaction.update({
    where: { id: transaction.id },
    data: { paymentUrl: midtransTransaction.redirect_url },
  });

  return midtransTransaction.redirect_url;
};

// Fetch hasil transaction status dari midtrans

export const fetchTransactionStatus = async (transactionId: string) => {
  const response = await axios.get(
    `https://api.sandbox.midtrans.com/v2/${transactionId}/status`,
    {
      headers: {
        Accept: "application/json",
        Authorization:
          "Basic U0ItTWlkLXNlcnZlci1SUWg4Zm5fVThjejl3bnluX0ZRZHhIbmY6",
      },
    }
  );

  return response.data.transaction_status;
};

export const updateTransactionStatus = async (
  transactionId: string,
  status: TransactionStatusEnum
) => {
  return await prisma.transaction.update({
    where: { transactionId },
    data: { status },
  });
};
