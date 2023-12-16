import { configureStore } from "@reduxjs/toolkit";
import bookmarkSlice from "../features/bookmark-slice";
import highlightSlice from "../features/highlight-slice";

export const store = configureStore({
  reducer: {
    bookmark: bookmarkSlice,
    highlight: highlightSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Infer the RootState and AppDispatch types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
// export type AppThunk<ReturnType = void> = ThunkAction<
//   ReturnType,
//   RootState,
//   unknown,
//   Action<string>
// >;
