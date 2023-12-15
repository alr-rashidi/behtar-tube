import { CommentType } from "@/types";
import Image from "next/image";
import React from "react";
import {
  MdArrowDropDown,
  MdCheckCircleOutline,
  MdOutlinePushPin,
  MdOutlineThumbUp,
} from "react-icons/md";
import dateCounter from "../../calc/dateCounter";
import Link from "next/link";
import numberCounter from "../../calc/numberCounter";

const CommentCard = ({ comment }: { comment: CommentType }) => {
  return (
    <div className="flex flex-row gap-3 py-4">
      <div className="flex-shrink-0">
        <Image
          src={comment.authorThumbnails[0].url}
          width={comment.authorThumbnails[0].width}
          height={comment.authorThumbnails[0].height}
          className="rounded-full bg-gray-600"
          alt="Profile image"
        />
      </div>
      <div className="flex flex-col gap-2">
        {comment.isPinned && (
          <div className="flex flex-row gap-2 text-sm text-subtitle-color">
            <MdOutlinePushPin /> Pinned
          </div>
        )}
        <div>
          <div className="flex flex-row gap-2">
            <Link
              href={`/channel/${comment.authorId}/videos`}
              className={`flex flex-row gap-1 ${
                comment.authorIsChannelOwner &&
                "bg-gray-200 dark:bg-gray-800 rounded-full px-1 pt-1"
              } text-sm`}
            >
              {comment.author}
              {comment.authorIsChannelOwner && (
                <MdCheckCircleOutline className="inline-block" />
              )}
            </Link>
            <div className="text-subtitle-color text-sm">
              {dateCounter(comment.published)}
            </div>
          </div>
        </div>
        <div>{comment.content}</div>
        <div>
          <MdOutlineThumbUp className="inline-block" />&nbsp;
          {numberCounter(comment.likeCount)}
        </div>
        <div>
          {comment.replies && (
            <button className="text-blue-500">
              <MdArrowDropDown className="inline-block w-6 h-6" />
              {comment.replies?.replyCount} Replies
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
