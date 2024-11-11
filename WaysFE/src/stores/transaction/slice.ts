import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createTransactionAsync,
  fetchTransactionStatusById,
  updateTransactionStatusAsync,
} from "./async";

interface TransactionState {
  paymentUrl: string | null;
  loading: boolean;
  error: string | null;
  status: string | null;
}

const initialState: TransactionState = {
  paymentUrl: null,
  loading: false,
  error: null,
  status: null,
};

export const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Create Transaction
      .addCase(createTransactionAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createTransactionAsync.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.loading = false;
          state.paymentUrl = action.payload;
        }
      )
      .addCase(createTransactionAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Update Transaction Status
      .addCase(updateTransactionStatusAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTransactionStatusAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.status = action.payload.transaction_status;
      })
      .addCase(updateTransactionStatusAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchTransactionStatusById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactionStatusById.fulfilled, (state, action) => {
        state.loading = false;
        state.status = action.payload;
      })
      .addCase(fetchTransactionStatusById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default transactionSlice.reducer;
