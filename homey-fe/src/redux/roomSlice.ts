import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { Room, GetAllRoomParams } from "../types/room";
import type { Pagination } from "../types/common";
import RoomService from "../services/roomService";

type RoomState = {
    rooms: Room[];
    room: Room | null;
    pagination: Pagination | null;
    status: boolean;
    loading: boolean;
    error: string | null;
};

const initialState: RoomState = {
    rooms: [],
    room: null,
    pagination: null,
    status: false,
    loading: false,
    error: null,
};

export const getRoomList = createAsyncThunk(
    "room/getRoomList",
    async (payload: GetAllRoomParams = {}, { rejectWithValue }) => {
        try {
            const response = await RoomService.getAll(payload);
            return response; // { data: Room[], pagination: Pagination }
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                return rejectWithValue(err.response?.data || "Lỗi không xác định");
            }
            return rejectWithValue("Lỗi không xác định");
        }
    }
);

const roomSlice = createSlice({
    name: "room",
    initialState,
    reducers: {
        resetStatus: (state) => {
            state.status = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getRoomList.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getRoomList.fulfilled, (state, action) => {
                state.loading = false;
                state.rooms = action.payload.data; // mảng rooms
                state.pagination = action.payload.pagination; // pagination object
            })
            .addCase(getRoomList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { resetStatus } = roomSlice.actions;
export default roomSlice.reducer;
