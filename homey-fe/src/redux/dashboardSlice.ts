import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import DashboardService from "../services/dashboardService";
import type { DashboardStats } from "../services/dashboardService";

export interface DashboardState {
    stats: DashboardStats | null;
    loading: boolean;
    error: string | null;
}

const initialState: DashboardState = {
    stats: null,
    loading: false,
    error: null,
};

// Async thunk để lấy dashboard stats
export const fetchDashboardStats = createAsyncThunk(
    "dashboard/fetchStats",
    async (_, { rejectWithValue }) => {
        try {
            const stats = await DashboardService.getDashboardStats();
            return stats;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch dashboard stats");
        }
    }
);

const dashboardSlice = createSlice({
    name: "dashboard",
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDashboardStats.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchDashboardStats.fulfilled, (state, action) => {
                state.loading = false;
                state.stats = action.payload;
                state.error = null;
            })
            .addCase(fetchDashboardStats.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { clearError } = dashboardSlice.actions;
export default dashboardSlice.reducer;