import { createSlice } from "@reduxjs/toolkit";
import {
  updateUserAsync,
  getUserTransactionItemsAsync,
  getUserTransactionItemsAdminAsync,
} from "./async";
import { IUser } from "@/type/user";
import { ITransaction } from "@/type/transaction";

export interface UserState {
  user?: IUser;
  transactions?: ITransaction[];
  allUserTransactions?: IUser[];
  loading: boolean;
  error?: string;
}

const initialState: UserState = {
  user: {} as IUser,
  transactions: [],
  allUserTransactions: [],
  loading: false,
  error: undefined,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Untuk update profil
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Untuk transaksi pengguna
      .addCase(getUserTransactionItemsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload;
      })
      .addCase(getUserTransactionItemsAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserTransactionItemsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Untuk transaksi admin
      .addCase(getUserTransactionItemsAdminAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.allUserTransactions = action.payload;
      })
      .addCase(getUserTransactionItemsAdminAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserTransactionItemsAdminAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default userSlice.reducer;
