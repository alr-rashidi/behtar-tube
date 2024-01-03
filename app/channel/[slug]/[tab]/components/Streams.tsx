import { VideoCard } from "@/components/cards/";
import { getChannelStreams } from "@/api/getData";
import { ChannelVideosType } from "@/types";
import React from "react";

const Streams = async ({ channelId }: { channelId: string }) => {
  const data: ChannelVideosType = await getChannelStreams(channelId);

  return (
    <section className="mx-auto grid-items">
      {data.videos.map((video) => (
        <VideoCard key={video.videoId} video={video} />
      ))}
    </section>
  );
};

export default Streams;
