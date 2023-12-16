import React from "react";
import Post from "../components/post";
import { HeartOutlined } from "@ant-design/icons";

let data = [
  {
    username: "User1",
    avatarUser:
      "https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png",
    title: "Workout daily routine",
    date: "2022 Sept 28",
    content:
      "There might be affiliate links on this page, which means we get a small commission of anything you buy. As an Amazon Associate we earn from qualifying purchases. Please do your own research before making any online purchase.",
    likeCount: 14,
    isLiked: true,
    listAvatar: [
      // "https://simplyirfan.com/blog/wp-content/uploads/2020/12/facebook-avatar-min.png",
      // "https://cdn4.iconfinder.com/data/icons/instagram-ui-twotone/48/Paul-18-512.png",
      // "https://pbs.twimg.com/media/Eh9ftpuXkAI31jn.png",
      // "https://pbs.twimg.com/media/Eh9ftpuXkAI31jn.png",
    ],
    listTag: ["tag1", "tag2", "tag3", "tag4"],
    link_preview: "https://web-highlights.com/explore",
  },
  {
    username: "User2",
    avatarUser:
      "https://cdn1.iconfinder.com/data/icons/user-pictures/100/female1-512.png",
    title: "GTA VI new trailer released",
    date: "2022 July 17",
    content:
      "In a message to fans posted on the Rockstar Newswire and Rockstar's social media accounts, Sam Houser has thanked players worldwide for being part of their journey in making videogames as part of culture as essential as any other form of entertainment. Houser signs off the message with an announcement that the first trailer for the next Grand Theft Auto game will be released early next month.",
    likeCount: 56,
    isLiked: true,
    listAvatar: [
      // "https://simplyirfan.com/blog/wp-content/uploads/2020/12/facebook-avatar-min.png",
      // "https://cdn4.iconfinder.com/data/icons/instagram-ui-twotone/48/Paul-18-512.png",
      // "https://www.mlive.com/resizer/UEaVb0UEZ-FOOmU5sH-jaAPzEgI=/1280x0/smart/cloudfront-us-east-1.images.arcpublishing.com/advancelocal/ETSJBFFEBNBCDG6BVGJWPZMVPI.jpg",
    ],
    listTag: ["tag1", "tag2"],
    link_preview: "https://www.youtube.com/watch?v=4PtY-U5lrIA&t=882s",
  },
];

const Liked = () => {
  return (
    <div className="flex justify-center flex-col items-center p-5 h-[100vh] gap-5">
      {data.length > 0 ? (
        data.map((item) => <Post key={item.username} data={item} />)
      ) : (
        <div className="empty-state flex flex-col items-center justify-center text-center color-#292929 p-12">
          <HeartOutlined className="heart-icon text-black" />
          <div className="title text-2xl font-semibold text-black">
            No liked pages
          </div>
          <div className="sub-title text-lg text-black">
            Explore what others shared. Your liked pages will appear here.
          </div>
        </div>
      )}
    </div>
  );
};

export default Liked;
