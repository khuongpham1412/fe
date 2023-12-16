import https from "../apis/https";
import {
  BookmarkCreateResponse,
  GetAllBookMarksResponse,
} from "../typpes/bookmark.type";
import { DataResponse } from "../typpes/data-response.type";

export const getAllBookmarks = async (
  page: number | string,
  limit: number | string
) => {
  return await https.get<DataResponse<GetAllBookMarksResponse>>("bookmarks");
};

export const getAllBookmarksByFolderId = (folderId: number | string) => {
  return https.get<DataResponse<GetAllBookMarksResponse>>("bookmarks", {
    params: { folder_id: folderId },
  });
};

// export const getAllBookmarksById = (id: number | string) => {
//   return https.get<Bookmark>(`bookmark/${id}`);
// };

export const createBookmark = (
  bookmark: Omit<BookmarkCreateResponse, "id">
) => {
  return https.post<BookmarkCreateResponse>("bookmarks", bookmark);
};

// export const updateBookmark = (id: number | string, bookmark: Bookmark) => {
//   return https.put<Bookmark>(`bookmark/${id}`, bookmark);
// };

export const deleteBookmark = (id: number | string) => {
  return https.delete(`bookmark/${id}`);
};
