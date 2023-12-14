import { CommunityPostCard } from "@/components/cards/";
import { getChannelCommunity } from "@/components/getData";
import { CommunityPostType } from "@/types";
import React from "react";

const Community = async ({ channelId }: { channelId: string }) => {
  const data: CommunityPostType = await getChannelCommunity(channelId);
  console.log(data)

  return (
    <section className="flex flex-col gap-4 p-4 mx-auto">
      {data.comments.map((item) => (
        <CommunityPostCard key={item.commentId} item={item} />
      ))}
    </section>
  );
};

export default Community;
