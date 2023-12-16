import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import { GetAllHighlightResponse } from "../../typpes/highlight.type";
import {
  getAllHighlightByBookmarkId,
  // createBookmark,
} from "../../services/highlight.service";
import { AxiosResponse } from "axios";
import { DataResponse } from "@/app/typpes/data-response.type";
import { Bookmark } from "@/app/typpes/bookmark.type";

export interface GenericState<T> {
  data: T;
  pending: boolean;
  status: "loading" | "finished" | "error";
}

const initialState: GenericState<DataResponse<GetAllHighlightResponse>> = {
  data: {
    data: {
      bookmark: {
        id: 0,
        folderId: 0,
        url: "",
        alias: "",
        title: "",
        description: "",
        image: "",
        status: 0,
        created: "",
        updated: "",
        likes: 0,
        countHighlight: 0,
        countNote: 0,
      },
      highlights: []
    },
    message: "",
    statusCode: 0
  },
  pending: false,
  status: "loading",
};

export const getAllHighlightByBookmarkIdAsync = createAsyncThunk<
  AxiosResponse<DataResponse<GetAllHighlightResponse>>,
  { page: number | string; pageSide: number | string, bookmarkId: number | string }
>("highlightsByBookmarkId/fetch", async (params) => {
  const response = await getAllHighlightByBookmarkId(params.bookmarkId);
  return response;
});

// export const createBookmarkAsync = createAsyncThunk(
//   "bookmark/create",
//   async (bookmark: Bookmark) => {
//     const response = await createBookmark(bookmark);
//     return response;
//   }
// );

export const highlightSlice = createSlice({
  name: "highlights",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    //fetch
    builder.addCase(getAllHighlightByBookmarkIdAsync.pending, (state) => {
      state.pending = true;
      state.status = "loading";
    });
    builder.addCase(
      getAllHighlightByBookmarkIdAsync.fulfilled,
      (state, { payload }) => {
        state.pending = false;
        state.status = "finished";
        state.data.data = payload.data.data;
      }
    );
    builder.addCase(
      getAllHighlightByBookmarkIdAsync.rejected,
      (state, { payload }) => {
        state.pending = false;
        state.status = "error";
      }
    );

    // builder.addCase(createBookmarkAsync.pending, (state) => {
    //   state.pending = true;
    //   state.status = "loading";
    // });
    // builder.addCase(createBookmarkAsync.fulfilled, (state, { payload }) => {
    //   state.pending = false;
    //   state.status = "finished";
    //   console.log(payload);
    //   // state.data = payload;
    // });
    // builder.addCase(createBookmarkAsync.rejected, (state, { payload }) => {
    //   state.pending = false;
    //   state.status = "error";
    //   console.log(payload);
    // });
  },
});

export const highlight = (state: RootState) => state.highlight;

export default highlightSlice.reducer;
