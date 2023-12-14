import { PlayListType } from "@/types";
import Image from "next/image";
import React from "react";
import numberCounter from "../../calc/numberCounter";
import { MdVideoLibrary } from "react-icons/md";
import videoTimeFormater from "../../calc/videoTimeFormater";

const PlaylistListItem = ({ playlist }: { playlist: PlayListType }) => {
  return (
    <div className="flex flex-row gap-5">
      <div
        aria-label="imageBox"
        className="relative cursor-pointer bg-gray-300 dark:bg-gray-600 rounded-xl basis-[320px] h-[180px] flex-shrink-0"
      >
        <div
          aria-label="imageBox"
          className={`absolute -top-1.5 left-1/2 -translate-x-1/2 z-10 bg-gray-300 dark:bg-gray-700 bg-[url('${playlist.playlistThumbnail})'] rounded-t-xl w-[300px] h-[4px]`}
        ></div>
        <div
          aria-label="imageBox"
          className={`absolute -top-2 left-1/2 -translate-x-1/2 z-10 bg-gray-300 dark:bg-gray-800 bg-[url('${playlist.playlistThumbnail})'] rounded-t-xl w-[280px] h-[3px]`}
        ></div>
        <div
          aria-label="imageBox"
          className={`absolute -top-2.5 left-1/2 -translate-x-1/2 z-10 bg-gray-300 dark:bg-gray-900 bg-[url('${playlist.playlistThumbnail})'] rounded-t-xl w-[260px] h-[2px]`}
        ></div>
        <Image
          src={playlist.playlistThumbnail}
          width={320}
          height={180}
          alt="Video image"
          className="aspect-[16/9] w-full"
        />
        <div
          aria-label="playlistVideosCount"
          className=" flex flex-row gap-1 absolute bottom-2 left-2 bg-black text-white rounded bg-opacity-60 font-bold px-1 text-sm pt-1 w-fit"
        >
          {numberCounter(playlist.videoCount)} video
          {playlist.videoCount > 1 ? "s" : ""} <MdVideoLibrary />
        </div>
      </div>
      <div aria-label="info" className="flex flex-col gap-2 text-start">
        <div className="cursor-pointer text-trim max-h-12 font-bold">
          {playlist.title}
        </div>
        <div className="underline text-subtitle-color text-xs">
          Playlist - {playlist.author}
        </div>
        <div className="dark:text-gray-200 text-gray-700 text-sm">
          {playlist.videos.map((video) => (
            <div key={video.videoId}>
              {video.title} - {videoTimeFormater(video.lengthSeconds)}
            </div>
          ))}
        </div>
        <div className="text-subtitle-color text-sm">Show playlist</div>
      </div>
    </div>
  );
};

export default PlaylistListItem;
