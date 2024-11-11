import { Request, Response } from "express";
import * as cartService from "../services/cart-service";

export const getCart = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.userId);
  try {
    const cart = await cartService.getCartByUserId(userId);
    if (cart) {
      res.json({
        cartId: cart.id,
        cartItems: cart.cartItems,
        totalPrice: cart.totalPrice,
      });
    } else {
      res.status(404).json({ message: "Cart not found" });
    }
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ message: err.message });
  }
};

export const addItem = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.userId);
  const { productId, quantity } = req.body;

  try {
    const cartItem = await cartService.addItemToCart(
      userId,
      productId,
      quantity
    );
    res.json(cartItem);
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ message: err.message });
  }
};

export const removeItem = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.userId);
  const productId = parseInt(req.params.productId);

  try {
    await cartService.removeItemFromCart(userId, productId);
    res.status(204).send();
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ message: err.message });
  }
};

export const clearCart = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.userId);

  try {
    await cartService.clearCart(userId);
    res.status(204).send();
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ message: err.message });
  }
};
