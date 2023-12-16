import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import {
  BookmarkCreateResponse,
  GetAllBookMarksResponse,
} from "../../typpes/bookmark.type";
import {
  createBookmark,
  getAllBookmarks,
} from "../../services/bookmark.service";
import { AxiosResponse } from "axios";
import { DataResponse } from "@/app/typpes/data-response.type";

export interface GenericState<T> {
  data: T;
  pending: boolean;
  status: "loading" | "finished" | "error";
}

const initialState: GenericState<DataResponse<GetAllBookMarksResponse>> = {
  data: {
    data: {
      bookmarks: [],
    },
    message: "",
    statusCode: 0,
  },
  pending: false,
  status: "loading",
};

export const getAllBookmarksAsync = createAsyncThunk<
  AxiosResponse<DataResponse<GetAllBookMarksResponse>>,
  { page: number | string; pageSide: number | string }
>("bookmarks/fetch", async (params) => {
  const response = await getAllBookmarks(params.page, params.pageSide);
  return response;
});

export const createBookmarkAsync = createAsyncThunk(
  "bookmark/create",
  async (bookmark: BookmarkCreateResponse) => {
    const response = await createBookmark(bookmark);
    return response;
  }
);

export const bookmarkSlice = createSlice({
  name: "bookmarks",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    //fetch
    builder.addCase(getAllBookmarksAsync.pending, (state) => {
      state.pending = true;
      state.status = "loading";
    });
    builder.addCase(getAllBookmarksAsync.fulfilled, (state, { payload }) => {
      state.pending = false;
      state.status = "finished";
      state.data.data.bookmarks = payload.data.data.bookmarks;
    });
    builder.addCase(getAllBookmarksAsync.rejected, (state, { payload }) => {
      state.pending = false;
      state.status = "error";
    });

    builder.addCase(createBookmarkAsync.pending, (state) => {
      state.pending = true;
      state.status = "loading";
    });
    builder.addCase(createBookmarkAsync.fulfilled, (state, { payload }) => {
      state.pending = false;
      state.status = "finished";
      console.log(payload);
      // state.data = payload;
    });
    builder.addCase(createBookmarkAsync.rejected, (state, { payload }) => {
      state.pending = false;
      state.status = "error";
      console.log(payload);
    });
  },
});

export const bookmark = (state: RootState) => state.bookmark;

export default bookmarkSlice.reducer;
