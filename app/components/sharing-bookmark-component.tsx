"use client";
import { HeartFilled } from "@ant-design/icons";
import { Avatar, Card, Space } from "antd";
import React, { useState } from "react";
import Image from "next/image";
import { Bookmark } from "../typpes/bookmark.type";

// interface SharingBookmarkProps {
//   username: string;
//   avatarUser: string;
//   title: string;
//   date: string;
//   content: string;
//   likeCount: number;
//   isLiked: boolean;
//   listAvatar: string[];
//   listTag: string[];
//   link_preview: string;
// }

const SharingBookmarkComponent: React.FC<{ data: Bookmark }> = ({ data }) => {
  const {
    alias,
    countHighlight,
    countNote,
    created,
    description,
    folderId,
    id,
    image,
    likes,
    status,
    title,
    updated,
    url,
  } = data;
  // const [liked, setLiked] = useState<boolean>(isLiked);
  // const [likeCountState, setLikeCountState] = useState<number>(likeCount);

  const handleLike = () => {
    // setLiked((prev) => !prev);
    // setLikeCountState((prevCount) => (liked ? prevCount - 1 : prevCount + 1));
    // You may want to send a request to update the server with the new like status and count
  };

  return (
    <Card
      title={
        <Space>
          <Avatar src="avater user" />
          <div>username</div>
          <div className="date text-xs text-gray-400">{created}</div>
        </Space>
      }
      className="sm:min-w-[100px] md:min-w-[200px] lg:min-w-[300px] xl:min-w-[600px]"
      hoverable
    >
      <div className="text-2xl font-semibold mb-3">{title}</div>
      <div>{title}</div>
      <Space className="mt-5">
        {/* <HeartFilled
          className={`text-lg ${liked ? "text-rose-500" : ""}`}
          onClick={handleLike}
        /> */}
        {/* {listAvatar.map((avatar, index) => (
          <Image
            key={index}
            className="avatar"
            src={avatar}
            style={{
              zIndex: index + 1,
              marginLeft: index > 0 ? `-15px` : "0",
            }}
            alt={`Avatar ${index + 1}`}
          />
        ))} */}
        <div>
          {/* {likeCountState} {likeCountState === 1 ? "like" : "likes"} */}
        </div>
      </Space>
      <p className="w-full h-15 text-xs text-gray-600 animate-pulse">{url}</p>

      {/* <div className="tags">
        {listTag.slice(0, 2).map((tag, index) => (
          <span key={index} className="tag">
            {tag}
          </span>
        ))}
        {listTag.length > 2 && (
          <span className="tag">{listTag.length - 2} more</span>
        )}
      </div> */}
    </Card>
  );
};

export default SharingBookmarkComponent;
