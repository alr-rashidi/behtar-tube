import { getChannelCommunity } from "@/api/getYTData";
import { CommunityPostCard } from "@/components/cards/";
import { CommunityPostType } from "@/types";
import React from "react";

const Community = async ({ channelId }: { channelId: string }) => {
  const data: CommunityPostType = await getChannelCommunity(channelId);

  return (
    <section className="flex flex-col w-full gap-4 p-4 mx-auto">
      {data.comments.map((item) => <CommunityPostCard key={item.commentId} item={item} />)}
    </section>
  );
};

export default Community;
