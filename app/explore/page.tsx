import React, { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@/app/redux/hooks/hook";
import SharingBookmarkComponent from "@/app/components/sharing-bookmark-component";
import { getAllBookmarksSharedByOrthersAsync } from "@/app/redux/features/bookmark-slice";
import { Bookmark } from "@/app/typpes/bookmark.type";

// let data = [
//   {
//     username: "User1",
//     avatarUser:
//       "https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png",
//     title: "Workout daily routine",
//     date: "2022 Sept 28",
//     content:
//       "There might be affiliate links on this page, which means we get a small commission of anything you buy. As an Amazon Associate we earn from qualifying purchases. Please do your own research before making any online purchase.",
//     likeCount: 14,
//     isLiked: true,
//     listAvatar: [
//       // "https://simplyirfan.com/blog/wp-content/uploads/2020/12/facebook-avatar-min.png",
//       // "https://cdn4.iconfinder.com/data/icons/instagram-ui-twotone/48/Paul-18-512.png",
//       // "https://pbs.twimg.com/media/Eh9ftpuXkAI31jn.png",
//       // "https://pbs.twimg.com/media/Eh9ftpuXkAI31jn.png",
//     ],
//     listTag: ["tag1", "tag2", "tag3", "tag4"],
//     link_preview: "https://web-highlights.com/explore",
//   }
// ];

const Explore = () => {
  const dispatch = useAppDispatch();
  const bookmarksSharedByOrthers: Bookmark[] = useAppSelector(
    (state) => state.bookmark.data.data.bookmarks
  );

  useEffect(() => {
    dispatch(getAllBookmarksSharedByOrthersAsync());
  }, []);

  return (
    <div className="flex justify-center flex-col items-center p-5 h-[100vh] gap-5">
      {bookmarksSharedByOrthers.map((item) => (
        <SharingBookmarkComponent key={item.id} data={item} />
      ))}
    </div>
  );
};

export default Explore;
