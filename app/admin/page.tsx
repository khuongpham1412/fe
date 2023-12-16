"use client";
import { CardComponent } from "@/app/components/card";
import PageContent from "@/app/components/pagecontent";
import { Col, Row } from "antd";
import { useAppDispatch, useAppSelector } from "../redux/hooks/hook";
import { getAllBookmarksAsync } from "../redux/features/bookmark-slice";
import { useEffect } from "react";
import { Bookmark } from "../typpes/bookmark.type";

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
          <CardComponent data={bookmarks} />
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
        <PageContent />
      </Col>
    </Row>
  );
}
