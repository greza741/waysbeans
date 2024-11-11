import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { AuthState } from "./slice";
import { checkAuthAsync, loginAsync, registerAsync } from "./async";

export function cases(builder: ActionReducerMapBuilder<AuthState>) {
  builder
    .addCase(registerAsync.fulfilled, (state) => {
      state.loading = false;
    })
    .addCase(registerAsync.pending, (state) => {
      state.loading = true;
    })
    .addCase(registerAsync.rejected, (state) => {
      state.loading = false;
    });
  builder
    .addCase(loginAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.token = action.payload.token;
      state.user = action.payload.user;
    })
    .addCase(loginAsync.pending, (state) => {
      state.loading = true;
    })
    .addCase(loginAsync.rejected, (state) => {
      state.loading = false;
    });
  builder
    .addCase(checkAuthAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
    })
    .addCase(checkAuthAsync.pending, (state) => {
      state.loading = true;
    })
    .addCase(checkAuthAsync.rejected, (state) => {
      state.loading = false;
    });
}
