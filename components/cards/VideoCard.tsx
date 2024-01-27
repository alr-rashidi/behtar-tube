import { VideoType } from "@/types";
import dateCounter from "@/utils/dateCounter";
import numberCounter from "@/utils/numberCounter";
import videoTimeFormater from "@/utils/videoTimeFormater";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type ParamsType = { video: VideoType; type?: "short" };

const VideoCard = ({ video, type: videoType }: ParamsType) => {
  return (
    <div
      className="flex flex-col items-center w-full max-w-sm gap-2 mx-auto"
      aria-label="videoCard"
    >
      <Link
        href={`/video/${video.videoId}`}
        aria-label="imageBox"
        className={`relative w-full cursor-pointer bg-gray-300 dark:bg-gray-600 rounded-xl overflow-hidden`}
      >
        <Image
          src={video.videoThumbnails[3].url}
          width={videoType == "short"
            ? video.videoThumbnails[2].width
            : video.videoThumbnails[4].width}
          height={videoType == "short"
            ? video.videoThumbnails[2].height
            : video.videoThumbnails[4].height}
          alt="Video image"
          className={`object-cover ${videoType == "short" ? "aspect-[9/16]" : "aspect-[16/9]"} w-full`}
        />
        <div
          aria-label="videoLengthSeconds"
          className="absolute px-1 text-sm font-bold text-white bg-black rounded bottom-1 left-1 bg-opacity-80 w-fit"
        >
          {videoTimeFormater(video.lengthSeconds)}
        </div>
      </Link>
      <div aria-label="info" className="flex flex-col w-full gap-2 text-start">
        <Link
          href={`/video/${video.videoId}`}
          className="cursor-pointer hover:underline text-trim text-lines-1 max-h-12"
        >
          {video.title}
        </Link>
        <Link
          href={`/channel/${video.videoId}/videos`}
          className="text-sm text-gray-500 cursor-pointer hover:underline dark:text-gray-400"
        >
          {video.author}
        </Link>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {numberCounter(video.viewCount)} views -&nbsp;
          {dateCounter(video.published)}
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
