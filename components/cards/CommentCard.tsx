import { CommentType } from "@/types";
import dateCounter from "@/utils/dateCounter";
import numberCounter from "@/utils/numberCounter";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { MdArrowDropDown, MdCheckCircleOutline, MdOutlinePushPin, MdOutlineThumbUp } from "react-icons/md";
import Button from "../ui/Button";

const CommentCard = ({ comment }: { comment: CommentType }) => {
  return (
    <div className="flex flex-row gap-3 py-4">
      <div className="flex-shrink-0">
        <Image
          src={comment.authorThumbnails[0].url}
          width={comment.authorThumbnails[0].width}
          height={comment.authorThumbnails[0].height}
          className="rounded-full bg-neutral-600"
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
                comment.authorIsChannelOwner
                && "bg-neutral-200 dark:bg-neutral-800 rounded-full px-1 pt-1"
              } text-sm`}
            >
              {comment.author}
              {comment.authorIsChannelOwner && <MdCheckCircleOutline className="inline-block" />}
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
            <Button className="text-blue-500">
              <MdArrowDropDown className="inline-block w-6 h-6" />
              {comment.replies?.replyCount} Replies
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
