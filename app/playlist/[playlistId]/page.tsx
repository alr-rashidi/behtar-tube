import numberCounter from "@/calc/numberCounter";
import { VideoListItem } from "@/components/cards";
import { getPlaylistData } from "@/components/getData";
import { PlaylistType } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import playlistValidVideos from "../../../calc/playlistValidVideos";

const page = async ({ params }: any) => {
  const playlistId = params.playlistId;

  const data: PlaylistType = await getPlaylistData(playlistId);
  const validVideos = playlistValidVideos(data.videos);

  return (
    <div>
      {data ? (
        <div className="flex flex-col px-4">
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
          <div className="flex flex-row gap-4">
            <Image
              src={data.authorThumbnails[1].url}
              width={data.authorThumbnails[1].width}
              height={data.authorThumbnails[1].height}
              className="w-20 rounded-full loadingBg"
              alt="Profile Pic"
            />
            <div className="flex flex-col justify-center gap-2">
              <Link
                href={`/channel/${data.authorId}`}
                className="text-lg font-bold underline"
              >
                {data.author}
              </Link>
              <div className="text-sm">
                {numberCounter(data.videoCount)} Videos
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 p-4">
            {validVideos.map((video) =>
              video.title != "[Private video]" ? (
                <VideoListItem key={video.videoId} video={video} />
              ) : null
            )}
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default page;
