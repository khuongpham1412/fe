import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import {
  BookmarkCreateResponse,
  GetAllBookMarksResponse,
} from "../../typpes/bookmark.type";
import {
  createBookmark,
  getAllBookmarks,
  getAllBookmarksSharedByOrthers,
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

export const getAllBookmarksSharedByOrthersAsync = createAsyncThunk<
  AxiosResponse<DataResponse<GetAllBookMarksResponse>>
>("bookmarks/fetch", async () => {
  const response = await getAllBookmarksSharedByOrthers();
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
    // Get all bookmarks
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

    // Get all bookmark is shared by orthers
    builder.addCase(getAllBookmarksSharedByOrthersAsync.pending, (state) => {
      state.pending = true;
      state.status = "loading";
    });
    builder.addCase(
      getAllBookmarksSharedByOrthersAsync.fulfilled,
      (state, { payload }) => {
        state.pending = false;
        state.status = "finished";
        state.data.data.bookmarks = payload.data.data.bookmarks;
      }
    );
    builder.addCase(
      getAllBookmarksSharedByOrthersAsync.rejected,
      (state, { payload }) => {
        state.pending = false;
        state.status = "error";
      }
    );

    // Create new bookmark
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
