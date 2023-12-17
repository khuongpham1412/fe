"use client";
import { useEffect } from "react";
import { Col, Row } from "antd";

import { useAppDispatch, useAppSelector } from "@/app/redux/hooks/hook";
import { getAllBookmarksAsync } from "@/app/redux/features/bookmark-slice";
import { Bookmark } from "@/app/typpes/bookmark.type";
import { BookmarkComponent } from "@/app/components/bookmark-component";
import HighlightComponent from "@/app/components/highlight-component";
import CreateFolder from "../components/createFolder";

export default function Home() {
  const dispatch = useAppDispatch();
  const bookmarks: Bookmark[] = useAppSelector(
    (state) => state.bookmark.data.data.bookmarks
  );

  useEffect(() => {
    dispatch(getAllBookmarksAsync({ page: "1", pageSide: "1" }));
  }, []);
  return (
    <Row style={{ height: "100vh" }}>
      <Col
        style={{
          background: "#f8fffe",
          overflowY: "scroll",
          overflowX: "hidden",
          maxHeight: "100vh",
          scrollbarColor: "#c5cae9",
        }}
        span={10}
      >
        <div className="flex justify-center flex-col items-center my-10 ">
          <BookmarkComponent data={bookmarks} />
          <CreateFolder title="Test" key="1"/>
        </div>
      </Col>
      <Col
        span={14}
        style={{
          background: "#f8fffe",
          overflowY: "scroll",
          overflowX: "hidden",
          maxHeight: "100vh",
          scrollbarColor: "#c5cae9",
        }}
      >
        <HighlightComponent />
      </Col>
    </Row>
  );
}
