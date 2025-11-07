import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { User, GetAllUserParams } from "../types/user";
import type { Pagination, TAny, /*TAny*/ } from "../types/common";
import UserService from "../services/userService";

type UserState = {
    users: User[];
    user: User | null;
    pagination: Pagination | null;
    status: boolean;
    loading: boolean;
    error: string | null;
};

const initialState: UserState = {
    users: [],
    user: null,
    pagination: null,
    status: false,
    loading: false,
    error: null,
};

export const getUserList = createAsyncThunk(
    "user/getUserList", // type
    async (payload: GetAllUserParams, { rejectWithValue }) => {
        try {
            const response = await UserService.getAll(payload);
            return response; // Dữ liệu trả về sẽ nằm ở action.payload
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                return rejectWithValue(err.response?.data || "Lỗi không xác định");
            }
            return rejectWithValue("Lỗi không xác định");
        }
    }
);
export const updateUser = createAsyncThunk(
    "user/updateUser", // type
    async (payload: TAny, { rejectWithValue }) => {
        try {
            const response = await UserService.update(payload.id, payload.data);
            return response; // Dữ liệu trả về sẽ nằm ở action.payload
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                return rejectWithValue(err.response?.data || "Lỗi không xác định");
            }
            return rejectWithValue("Lỗi không xác định");
        }
    }
);

export const deleteUser = createAsyncThunk(
    "user/deleteUser", // type
    async ({ id }: TAny, { dispatch, rejectWithValue }) => {
        try {
            const response = await UserService.delete(id);
            // cb();
            dispatch(getUserList({}));
            return response; // Dữ liệu trả về sẽ nằm ở action.payload
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                return rejectWithValue(err.response?.data || "Lỗi không xác định");
            }
            return rejectWithValue("Lỗi không xác định");
        }
    }
);

export const getUserDetail = createAsyncThunk(
    "user/getUserDetail", // type
    async (id: string, { rejectWithValue }) => {
        try {
            const response = await UserService.getById(id);
            return response; // Dữ liệu trả về sẽ nằm ở action.payload
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                return rejectWithValue(err.response?.data || "Lỗi không xác định");
            }
            return rejectWithValue("Lỗi không xác định");
        }
    }
);

export const createUser = createAsyncThunk(
    "user/createUser", // type
    async (payload: TAny, { rejectWithValue }) => {
        try {
            const response = await UserService.create(payload);
            return response; // Dữ liệu trả về sẽ nằm ở action.payload
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                return rejectWithValue(err.response?.data || "Lỗi không xác định");
            }
            return rejectWithValue("Lỗi không xác định");
        }
    }
);

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        resetStatus: (state) => {
            state.status = false;
        },
    },
    extraReducers: (builder) => {
        builder
            // getUserList
            .addCase(getUserList.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserList.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload.data;
                state.pagination = action.payload.pagination;
            })
            .addCase(getUserList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string; // Lưu lỗi nếu có
            });

        builder
            // getUserDetail
            .addCase(getUserDetail.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserDetail.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(getUserDetail.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string; // Lưu lỗi nếu có
            });

        builder
            // createUser
            .addCase(createUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createUser.fulfilled, (state) => {
                state.loading = false;
                state.status = true;
            })
            .addCase(createUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string; // Lưu lỗi nếu có
            });

        builder
            // editUser
            .addCase(updateUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUser.fulfilled, (state) => {
                state.loading = false;
                state.status = true;
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string; // Lưu lỗi nếu có
            });

        builder
            // deleteUser
            .addCase(deleteUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteUser.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string; // Lưu lỗi nếu có
            });
    },
});

// Export actions và reducer
export const { resetStatus } = userSlice.actions;
export default userSlice.reducer;
