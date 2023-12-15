import { ChannelPlaylistsType, PlaylistType, SearchedPlayListType } from "@/types";
import Image from "next/image";
import React from "react";
import numberCounter from "../../calc/numberCounter";
import { MdVideoLibrary } from "react-icons/md";
import videoTimeFormater from "../../calc/videoTimeFormater";
import Link from "next/link";
import playlistValidVideos from "@/calc/playlistValidVideos";

const PlaylistCard = ({ playlist }: { playlist: SearchedPlayListType }) => {
  return (
    <div className="flex flex-col gap-2" aria-label="videoCard">
      <Link
        href={`/playlist/${playlist.playlistId}`}
        aria-label="imageBox"
        className={`relative cursor-pointer bg-gray-300 dark:bg-gray-600 rounded-xl mt-3`}
      >
        <Image
          src={playlist.playlistThumbnail}
          width={1}
          height={1}
          aria-label="imageBox"
          alt=""
          className={`bg- absolute -top-1.5 left-1/2 w-11/12 h-[4px] -translate-x-1/2 z-10 bg-gray-300 dark:bg-gray-700 opacity-70 rounded-t-xl`}
        />
        <Image
          src={playlist.playlistThumbnail}
          width={1}
          height={1}
          aria-label="imageBox"
          alt=""
          className={`absolute -top-2 left-1/2 w-5/6 h-[3px] -translate-x-1/2 z-10 bg-gray-300 dark:bg-gray-700 opacity-50 rounded-t-xl`}
        />
        <Image
          src={playlist.playlistThumbnail}
          width={1}
          height={1}
          aria-label="imageBox"
          alt=""
          className={`absolute -top-2.5 left-1/2 w-2/3 h-[2px] -translate-x-1/2 z-10 bg-gray-300 dark:bg-gray-700 opacity-30 rounded-t-xl`}
        />
        <Image
          src={playlist.playlistThumbnail}
          width={320}
          height={180}
          alt="Video image"
          className={`rounded-lg aspect-[16/9] w-full`}
        />
        <div className="absolute top-0 bottom-0 left-0 right-0 z-30 flex items-center justify-center transition bg-black bg-opacity-50 rounded-lg opacity-0 hover:opacity-100">
          Show playlist...
        </div>
        <div
          aria-label="playlistVideosCount"
          className="absolute flex flex-row gap-1 px-1 pt-1 text-sm font-bold text-white bg-black rounded bottom-2 left-2 bg-opacity-60 w-fit"
        >
          {numberCounter(playlist.videoCount)} video
          {playlist.videoCount > 1 ? "s" : ""} <MdVideoLibrary />
        </div>
      </Link>
      <div aria-label="info" className="flex flex-col gap-2 text-start">
        <Link
          href={`/playlist/${playlist.playlistId}`}
          className="font-bold cursor-pointer text-trim max-h-12"
        >
          {playlist.title}
        </Link>
        <div className="text-xs text-subtitle-color">
          Playlist -&nbsp;
          <Link className="hover:underline" href={`/channel/${playlist.authorId}/videos`}>
            {playlist.author}
          </Link>
        </div>
        <div className="text-sm text-gray-700 dark:text-gray-200">
          {playlist.videos.map((video) => (
            <div key={video.videoId}>
              {video.title} - {videoTimeFormater(video.lengthSeconds)}
            </div>
          ))}
        </div>
        <Link
          href={`/playlist/${playlist.playlistId}`}
          className="text-sm text-subtitle-color"
        >
          Show playlist
        </Link>
      </div>
    </div>
  );
};

export default PlaylistCard;
