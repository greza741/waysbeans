import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../product/slice";
import {
  addItemToCartAsync,
  clearCartAsync,
  getCartAsync,
  removeItemFromCartAsync,
} from "./async";

interface CartItem {
  id: number;
  productId: number;
  quantity: number;
  product: Product;
  totalPrice: number;
}

interface CartState {
  items: CartItem[];
  loading: boolean;
  totalPrice: number;
  cartId: number | null;
}

const initialState: CartState = {
  items: [],
  loading: false,
  totalPrice: 0,
  cartId: null,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get Cart
      .addCase(getCartAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getCartAsync.fulfilled,
        (
          state,
          action: PayloadAction<{
            cartId: number;
            cartItems: CartItem[];
            totalPrice: number;
          }>
        ) => {
          state.loading = false;
          state.items = action.payload.cartItems;
          state.totalPrice = action.payload.totalPrice; // Update the cart total price
          state.cartId = action.payload.cartId;
        }
      )
      .addCase(getCartAsync.rejected, (state) => {
        state.loading = false;
      })

      // Add Item to Cart
      .addCase(addItemToCartAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        addItemToCartAsync.fulfilled,
        (
          state,
          action: PayloadAction<{ cartItems: CartItem[]; totalPrice: number }>
        ) => {
          state.loading = false;
          // Update the items and total price based on the response
          state.items = action.payload.cartItems; // Update items with the latest cart data
          state.totalPrice = action.payload.totalPrice; // Update total price
        }
      )
      .addCase(addItemToCartAsync.rejected, (state) => {
        state.loading = false;
      })

      // Remove Item from Cart
      .addCase(removeItemFromCartAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        removeItemFromCartAsync.fulfilled,
        (state, action: PayloadAction<number | undefined>) => {
          state.loading = false;
          state.items = state.items.filter(
            (item) => item.productId !== action.payload
          );
          // Recalculate total price after removing item
          state.totalPrice = state.items.reduce(
            (total, item) => total + item.totalPrice,
            0
          );
        }
      )
      .addCase(removeItemFromCartAsync.rejected, (state) => {
        state.loading = false;
      })

      // Clear Cart
      .addCase(clearCartAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(clearCartAsync.fulfilled, (state) => {
        state.loading = false;
        state.items = [];
        state.totalPrice = 0; // Reset total price when cart is cleared
      })
      .addCase(clearCartAsync.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default cartSlice.reducer;
