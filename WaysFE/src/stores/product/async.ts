import { api } from "@/libs/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const createProductAsync = createAsyncThunk(
  "product/create",
  async (formData: FormData, thunkAPI) => {
    try {
      const res = await api.post("/product/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Product created successfully");
      return res.data;
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        toast.error(error.message);
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);

export const getAllProductsAsync = createAsyncThunk(
  "product/getAll",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/product");
      return res.data;
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        toast.error(error.message);
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);

export const getProductByIdAsync = createAsyncThunk(
  "product/getById",
  async (id: number, thunkAPI) => {
    try {
      const res = await api.get(`/product/${id}`);
      return res.data;
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        toast.error(error.message);
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);

export const updateProductAsync = createAsyncThunk(
  "product/update",
  async ({ id, formData }: { id: number; formData: FormData }, thunkAPI) => {
    try {
      const res = await api.put(`/product/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Product updated successfully");
      return res.data; // Ensure this contains the updated product with new image
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        toast.error(error.message);
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);

export const deleteProductAsync = createAsyncThunk(
  "product/delete",
  async (id: number, thunkAPI) => {
    try {
      await api.delete(`/product/${id}`);
      toast.success("Product deleted successfully");
      return id;
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        toast.error(error.message);
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);
