import { PlayListType } from "@/types";
import Image from "next/image";
import React from "react";
import videoTimeFormater from "../../calc/videoTimeFormater";
import numberCounter from "../../calc/numberCounter";
import { MdVideoLibrary } from "react-icons/md";

const PlaylistCard = ({ playlist }: { playlist: PlayListType }) => {
  return (
    <div className="flex flex-col gap-2" aria-label="videoCard">
      <div
        aria-label="imageBox"
        className={`relative cursor-pointer bg-gray-300 dark:bg-gray-600 rounded-xl mt-3`}
      >
        <Image
          src={playlist.playlistThumbnail}
          width={1}
          height={1}
          aria-label="imageBox"
          alt=""
          className={`bg- absolute -top-1.5 left-1/2 w-11/12 h-[4px] -translate-x-1/2 z-10 bg-gray-300 dark:bg-gray-700 bg-[url('${playlist.playlistThumbnail})'] rounded-t-xl`}
        />
        <Image
          src={playlist.playlistThumbnail}
          width={1}
          height={1}
          aria-label="imageBox"
          alt=""
          className={`absolute -top-2 left-1/2 w-5/6 h-[3px] -translate-x-1/2 z-10 bg-gray-300 dark:bg-gray-800 bg-[url('${playlist.playlistThumbnail})'] rounded-t-xl`}
        />
        <Image
          src={playlist.playlistThumbnail}
          width={1}
          height={1}
          aria-label="imageBox"
          alt=""
          className={`absolute -top-2.5 left-1/2 w-2/3 h-[2px] -translate-x-1/2 z-10 bg-gray-300 dark:bg-gray-900 rounded-t-xl`}
        />
        <Image
          src={playlist.playlistThumbnail}
          width={320}
          height={180}
          alt="Video image"
          className={`object-cover rounded-lg aspect-[16/9] w-full`}
        />
        <div
          aria-label="playlistVideosCount"
          className="absolute flex flex-row gap-1 px-1 pt-1 text-sm font-bold text-white bg-black rounded  bottom-2 left-2 bg-opacity-60 w-fit"
        >
          {numberCounter(playlist.videoCount)} video
          {playlist.videoCount > 1 ? "s" : ""} <MdVideoLibrary />
        </div>
      </div>
      <div aria-label="info" className="flex flex-col gap-2 text-start">
        <div className="font-bold cursor-pointer text-trim max-h-12">
          {playlist.title}
        </div>
        <div className="text-xs underline text-subtitle-color">
          Playlist - {playlist.author}
        </div>
        <div className="text-sm text-gray-700 dark:text-gray-200">
          {playlist.videos.map((video) => (
            <div key={video.videoId}>
              {video.title} - {videoTimeFormater(video.lengthSeconds)}
            </div>
          ))}
        </div>
        <div className="text-sm text-subtitle-color">Show playlist</div>
      </div>
    </div>
  );
};

export default PlaylistCard;
