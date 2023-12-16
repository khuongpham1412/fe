import https from "../apis/https";
import { DataResponse } from "../typpes/data-response.type";
import { GetAllHighlightResponse } from "../typpes/highlight.type";

// export const getAllHighlight = async (
//   page: number | string,
//   limit: number | string
// ) => {
//   return await https.get<DataResponse<Highlight>>("bookmarks", {
//     params: { folderId: 1 },
//   });
// };

export const getAllHighlightByBookmarkId = (bookmarkId: number | string) => {
  return https.get<DataResponse<GetAllHighlightResponse>>("highlights", {
    params: { bookmark_id: bookmarkId },
  });
};

// export const createBookmark = (bookmark: Omit<Bookmark, "id">) => {
//   return https.post<Bookmark>("bookmarks", bookmark);
// };

// export const updateBookmark = (id: number | string, bookmark: Bookmark) => {
//   return https.put<Bookmark>(`bookmark/${id}`, bookmark);
// };

// export const deleteHighlight = (id: number | string) => {
//   return https.delete(`bookmark/${id}`);
// };
