import { PlaylistListItem, VideoListItem } from "@/components/listItems";
import { CommunityPostAttachmentType, ImageObjectType } from "@/types";
import numberCounter from "@/utils/numberCounter";
import Image from "next/image";

const Attachment = ({
  attachment,
}: {
  attachment: CommunityPostAttachmentType;
}) => {
  const ImageAttachmentElement = ({ image }: { image: ImageObjectType[] }) => (
    <div className="relative max-w-full">
      <Image
        src={image[0].url}
        width={image[0].width}
        height={image[0].height}
        className="bg-gray-600 min-w-[5rem] w-fit rounded-xl"
        alt="Attachment image"
      />
      <div className="absolute bottom-0 flex flex-row max-w-full gap-2 px-2 pb-2 overflow-x-scroll rtl:right-0 ltr:left-0">
        <div className="flex-shrink-0 px-1 pt-1 text-sm font-bold bg-black rounded bg-opacity-80">
          Open in new tab:
        </div>
        {image.map((image) => (
          <a
            key={image.url}
            href={image.url}
            target="_blank"
            className="px-1 pt-1 text-sm bg-black rounded bg-opacity-80"
          >
            {image.width}/{image.height}
          </a>
        ))}
      </div>
    </div>
  );

  if (attachment) {
    if (attachment.type == "video") {
      return <VideoListItem video={attachment} />;
    } else if (attachment.type == "image") {
      return <ImageAttachmentElement image={attachment.imageThumbnails} />;
    } else if (attachment.type == "multiImage") {
      return (
        <div className="relative">
          {attachment.images.map((image) => <ImageAttachmentElement key={image[0].url} image={image} />)}
        </div>
      );
    } else if (attachment.type == "poll") {
      return (
        <>
          <div className="text-sm text-subtitle-color">
            {numberCounter(attachment.totalVotes)}&nbsp;
            {attachment.totalVotes == 1 ? "vote" : "votes"}
          </div>
          <div className="flex flex-col gap-1">
            {attachment.choices.map((choice) => (
              <div
                key={choice.text}
                className="flex-grow p-2 border border-gray-300 dark:border-gray-600"
              >
                <div className="flex flex-row items-center gap-2 cursor-default whitespace-nowrap">
                  {choice.image && (
                    <Image
                      src={choice.image[0].url}
                      width={48}
                      height={48}
                      alt="Image"
                    />
                  )}
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
