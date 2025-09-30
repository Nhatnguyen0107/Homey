import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { Pagination, TAny } from "../types/common";
import TagsService from "../services/tagsService";

type TagState = {
  tagsList: TAny;
  pagination: Pagination | null;
  loading: boolean;
  error: string | null;
};

const initialState: TagState = {
  tagsList: [],
  pagination: null,
  loading: false,
  error: null,
};

export const getTagsList = createAsyncThunk(
  "tags/getTagsList", // type
  async (payload: TAny, { rejectWithValue }) => {
    try {
      const response = await TagsService.getAll(payload);
      return response; // Dữ liệu trả về sẽ nằm ở action.payload
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(err.response?.data || "Lỗi không xác định");
      }
      return rejectWithValue("Lỗi không xác định");
    }
  }
);

const tagsSlice = createSlice({
  name: "tags",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // getCategoryList
      .addCase(getTagsList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTagsList.fulfilled, (state, action) => {
        state.loading = false;
        state.tagsList = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(getTagsList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string; // Lưu lỗi nếu có
      });
  },
});

// Export actions và reducer
export default tagsSlice.reducer;
