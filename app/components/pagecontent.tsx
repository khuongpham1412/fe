import {
  ClockCircleOutlined,
  DeleteOutlined,
  ShareAltOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Card, Col, Empty, Layout, Row, Space } from "antd";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import DropdownMenu from "./dropdown";
import { useAppDispatch, useAppSelector } from "../redux/hooks/hook";
import { GetAllHighlightResponse, Highlight } from "../typpes/highlight.type";
import Image from "next/image";
import { getAllHighlightByBookmarkIdAsync } from "../redux/features/highlight-slice";

function PageContent() {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const bookmarkId = searchParams.get("id");
  const infoHighlightByBookmarkId: GetAllHighlightResponse = useAppSelector(
    (state) => state.highlight.data.data
  );

  const {
    id,
    folderId,
    url,
    alias,
    title,
    description,
    image,
    status,
    created,
    updated,
    likes,
    countHighlight,
    countNote,
  } = infoHighlightByBookmarkId.bookmark;

  const highlights: Highlight[] = infoHighlightByBookmarkId.highlights;

  // Get all highlight by bookmark id
  useEffect(() => {
    if (bookmarkId) {
      dispatch(
        getAllHighlightByBookmarkIdAsync({ page: 1, pageSide: 1, bookmarkId })
      );
    }
  }, [bookmarkId]);

  if (highlights) {
    // Check if highlight is not null or undefined
    // const highlightArray = Object.values(highlight);
    // console.log(typeof highlightArray);
    // Hoặc sử dụng Object.keys() và map():
    // const highlightArray = Object.keys(highlight).map((key) => highlight[key]);
    // console.log(highlightArray);
  }

  const truncateText = (text: string, maxLength: number) => {
    if (text?.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  function highlightText(
    content: string,
    startIndex: number,
    endIndex: number,
    color: string
  ) {
    // Tách thành ba phần: trước, phần cần tô màu, và sau
    const beforeHighlight = content.slice(0, startIndex);
    const highlightedText = content.slice(startIndex, endIndex);
    const afterHighlight = content.slice(endIndex);

    return (
      <div className={`border-l-[6px] border-[${color}] pl-4 relative mb-2`}>
        {/* Phần trước */}
        <p style={{ whiteSpace: "pre-line", margin: "0" }}>
          {beforeHighlight}
          <span
            style={{
              whiteSpace: "pre-line",
              background: `${color}`,
              padding: "0.2rem",
              margin: "0", // Tùy chỉnh để loại bỏ khoảng cách giữa các phần
            }}
          >
            {highlightedText}
          </span>
          <span
            style={{ whiteSpace: "pre-line", display: "inline", margin: "0" }}
          >
            {truncateText(afterHighlight, 20)}
          </span>
        </p>

        {/* Phần sau */}

        <Space className="absolute top-0 right-0 text-lg">
          <ShareAltOutlined className="hover:text-sky-500" />
          <DeleteOutlined className="hover:text-rose-500" />
        </Space>
      </div>
    );
  }

  return (
    <Layout.Content>
      {!infoHighlightByBookmarkId.bookmark || !highlights ? (
        <div className="flex items-center justify-center h-screen">
          <Empty description="Không có dữ liệu, hãy chọn bookmark cần xem" />
        </div>
      ) : (
        <div className="w-full">
          <div style={{ position: "relative", width: "100%", height: "30vh" }}>
            <Image src="" alt="error" layout="fill" objectFit="cover" />
          </div>
          <Row>
            <Col
              xs={24}
              sm={24}
              md={12}
              lg={24}
              xl={24}
              className="mx-auto  shadow-md cursor-pointer"
              style={{ padding: "0", height: "100vh" }}
            >
              <Card
                style={{ width: "100%", height: "100%" }}
                title={
                  <div className="header flex items-center ">
                    <Avatar
                      style={{ backgroundColor: "#87d068" }}
                      icon={<UserOutlined />}
                    />
                    <p className="text-xs mx-1">{alias}</p>
                    <p className="text-xs mx-1">{created}</p>
                    <ClockCircleOutlined />
                  </div>
                }
                className="bg-white px-20 flex flex-col hover:bg-slate-50"
                extra={<DropdownMenu />}
              >
                <Row className=" justify-between flex-col">
                  <Col xs={24} sm={24} md={12} lg={8} xl={24}>
                    <h1
                      className=""
                      style={{
                        fontSize: "20px",
                        color: "#333",
                        fontWeight: "700",
                      }}
                    >
                      {truncateText(title, 70)}
                    </h1>
                    <a href={url} className="text-sm">
                      {truncateText(url, 60)}
                    </a>

                    <p className="link"></p>
                  </Col>
                  <Col
                    xs={24}
                    sm={24}
                    md={12}
                    lg={8}
                    xl={24}
                    style={{ marginTop: "30px" }}
                  >
                    <h1 className="font-bold text-lg">Description</h1>
                    <p>{truncateText(description, 200)}</p>
                  </Col>
                  <Col
                    xs={24}
                    sm={24}
                    md={12}
                    lg={8}
                    xl={24}
                    style={{ marginTop: "30px" }}
                  >
                    <h1 className="font-bold text-lg">Tags & Directories</h1>
                    <p>Not tags found </p>
                  </Col>
                  <Col
                    xs={24}
                    sm={24}
                    md={12}
                    lg={8}
                    xl={24}
                    style={{ marginTop: "30px" }}
                  >
                    <h1 className="font-bold text-lg">Highlight & Notes</h1>
                    {highlights.map((item: Highlight, index: number) => (
                      <>
                        <div key={index}>
                          {highlightText(
                            item.content,
                            item.startIndex,
                            item.endIndex,
                            item.color
                          )}
                        </div>
                        <div
                          className="note"
                          style={{
                            height: "auto",
                            padding: 0,
                            background: "#3d4455",
                            color: "#dddddd",
                            border: "none",
                            borderRadius: "5px",
                          }}
                        >
                          <div
                            className="ql-editor"
                            style={{ padding: "5px 10px" }}
                          >
                            {item.note}
                          </div>
                        </div>
                      </>
                    ))}

                    {/* <TextSelect color="rose-300" content="Nothing here" /> */}
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </div>
      )}
    </Layout.Content>
  );
}

export default PageContent;
