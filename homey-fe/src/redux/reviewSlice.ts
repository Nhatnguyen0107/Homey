import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { Review, GetAllReviewParams } from "../types/review";
import type { Pagination, /*TAny*/ } from "../types/common";
import ReviewService from "../services/reviewService";

type ReviewState = {
    reviews: Review[];
    review: Review | null;
    pagination: Pagination | null;
    status: boolean;
    loading: boolean;
    error: string | null;
};

const initialState: ReviewState = {
    reviews: [],
    review: null,
    pagination: null,
    status: false,
    loading: false,
    error: null,
};

export const getReviewList = createAsyncThunk(
    "review/getReviewList", // type
    async (payload: GetAllReviewParams, { rejectWithValue }) => {
        try {
            const response = await ReviewService.getAll(payload);
            return response; // Dữ liệu trả về sẽ nằm ở action.payload
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                return rejectWithValue(err.response?.data || "Lỗi không xác định");
            }
            return rejectWithValue("Lỗi không xác định");
        }
    }
);


const reviewSlice = createSlice({
    name: "review",
    initialState,
    reducers: {
        resetStatus: (state) => {
            state.status = false;
        },
    },
    extraReducers: (builder) => {
        builder
            // getReviewList
            .addCase(getReviewList.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getReviewList.fulfilled, (state, action) => {
                state.loading = false;
                state.reviews = action.payload.data;
                state.pagination = action.payload.pagination;
            })
            .addCase(getReviewList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string; // Lưu lỗi nếu có
            });


    },
});

// Export actions và reducer
export const { resetStatus } = reviewSlice.actions;
export default reviewSlice.reducer;
