import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { Pagination, TAny } from "../types/common";
import TagsService from "../services/tagsService";

type TagState = {
  tagsList: TAny;
  tagDetail: TAny | null;
  pagination: Pagination | null;
  loading: boolean;
  error: string | null;
};

const initialState: TagState = {
  tagsList: [],
  tagDetail: null,
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

export const deleteTag = createAsyncThunk(
  "tags/deleteTag", // type
  async (id: string, { dispatch, rejectWithValue }) => {
    try {
      const response = await TagsService.delete(id);
      dispatch(getTagsList({}));
      return response; // Dữ liệu trả về sẽ nằm ở action.payload
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(err.response?.data || "Lỗi không xác định");
      }
      return rejectWithValue("Lỗi không xác định");
    }
  }
);

export const getTagDetail = createAsyncThunk(
  "tags/getTagDetail", // type
  async (payload: TAny, { rejectWithValue }) => {
    try {
      const response = await TagsService.getById(payload);
      return response; // Dữ liệu trả về sẽ nằm ở action.payload
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(err.response?.data || "Lỗi không xác định");
      }
      return rejectWithValue("Lỗi không xác định");
    }
  }
);

export const createTag = createAsyncThunk(
  "tags/createTag", // type
  async ({ data, cb }: TAny, { rejectWithValue }) => {
    try {
      const response = await TagsService.create(data);
      cb();
      return response; // Dữ liệu trả về sẽ nằm ở action.payload
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(err.response?.data || "Lỗi không xác định");
      }
      return rejectWithValue("Lỗi không xác định");
    }
  }
);

export const updateTag = createAsyncThunk(
  "tags/updateTag", // type
  async ({ id, data, cb }: TAny, { rejectWithValue }) => {
    try {
      const response = await TagsService.update(id, data);
      cb();
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

    builder
      // getTagDetail
      .addCase(getTagDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTagDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.tagDetail = action.payload;
      })
      .addCase(getTagDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string; // Lưu lỗi nếu có
      });

    builder
      // createTag
      .addCase(createTag.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTag.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createTag.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string; // Lưu lỗi nếu có
      });

    builder
      // updateTag
      .addCase(updateTag.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTag.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateTag.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string; // Lưu lỗi nếu có
      });
  },
});

// Export actions và reducer
export default tagsSlice.reducer;
