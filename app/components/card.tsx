// 'use-client'
import { Card, Avatar, Row, Col } from "antd";
import { ClockCircleOutlined, UserOutlined } from "@ant-design/icons";
import { useRouter, useSearchParams } from "next/navigation";
import DropdownMenu from "./dropdown";
import Image from "next/image";
import { DataResponse } from "../typpes/data-response.type";
import { Bookmark } from "../typpes/bookmark.type";
interface DataModel {
  alias: string;
  created_at: Date;
  description: string;
  folder_id: number;
  id: string;
  image: string;
  status: number;
  title: string;
  updated_at: string;
  url: string;
}

const CardComponent: React.FC<{ data: Bookmark[] }> = ({ data }) => {
  if (!data) {
    return <div>No data available</div>;
  }

  const maxLength = 50;
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    };
    const formattedDate = new Date(dateString).toLocaleDateString(
      "en-US",
      options
    );
    return formattedDate;
  };

  const handleClick = (id: string) => {
    router.push(`admin?id=${id}`);
  };

  return (
    <Row gutter={[16, 16]} className="w-100">
      {data.map((item) => (
        <Col
          xs={24}
          sm={24}
          md={12}
          lg={24}
          xl={20}
          className="mx-auto shadow-md cursor-pointer"
          style={{ padding: "0" }}
          key={item.id}
        >
          <Card
            style={{ width: "100%" }} // Thiết lập chiều rộng mặc định cho mọi kích thước màn hình
            title={
              <div className="header flex items-center">
                <Avatar
                  style={{ backgroundColor: "#87d068" }}
                  icon={<UserOutlined />}
                />
                <p className="text-xs mx-1">{item.alias}</p>
                <p className="text-xs mx-1">{formatDate(item.updated)}</p>
                <ClockCircleOutlined />
              </div>
            }
            className={`bg-white hover:bg-slate-50 ${
              item.id.toString() === id?.toString() && "border-cyan-500 border-2"
            }`}
            extra={<DropdownMenu />}
          >
            <Row
              className="items-center justify-between"
              onClick={() => handleClick(item.id.toString())}
            >
              <Col xs={24} sm={24} md={12} lg={8} xl={12}>
                <h4 className="text-lg">{truncateText(item.title, 50)}</h4>
                <p className="description">
                  {truncateText(item.description, 50)}
                </p>
                <a
                  style={{ fontSize: "12px" }}
                  className="link"
                  href={item.url}
                >
                  {truncateText(item.url, 50)}
                </a>
              </Col>
              <Col>
                <Image
                  width={150}
                  height={100}
                  className="object-cover"
                  alt="error"
                  src={item.image}
                />

                <p className="text-xs text-gray-400">
                  {item.countHighlight} Highlight & {item.countNote} Notes
                </p>
              </Col>
            </Row>
          </Card>
        </Col>
      ))}
    </Row>
  );
};
export { CardComponent };
