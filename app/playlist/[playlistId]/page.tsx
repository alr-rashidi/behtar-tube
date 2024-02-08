import { getPlaylistData } from "@/api/getYTData";
import { ErrorCard } from "@/components/cards/";
import { VideoListItem } from "@/components/listItems";
import { PlaylistType, VideoType } from "@/types";
import numberCounter from "@/utils/numberCounter";
import playlistValidVideos from "@/utils/playlistValidVideos";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = async ({ params }: any) => {
  const playlistId = params.playlistId;

  const data: PlaylistType = await getPlaylistData(playlistId);
  const validVideos = playlistValidVideos(data.videos);

  return (
    <div>
      {data
        ? (
          <div className="flex flex-col p-4">
            <div aria-label="imageBox" className="relative mb-10">
              <Image
                src={validVideos[0].videoThumbnails[0].url}
                width={validVideos[0].videoThumbnails[0].width}
                height={validVideos[0].videoThumbnails[0].height}
                className="absolute left-1/2 -translate-x-1/2 -top-20 w-5/6 mx-auto scale-[130%] loadingBg rounded-2xl blur-3xl"
                alt="Playlist Thumbnail"
              />
              <Image
                src={validVideos[0].videoThumbnails[0].url}
                width={validVideos[0].videoThumbnails[0].width}
                height={validVideos[0].videoThumbnails[0].height}
                className="scale-[80%] w-5/6 mx-auto loadingBg+ rounded-2xl"
                alt="Playlist Thumbnail"
              />
            </div>
            <div className="mb-8 text-2xl font-extrabold md:text-3xl">
              {data.title}
            </div>
            <Link
              href={`/channel/${data.authorId}/videos`}
              className="flex flex-row gap-4"
            >
              <Image
                src={data.authorThumbnails[1].url}
                width={data.authorThumbnails[1].width}
                height={data.authorThumbnails[1].height}
                className="w-20 rounded-full loadingBg"
                alt="Profile Pic"
              />
              <div className="flex flex-col justify-center gap-2">
                <div className="text-lg font-bold hover:underline">{data.author}</div>
                <div className="text-sm">
                  {numberCounter(data.videoCount)} Videos
                </div>
              </div>
            </Link>
            <div className="flex flex-col gap-2 p-2 md:gap-4 md:p-4">
              {validVideos.map((video) =>
                video.title != "[Private video]"
                  ? <VideoListItem key={video.videoId} video={video as VideoType} />
                  : null
              )}
            </div>
          </div>
        )
        : <ErrorCard />}
    </div>
  );
};

export default page;
