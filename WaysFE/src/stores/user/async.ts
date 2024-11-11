import { api } from "@/libs/api";
import { ITransaction } from "@/type/transaction";
import { IUpdateProfileDTO, IUser } from "@/type/user";
import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

export const updateUserAsync = createAsyncThunk<
  { user: IUser },
  { data: Partial<IUpdateProfileDTO> & { avatar?: File } },
  { rejectValue: string }
>("user/edit", async ({ data }, thunkAPI) => {
  try {
    const token = Cookies.get("token");
    if (!token) {
      return thunkAPI.rejectWithValue("Token not found");
    }
    const formData = new FormData();
    formData.append("name", data.name || "");
    formData.append("email", data.email || "");
    formData.append("gender", data.gender || "");
    formData.append("phone", data.phone || "");
    formData.append("address", data.address || "");
    if (data.avatar) {
      formData.append("avatar", data.avatar);
    }

    const res = await api.put(`/user/edit`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    const updatedUser = res.data;
    toast.success("Profile updated successfully");
    return updatedUser;
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      toast.error(error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
});

export const getUserTransactionItemsAsync = createAsyncThunk<
  ITransaction[],
  void,
  { rejectValue: string }
>("user/getUserTransactionItems", async (_, thunkAPI) => {
  try {
    const token = Cookies.get("token");
    if (!token) {
      return thunkAPI.rejectWithValue("Token not found");
    }

    const res = await api.get(`/user/transaction`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return res.data.transaction;
  } catch (error) {
    if (error instanceof Error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
});

// Thunk untuk mendapatkan transaksi semua pengguna (admin)
export const getUserTransactionItemsAdminAsync = createAsyncThunk<
  IUser[],
  void,
  { rejectValue: string }
>("user/getUserTransactionItemsAdmin", async (_, thunkAPI) => {
  try {
    const token = Cookies.get("token");
    if (!token) {
      return thunkAPI.rejectWithValue("Token not found");
    }

    const res = await api.get(`/user/admin-transaction`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("check", res.data);

    return res.data;
  } catch (error) {
    if (error instanceof Error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
});
