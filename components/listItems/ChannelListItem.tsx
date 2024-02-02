import { SearchedChannelType } from "@/types";
import numberCounter from "@/utils/numberCounter";
import ProfilePictureHttpsSolver from "@/utils/ProfilePictureHttpsSolver";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ChannelListItem = ({ channel }: { channel: SearchedChannelType }) => {
  return (
    <>
      <Link
        href={`/channel/${channel.authorId}/videos`}
        key={channel.authorId}
        className="flex flex-row pt-2 cursor-pointer"
      >
        <div
          aria-label="ImageBox"
          className="flex channels-center justify-center flex-shrink-0 flex-grow-0 w-1/3 max-w-xs md:w-72 h-20 md:h-[140px]"
        >
          <Image
            src={`${ProfilePictureHttpsSolver(channel.authorThumbnails[4].url)}`}
            width={channel.authorThumbnails[4].width}
            height={channel.authorThumbnails[4].height}
            alt="Profile picture"
            className="my-auto rounded-full w-fit h-full"
          />
        </div>
        <div
          aria-label="InfoBox"
          className="flex flex-col justify-center"
        >
          <div className="text-xl font-bold">{channel.author}</div>
          <div className="text-sm cursor-pointer text-subtitle-color">
            {numberCounter(channel.subCount) + " Subscribers"} - {channel.channelHandle}
          </div>
          <div className="mt-2 text-sm text-neutral-400 text-trim text-lines-2">
            {channel.description}
          </div>
        </div>
      </Link>
      <hr className="w-full mb-2 border-t border-neutral-300 dark:border-neutral-600" />
    </>
  );
};

export default ChannelListItem;
