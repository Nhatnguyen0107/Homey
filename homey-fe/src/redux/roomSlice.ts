import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { Room, GetAllRoomParams } from "../types/room";
import type { Pagination, TAny } from "../types/common";
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
export const getRoomDetail = createAsyncThunk(
    "room/getRoomDetail", // type
    async (id: string, { rejectWithValue }) => {
        try {
            const response = await RoomService.getById(id);
            return response; // Dữ liệu trả về sẽ nằm ở action.payload
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                return rejectWithValue(err.response?.data || "Lỗi không xác định");
            }
            return rejectWithValue("Lỗi không xác định");
        }
    }
);
export const updateRoom = createAsyncThunk(
    "room/updateRoom", // type
    async (payload: TAny, { rejectWithValue }) => {
        try {
            const response = await RoomService.update(payload.id, payload.data);
            return response; // Dữ liệu trả về sẽ nằm ở action.payload
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                return rejectWithValue(err.response?.data || "Lỗi không xác định");
            }
            return rejectWithValue("Lỗi không xác định");
        }
    }
);

export const deleteRoom = createAsyncThunk(
    "room/deleteRoom", // type
    async ({ id }: TAny, { dispatch, rejectWithValue }) => {
        try {
            const response = await RoomService.delete(id);
            // cb();
            dispatch(getRoomList({}));
            return response; // Dữ liệu trả về sẽ nằm ở action.payload
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                return rejectWithValue(err.response?.data || "Lỗi không xác định");
            }
            return rejectWithValue("Lỗi không xác định");
        }
    }
);

export const createRoom = createAsyncThunk(
    "room/createRoom", // type
    async (payload: TAny, { rejectWithValue }) => {
        try {
            const response = await RoomService.create(payload);
            return response; // Dữ liệu trả về sẽ nằm ở action.payload
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

        builder
            // getRoomDetail
            .addCase(getRoomDetail.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getRoomDetail.fulfilled, (state, action) => {
                state.loading = false;
                state.room = action.payload;
            })
            .addCase(getRoomDetail.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string; // Lưu lỗi nếu có
            });

        builder
            // createRoom
            .addCase(createRoom.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createRoom.fulfilled, (state) => {
                state.loading = false;
                state.status = true;
            })
            .addCase(createRoom.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string; // Lưu lỗi nếu có
            });

        builder
            // editRoom
            .addCase(updateRoom.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateRoom.fulfilled, (state) => {
                state.loading = false;
                state.status = true;
            })
            .addCase(updateRoom.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string; // Lưu lỗi nếu có
            });

        builder
            // deleteRoom
            .addCase(deleteRoom.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteRoom.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(deleteRoom.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string; // Lưu lỗi nếu có
            });
    },
});

export const { resetStatus } = roomSlice.actions;
export default roomSlice.reducer;
