import { CommunityPostAttachmentType } from "@/types";
import { PlaylistListItem, VideoListItem } from "..";
import Image from "next/image";
import numberCounter from "../../../calc/numberCounter";

const Attachment = ({
  attachment,
}: {
  attachment: CommunityPostAttachmentType;
}) => {
  if (attachment) {
    if (attachment.type == "video") {
      return <VideoListItem video={attachment} />;
    } else if (attachment.type == "image") {
      return (
        <div className="relative">
          <Image
            src={attachment.imageThumbnails[1].url}
            width={attachment.imageThumbnails[1].width}
            height={attachment.imageThumbnails[1].height}
            className="bg-gray-600 rounded-xl"
            alt="Attachment image"
          />
          <div className="absolute right-2 bottom-2 flex flex-row gap-2">
            <div className="bg-black font-bold bg-opacity-80 text-sm rounded pt-1 px-1 flex-shrink-0">
              Open in new tab:
            </div>
            {attachment.imageThumbnails.map((image) => (
              <a
                key={image.url}
                href={image.url}
                target="_blank"
                className="bg-black bg-opacity-80 text-sm rounded pt-1 px-1"
              >
                {image.width}/{image.height}
              </a>
            ))}
          </div>
        </div>
      );
    } else if (attachment.type == "multiImage") {
      return (
        <div className="relative">
          {attachment.images.map((image) => (
            <>
              <Image
                src={image[1].url}
                width={image[1].width}
                height={image[1].height}
                className="bg-gray-600 rounded-xl"
                alt="Attachment image"
              />
              <div className="absolute right-2 bottom-2 flex flex-row gap-2">
                <div className="bg-black font-bold bg-opacity-80 text-sm rounded pt-1 px-1 flex-shrink-0">
                  Open in new tab:
                </div>
                {image.map((image) => (
                  <a
                    key={image.url}
                    href={image.url}
                    target="_blank"
                    className="bg-black bg-opacity-80 text-sm rounded pt-1 px-1"
                  >
                    {image.width}/{image.height}
                  </a>
                ))}
              </div>
            </>
          ))}
        </div>
      );
    } else if (attachment.type == "poll") {
      return (
        <>
          <div className="text-subtitle-color text-sm">
            {numberCounter(attachment.totalVotes)} {attachment.totalVotes == 1 ? 'vote' : 'votes'}
          </div>
          <div className="flex flex-col gap-1">
            {attachment.choices.map((choice) => (
              <div key={choice.text} className="p-2 border dark:border-gray-600 border-gray-300 flex-grow">
                <div className="cursor-default whitespace-nowrap flex flex-row items-center gap-2">
                  {choice.image && <Image src={choice.image[0].url} width={48} height={48} alt="Image" />}
                  {choice.text}
                </div>
              </div>
            ))}
          </div>
        </>
      );
    } else if (attachment.type == "playlist") {
      return <PlaylistListItem playlist={attachment} />;
    }
  }
};

export default Attachment;
