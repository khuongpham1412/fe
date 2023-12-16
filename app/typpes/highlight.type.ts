import { Bookmark } from "./bookmark.type";

export interface Highlight {
  id: number;
  locate_path: string;
  alias: string;
  updated_at: string;
  created_at: string;
  status: number;
  note: string;
  color: string;
  is_remember: number;
  content: string;
  startIndex: number;
  endIndex: number;
  is_voca: boolean;
  is_learning: boolean;
  bookmark_id: number;
}

export interface GetAllHighlightResponse {
  bookmark: Bookmark;
  highlights: Highlight[];
}
