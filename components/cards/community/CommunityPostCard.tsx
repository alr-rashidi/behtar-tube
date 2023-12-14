import { CommunityPostCommentsType } from "@/types";
import Image from "next/image";
import React from "react";
import ProfilePictureHttpsSolver from "../../../calc/ProfilePictureHttpsSolver";
import Attachment from "./CommunityPostAttachment";
import CommunityPostTextContent from './CommunityPostTextContent'
import dateCounter from "@/calc/dateCounter";

const CommunityPostCard = ({ item }: { item: CommunityPostCommentsType }) => {

  return (
    <div className="flex flex-row gap-4 border dark:border-gray-700 border-gray-300 rounded-xl p-4 w-4xl max-w-4xl">
      <div aria-label="ImageBox" className="flex-shrink-0">
        <Image
          src={ProfilePictureHttpsSolver(item.authorThumbnails[1].url)}
          width={item.authorThumbnails[1].width}
          height={item.authorThumbnails[1].height}
          alt="Channel pic"
          className="rounded-full w-12"
        />
      </div>
      <div aria-label="main" className="w-full">
        <div aria-label="author" className="flex flex-row gap-3">
          <div className="font-extrabold">{item.author}</div>{" "}
          <div className="text-subtitle-color text-sm">
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
