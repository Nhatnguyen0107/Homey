import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { AuthService } from "../services/authService";
import type { LoginForm, UserRes } from "../types/auth";

type AuthState = {
  isAuthenticated: boolean;
  user: UserRes | null;
  refreshToken?: string;
  accessToken?: string;
  loading: boolean;
  error: string | null;
};

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
};

export const signin = createAsyncThunk(
  "auth/signin",
  async (payload: LoginForm, { rejectWithValue }) => {
    try {
      const response = await AuthService.signin(payload);
      return response;
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(err.response?.data || "Đăng nhập thất bại");
      }
      return rejectWithValue("Đăng nhập thất bại");
    }
  }
);

export const signout = createAsyncThunk("auth/signout", async (_, { rejectWithValue }) => {
  try {
    const response = await AuthService.signout();
    return response;
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      return rejectWithValue(err.response?.data || "Đăng xuất thất bại");
    }
    return rejectWithValue("Đăng xuất thất bại");
  }
});

export const getMe = createAsyncThunk("auth/getMe", async (_, { rejectWithValue, dispatch }) => {
  try {
    const response = await AuthService.getMe();
    return response;
  } catch (err: unknown) {
    if (axios.isAxiosError(err) && err.response?.status === 401) {
      await dispatch(signout());
    }
    return rejectWithValue("Không thể lấy thông tin người dùng");
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuth: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem("me");
      localStorage.removeItem("accessToken");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;

        // Lưu token vào localStorage
        localStorage.setItem("accessToken", action.payload.accessToken);

        // Sau khi đăng nhập thành công, gọi getMe ở App.tsx sẽ cập nhật user
      })
      .addCase(signin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // signout
      .addCase(signout.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        localStorage.removeItem("me");
        localStorage.removeItem("accessToken");
      })

      // getMe
      .addCase(getMe.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        localStorage.setItem("me", JSON.stringify(action.payload));
      });
  },
});

export const { clearAuth } = authSlice.actions;
export default authSlice.reducer;
