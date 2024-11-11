import { api } from "@/libs/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

// Get Cart
export const getCartAsync = createAsyncThunk(
  "cart/getCart",
  async (userId: number, thunkAPI) => {
    try {
      const response = await api.get(`/cart/${userId}`);
      return response.data;
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        toast.error("Failed to load cart");
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);

// Add Item to Cart
export const addItemToCartAsync = createAsyncThunk(
  "cart/addItem",
  async (
    {
      userId,
      productId,
      quantity,
    }: { userId: number; productId: number; quantity: number },
    thunkAPI
  ) => {
    try {
      const response = await api.post(`/cart/${userId}/add`, {
        productId,
        quantity,
      });
      return response.data; // Ensure API returns the updated cart data
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        toast.error("Failed to add item to cart");
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);

// Remove Item from Cart
export const removeItemFromCartAsync = createAsyncThunk(
  "cart/removeItem",
  async (
    { userId, productId }: { userId: number; productId: number },
    thunkAPI
  ) => {
    try {
      await api.delete(`/cart/${userId}/remove/${productId}`);
      toast.success("Item removed from cart");
      return productId;
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        toast.error("Failed to remove item from cart");
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);

// Clear Cart
export const clearCartAsync = createAsyncThunk(
  "cart/clearCart",
  async (userId: number, thunkAPI) => {
    try {
      await api.delete(`/cart/${userId}/clear`);
      toast.success("Cart cleared");
      return userId;
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        toast.error("Failed to clear cart");
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);
