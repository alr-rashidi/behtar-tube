import { VideoType } from "@/types";
import dateCounter from "@/utils/dateCounter";
import numberCounter from "@/utils/numberCounter";
import videoTimeFormater from "@/utils/videoTimeFormater";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type PropsType = {
  video: VideoType;
  showDescription?: boolean;
  size?: "small";
};
const VideoListItem = ({ video, size, showDescription }: PropsType) => {
  return (
    <div className="flex flex-row gap-5">
      <Link
        href={`/video/${video.videoId}`}
        aria-label="imageBox"
        className={`relative ${
          size == "small" ? "w-32" : "w-2/6 max-w-xs"
        } h-max flex-shrink-0 cursor-pointer bg-neutral-300 dark:bg-neutral-600 ${
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
          className="absolute px-1 text-xs font-bold text-white bg-black rounded bottom-1 left-1 bg-opacity-80 w-fit"
        >
          {videoTimeFormater(video.lengthSeconds)}
        </div>
      </Link>
      <div
        aria-label="info"
        className={`flex flex-col gap-2 ${size != "small" && "pt-2"} text-start`}
      >
        <Link
          href={`/video/${video.videoId}`}
          className={`text-trim text-lines-1 max-h-12 ${video.title.length < 50 ? 'text-sm' : 'text-xs'} ${size == "small" ? "sm:text-xs" : "sm:text-base"} `}
        >
          {video.title}
        </Link>
        <Link
          href={`/channel/${video.authorId}/videos`}
          className={`hover:underline text-subtitle-color  ${size == "small" ? "text-xs" : "text-sm"} w-max`}
        >
          {video.author}
        </Link>
        <div
          className={`text-subtitle-color ${size == "small" ? "text-xs" : "text-sm"}`}
        >
          {video.viewCount ? numberCounter(video.viewCount) + " views" : null}
          {video.published ? ` - ${dateCounter(video.published)}` : null}
        </div>
        {showDescription
          ? <div className="text-sm text-neutral-500">{video.description}</div>
          : null}
      </div>
    </div>
  );
};

export default VideoListItem;
