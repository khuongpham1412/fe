export interface Bookmark {
  id: number;
  folderId: number;
  url: string;
  alias: string;
  title: string;
  description: string;
  image: string;
  status: number;
  created: string;
  updated: string;
  likes: number;
  countHighlight: number;
  countNote: number;
}

export interface BookmarkCreateResponse {
  bookmark: Bookmark
}

export interface GetAllBookMarksResponse {
  bookmarks: Bookmark[]
}