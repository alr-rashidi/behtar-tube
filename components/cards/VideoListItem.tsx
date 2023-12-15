import Image from "next/image";
import React from "react";
import { VideoType } from "@/types";
import videoTimeFormater from "../../calc/videoTimeFormater";
import numberCounter from "../../calc/numberCounter";
import Link from "next/link";
import dateCounter from "../../calc/dateCounter";

type PropsType = {
  video: VideoType
  size?: "small";
};
const VideoListItem = ({ video, size }: PropsType) => {
  return (
    <div className="flex flex-row gap-5">
      <Link
        href={`/video/${video.videoId}`}
        aria-label="imageBox"
        className={`relative ${
          size == "small" ? "w-32" : "w-2/6 max-w-xs"
        } h-max flex-shrink-0 cursor-pointer bg-gray-300 dark:bg-gray-600 ${
          size == "small" ? "rounded-lg" : "rounded-xl"
        } overflow-hidden`}
      >
        <Image
          src={video.videoThumbnails[4].url}
          width={video.videoThumbnails[4].width}
          height={video.videoThumbnails[4].height}
          alt="Video image"
          className="aspect-[16/9] w-full"
        />
        <div
          aria-label="videoLengthSeconds"
          className="absolute px-1 pt-1 text-xs font-bold text-white bg-black rounded bottom-1 left-1 bg-opacity-80 w-fit"
        >
          {videoTimeFormater(video.lengthSeconds)}
        </div>
      </Link>
      <div
        aria-label="info"
        className={`flex flex-col gap-2 ${
          size != "small" && "pt-2"
        } text-start`}
      >
        <Link
          href={`/video/${video.videoId}`}
          className={`text-trim text-lines-1 max-h-12  ${
            size == "small" ? "text-sm" : "text-base"
          }`}
        >
          {video.title}
        </Link>
        <Link
          href={`/channel/${video.authorId}/videos`}
          className={`hover:underline text-subtitle-color  ${
            size == "small" ? "text-xs" : "text-sm"
          } w-max`}
        >
          {video.author}
        </Link>
        <div
          className={`text-subtitle-color ${
            size == "small" ? "text-xs" : "text-sm"
          }`}
        >
          {video.viewCount ? numberCounter(video.viewCount) + " views" : null}
          {video.published ? ` - ${dateCounter(video.published)}` : null}
        </div>
        <div>{video.description}</div>
      </div>
    </div>
  );
};

export default VideoListItem;
