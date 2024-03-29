import { CommunityPostCommentsType } from "@/types";
import dateCounter from "@/utils/dateCounter";
import ProfilePictureHttpsSolver from "@/utils/ProfilePictureHttpsSolver";
import Image from "next/image";
import React from "react";
import Attachment from "./CommunityPostAttachment";
import CommunityPostTextContent from "./CommunityPostTextContent";

const CommunityPostCard = ({ item }: { item: CommunityPostCommentsType }) => {
  return (
    <div className="flex flex-row w-full max-w-4xl gap-4 p-4 overflow-scroll border border-neutral-300 dark:border-neutral-700 rounded-xl">
      <div aria-label="ImageBox" className="flex-shrink-0">
        <Image
          src={ProfilePictureHttpsSolver(item.authorThumbnails[1].url)}
          width={item.authorThumbnails[1].width}
          height={item.authorThumbnails[1].height}
          alt="Channel pic"
          className="w-12 rounded-full"
        />
      </div>
      <div aria-label="main" className="w-full">
        <div aria-label="author" className="flex flex-row gap-3">
          <div className="font-extrabold">{item.author}</div>&nbsp;
          <div className="text-sm text-subtitle-color">
            {dateCounter(item.published)} {item.isEdited && "(edited)"}
          </div>
        </div>
        <div aria-label="content" className="flex flex-col gap-3">
          <CommunityPostTextContent content={item.content} />
          <Attachment attachment={item.attachment} />
        </div>
      </div>
    </div>
  );
};

export default CommunityPostCard;
