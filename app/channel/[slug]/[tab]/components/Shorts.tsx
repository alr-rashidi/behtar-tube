import VideoCard from "@/components/cards/VideoCard";
import { getChannelShorts } from "@/api/getData";
import { ChannelVideosType } from "@/types";
import React from "react";

const Shorts = async ({ channelId }: { channelId: string }) => {
  const data: ChannelVideosType = await getChannelShorts(channelId);

  return (
    <section className="grid grid-cols-2 gap-6 p-4 mx-auto xl:px-8 place-content-around md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {data.videos.map((video) => (
        <VideoCard key={video.videoId} video={video} type={"short"} />
      ))}
    </section>
  );
};

export default Shorts;
