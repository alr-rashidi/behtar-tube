import VideoCard from "@/components/cards/VideoCard";
import { getChannelVideos } from "@/components/getData";
import { ChannelVideosType } from "@/types";
import React from "react";

const Videos = async ({ channelId }: { channelId: string }) => {
  const data: ChannelVideosType = await getChannelVideos(channelId);

  return (
    <section className="mx-auto grid-items">
      {data.videos.map((video) => (
        <VideoCard key={video.videoId} video={video} />
      ))}
    </section>
  );
};

export default Videos;
