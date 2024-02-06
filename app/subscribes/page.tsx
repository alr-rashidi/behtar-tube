"use client";
import { getChannelVideos } from "@/api/getYTData";
import { getSubscribesList } from "@/api/supabase";
import { ErrorCard } from "@/components/cards";
import { VideoType } from "@/types";
import { Database } from "@/types/supabase";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React, { useCallback, useEffect, useState } from "react";
import Loading from "../Loading";
import { VideoListItem } from "@/components/listItems";

const Page = () => {
  const [videos, setVideos] = useState<VideoType[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const supabase = createClientComponentClient<Database>();

  const getVideosList = useCallback(async () => {
    const {
      data: { user: userAuth },
    } = await supabase.auth.getUser();
    const receivedSubscribes = await getSubscribesList(userAuth?.id!);
    receivedSubscribes!.map(async item => {
      const { videos: channelVideos } = await getChannelVideos(item.subscribed_id);
      setVideos(value => value ? [...value, ...channelVideos].sort((a, b) => b.published - a.published) : [...channelVideos]);
      console.log(videos);
    });
    setLoading(false);
  }, [supabase.auth]);

  useEffect(() => {
    getVideosList();
  }, [getVideosList]);

  if (loading) {
    return <Loading text="Loading Subscribes videos..." />;
  } else if (!videos) {
    return <ErrorCard title="Failed to load subscribes videos" />;
  }
  return (
    <div>
      <h1>Videos list:</h1>
      <ul className="flex flex-col gap-4">
        {videos.map(item => (
          <li key={item.title}>
            <VideoListItem video={item} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Page;
