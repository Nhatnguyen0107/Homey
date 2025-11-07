import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { Payment, GetAllPaymentParams, PaymentResDto } from "../types/payment";
import type { Pagination } from "../types/common";
import PaymentService from "../services/paymentService";

type PaymentState = {
    payments: Payment[];
    payment: Payment | null;
    pagination: Pagination | null;
    status: boolean;   // dùng để check success khi update
    loading: boolean;
    error: string | null;
};

const initialState: PaymentState = {
    payments: [],
    payment: null,
    pagination: null,
    status: false,
    loading: false,
    error: null,
};

// ✅ Thunks
export const getPaymentList = createAsyncThunk<
    PaymentResDto,              // return type
    GetAllPaymentParams,        // argument type
    { rejectValue: string }
>(
    "payment/getPaymentList",
    async (params, { rejectWithValue }) => {
        try {
            const response = await PaymentService.getAll(params);
            return response as PaymentResDto;
        } catch (err: unknown) {
            if (typeof err === "object" && err && "response" in err) {
                return rejectWithValue((err as any).response?.data || "Lỗi không xác định");
            }
            return rejectWithValue("Lỗi không xác định");
        }
    }
);

export const updatePayment = createAsyncThunk<
    Payment,                    // return type
    { id: string; data: Partial<Payment> }, // payload type
    { rejectValue: string }
>(
    "payment/updatePayment",
    async ({ id, data }, { rejectWithValue }) => {
        try {
            const response = await PaymentService.update(id, data);
            return response as Payment;
        } catch (err: unknown) {
            if (typeof err === "object" && err && "response" in err) {
                return rejectWithValue((err as any).response?.data || "Lỗi không xác định");
            }
            return rejectWithValue("Lỗi không xác định");
        }
    }
);

export const deletePayment = createAsyncThunk<
    void, // return type
    string, // id của payment
    { rejectValue: string }
>(
    "payment/deletePayment",
    async (id, { rejectWithValue }) => {
        try {
            await PaymentService.delete(id);
        } catch (err: unknown) {
            if (typeof err === "object" && err && "response" in err) {
                return rejectWithValue((err as any).response?.data || "Lỗi không xác định");
            }
            return rejectWithValue("Lỗi không xác định");
        }
    }
);

export const getPaymentDetail = createAsyncThunk<
    Payment,
    string,
    { rejectValue: string }
>(
    "payment/getPaymentDetail",
    async (id, { rejectWithValue }) => {
        try {
            const response = await PaymentService.getById(id);
            return response as Payment;
        } catch (err: unknown) {
            if (typeof err === "object" && err && "response" in err) {
                return rejectWithValue((err as any).response?.data || "Lỗi không xác định");
            }
            return rejectWithValue("Lỗi không xác định");
        }
    }
);

// ✅ Slice
const paymentSlice = createSlice({
    name: "payment",
    initialState,
    reducers: {
        resetStatus: (state) => {
            state.status = false;
        },
        clearPayment: (state) => {
            state.payment = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // getPaymentList
            .addCase(getPaymentList.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getPaymentList.fulfilled, (state, action) => {
                state.loading = false;
                state.payments = action.payload.data;
                state.pagination = action.payload.pagination;
            })
            .addCase(getPaymentList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Lỗi không xác định";
            });

        builder
            // getPaymentDetail
            .addCase(getPaymentDetail.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getPaymentDetail.fulfilled, (state, action) => {
                state.loading = false;
                state.payment = action.payload;
            })
            .addCase(getPaymentDetail.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Lỗi không xác định";
            });

        builder
            // updatePayment
            .addCase(updatePayment.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updatePayment.fulfilled, (state, action) => {
                state.loading = false;
                state.status = true;
                // Cập nhật payment trong danh sách nếu cần
                const index = state.payments.findIndex(p => p.id === action.payload.id);
                if (index !== -1) state.payments[index] = action.payload;
            })
            .addCase(updatePayment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Lỗi không xác định";
            });

        builder
            // deletePayment
            .addCase(deletePayment.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deletePayment.fulfilled, (state, action) => {
                state.loading = false;
                // Xóa payment khỏi danh sách nếu muốn
                // state.payments = state.payments.filter(p => p.id !== id); // frontend tự xử lý
            })
            .addCase(deletePayment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Lỗi không xác định";
            });
    },
});

export const { resetStatus, clearPayment } = paymentSlice.actions;
export default paymentSlice.reducer;
