import {
  createSlice,
  ActionReducerMapBuilder,
  PayloadAction,
} from "@reduxjs/toolkit";
import {
  createProductAsync,
  getAllProductsAsync,
  updateProductAsync,
  deleteProductAsync,
} from "./async";

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  categoryId: number;
  stock: number;
  userId: number;
}

export interface ProductState {
  products: Product[];
  loading: boolean;
}

const initialState: ProductState = {
  products: [],
  loading: false,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<ProductState>) => {
    builder
      .addCase(getAllProductsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(getAllProductsAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllProductsAsync.rejected, (state) => {
        state.loading = false;
      })
      .addCase(createProductAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload);
      })
      .addCase(createProductAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(createProductAsync.rejected, (state) => {
        state.loading = false;
      })
      .addCase(
        updateProductAsync.fulfilled,
        (state, action: PayloadAction<Product>) => {
          const updateProductIndex = state.products.findIndex(
            (product) => product.id === action.payload.id
          );

          if (updateProductIndex !== -1) {
            state.products[updateProductIndex] = action.payload;
          }

          state.loading = false;
        }
      )
      .addCase(updateProductAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProductAsync.rejected, (state) => {
        state.loading = false;
      })
      .addCase(deleteProductAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.filter(
          (prod) => prod.id !== action.payload
        );
      })
      .addCase(deleteProductAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteProductAsync.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default productSlice.reducer;
