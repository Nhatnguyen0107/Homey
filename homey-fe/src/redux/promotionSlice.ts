import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { Promotion, GetAllPromotionParams } from "../types/promotion";
import type { Pagination, TAny } from "../types/common";
import PromotionService from "../services/promotionService";

type PromotionState = {
    promotions: Promotion[];
    promotion: Promotion | null;
    pagination: Pagination | null;
    status: boolean;
    loading: boolean;
    error: string | null;
};

const initialState: PromotionState = {
    promotions: [],
    promotion: null,
    pagination: null,
    status: false,
    loading: false,
    error: null,
};

export const getPromotionList = createAsyncThunk(
    "promotion/getPromotionList",
    async (payload: GetAllPromotionParams, { rejectWithValue }) => {
        try {
            const response = await PromotionService.getAll(payload);
            return response;
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                return rejectWithValue(err.response?.data || "Lỗi không xác định");
            }
            return rejectWithValue("Lỗi không xác định");
        }
    }
);

export const getPromotionDetail = createAsyncThunk(
    "promotion/getPromotionDetail",
    async (id: string, { rejectWithValue }) => {
        try {
            const response = await PromotionService.getById(id);
            return response;
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                return rejectWithValue(err.response?.data || "Lỗi không xác định");
            }
            return rejectWithValue("Lỗi không xác định");
        }
    }
);

export const createPromotion = createAsyncThunk(
    "promotion/createPromotion",
    async (payload: TAny, { rejectWithValue }) => {
        try {
            const response = await PromotionService.create(payload);
            return response;
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                return rejectWithValue(err.response?.data || "Lỗi không xác định");
            }
            return rejectWithValue("Lỗi không xác định");
        }
    }
);

export const updatePromotion = createAsyncThunk(
    "promotion/updatePromotion",
    async (payload: TAny, { rejectWithValue }) => {
        try {
            const response = await PromotionService.update(payload.id, payload.data);
            return response;
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                return rejectWithValue(err.response?.data || "Lỗi không xác định");
            }
            return rejectWithValue("Lỗi không xác định");
        }
    }
);

export const deletePromotion = createAsyncThunk(
    "promotion/deletePromotion",
    async ({ id }: TAny, { dispatch, rejectWithValue }) => {
        try {
            const response = await PromotionService.delete(id);
            dispatch(getPromotionList({}));
            return response;
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                return rejectWithValue(err.response?.data || "Lỗi không xác định");
            }
            return rejectWithValue("Lỗi không xác định");
        }
    }
);

const promotionSlice = createSlice({
    name: "promotion",
    initialState,
    reducers: {
        resetStatus: (state) => {
            state.status = false;
        },
    },
    extraReducers: (builder) => {
        builder
            // getPromotionList
            .addCase(getPromotionList.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getPromotionList.fulfilled, (state, action) => {
                state.loading = false;
                state.promotions = action.payload.data;
                state.pagination = action.payload.pagination;
            })
            .addCase(getPromotionList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        builder
            // getPromotionDetail
            .addCase(getPromotionDetail.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getPromotionDetail.fulfilled, (state, action) => {
                state.loading = false;
                state.promotion = action.payload.data;
            })
            .addCase(getPromotionDetail.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        builder
            // createPromotion
            .addCase(createPromotion.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createPromotion.fulfilled, (state) => {
                state.loading = false;
                state.status = true;
            })
            .addCase(createPromotion.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        builder
            // updatePromotion
            .addCase(updatePromotion.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updatePromotion.fulfilled, (state) => {
                state.loading = false;
                state.status = true;
            })
            .addCase(updatePromotion.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        builder
            // deletePromotion
            .addCase(deletePromotion.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deletePromotion.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(deletePromotion.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

// Export actions và reducer
export const { resetStatus } = promotionSlice.actions;
export default promotionSlice.reducer;
