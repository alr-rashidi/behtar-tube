import { getVideoData } from "@/api/getData";
import { DetailedVideoType, VideoType } from "@/types";
import "plyr-react/plyr.css";
import React from "react";
import Player from "./player/Player";
import Image from "next/image";
import { VideoListItem } from "@/components/listItems";
import numberCounter from "@/utils/numberCounter";
import dateCounter from "@/utils/dateCounter";
import Description from "./components/Description";
import Link from "next/link";
// import Comments from "./components/Comments";

const page = async ({ params }: { params: { videoId: string } }) => {
  const videoId = params.videoId;
  const data: DetailedVideoType = await getVideoData(videoId);

  return (
    <div className="flex flex-col justify-center w-full gap-5 xl:flex-row">
      <div className="basis-2/3">
        <Player data={data} />
        <div aria-label="Info" className="flex flex-col gap-4 p-4">
          <div className="text-lg font-extrabold">{data.title}</div>
          <div className="flex flex-row justify-between gap-2">
            <div className="flex flex-row gap-2">
              <Link href={`/channel/${data.authorId}/videos`}>
                <Image
                  src={data.authorThumbnails[1].url}
                  width={data.authorThumbnails[1].width}
                  height={data.authorThumbnails[1].height}
                  className="rounded-full loadingBg"
                  alt="Profile image"
                />
              </Link>
              <div className="flex flex-col justify-center">
                <Link
                  href={`/channel/${data.authorId}/videos`}
                  className="font-bold hover:underline"
                >
                  {data.author}
                </Link>
                <div className="text-sm text-subtitle-color">
                  {data.subCountText} Subscribers
                </div>
              </div>
              <div className="flex items-center mx-10">
                {/* <button className="subButton">Subscribe</button> */}
              </div>
            </div>
            <div>{/* <button className="customButton"></button> */}</div>
          </div>
          <div className="flex flex-col gap-2 dark:bg-[#ffffff20] bg-[#00000020] rounded-xl p-3">
            <div className="flex flex-row">
              {numberCounter(data.viewCount)} views -&nbsp;
              {dateCounter(data.published)}
            </div>
            {data.description && (
              <Description description={data.descriptionHtml} />
            )}
          </div>
          {/* <Comments data={data} /> */}
        </div>
      </div>

      <div className="flex flex-col gap-3 px-2 xl:w-96">
        <p className="text-xl font-bold text-gray-400">Recommended videos:</p>
        {data.recommendedVideos.map((video) => (
          <VideoListItem
            key={video.videoId}
            size="small"
            video={video as VideoType}
          />
        ))}
      </div>
    </div>
  );
};

export default page;
