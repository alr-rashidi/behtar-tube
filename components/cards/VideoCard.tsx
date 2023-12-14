import { VideoType } from "@/types";
import Image from "next/image";
import React from "react";
import videoTimeFormater from "../../calc/videoTimeFormater";
import numberCounter from "../../calc/numberCounter";
import Link from "next/link";
import dateCounter from "../../calc/dateCounter";

type ParamsType = { video: VideoType; type?: "short" };

const VideoCard = ({ video, type: videoType }: ParamsType) => {
  return (
    <Link
      href={`/video/${video.videoId}`}
      className="flex flex-col items-center w-full max-w-sm gap-2 mx-auto"
      aria-label="videoCard"
    >
      <div
        aria-label="imageBox"
        className={`relative w-full cursor-pointer bg-gray-300 dark:bg-gray-600 rounded-xl overflow-hidden`}
      >
        <Image
          src={video.videoThumbnails[3].url}
          width={
            videoType == "short"
              ? video.videoThumbnails[2].width
              : video.videoThumbnails[4].width
          }
          height={
            videoType == "short"
              ? video.videoThumbnails[2].height
              : video.videoThumbnails[4].height
          }
          alt="Video image"
          className={`object-cover ${
            videoType == "short" ? "aspect-[9/16]" : "aspect-[16/9]"
          } w-full`}
        />
        <div
          aria-label="videoLengthSeconds"
          className="absolute px-1 pt-1 text-sm font-bold text-white bg-black rounded bottom-1 left-1 bg-opacity-80 w-fit"
        >
          {videoTimeFormater(video.lengthSeconds)}
        </div>
      </div>
      <div aria-label="info" className="flex flex-col w-full gap-2 text-start">
        <div className="cursor-pointer text-trim max-h-12">{video.title}</div>
        <div className="text-sm text-gray-500 underline cursor-pointer dark:text-gray-400">
          {video.author}
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {numberCounter(video.viewCount)} views -
          {dateCounter(video.published)}
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;
