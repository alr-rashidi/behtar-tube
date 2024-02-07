"use client";
import { getChannelVideos } from "@/api/getYTData";
import { getSubscribesList } from "@/api/supabase";
import { ErrorCard } from "@/components/cards";
import { VideoListItem } from "@/components/listItems";
import { VideoType } from "@/types";
import { Database } from "@/types/supabase";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React, { useCallback, useEffect, useState } from "react";
import Loading from "../Loading";

const Page = () => {
  type VideosStateType = {
    error: boolean;
    loading: boolean;
    data?: VideoType[];
  };
  const [videos, setVideos] = useState<VideosStateType>({ error: false, loading: true });
  const supabase = createClientComponentClient<Database>();

  const getVideosList = useCallback(async (signal: AbortSignal) => {
    const {
      data: { user: userAuth },
    } = await supabase.auth.getUser();
    const receivedSubscribes = await getSubscribesList(userAuth?.id!, signal)
      .catch(err => setVideos(value => ({ ...value, error: true })));
    receivedSubscribes?.map(async item => {
      const data = await getChannelVideos(item.subscribed_id, signal)
        .catch(err => setVideos(value => ({ ...value, error: true })));
        if (data?.videos) {
          setVideos(value => {
            let newVideosState;
            if (value.data) {
              newVideosState = [...value.data, ...data.videos];
            } else {
              newVideosState = [...data.videos];
            }
            return { ...value, data: newVideosState.sort((a, b) => b.published - a.published) };
          });
        }
    });
    setVideos(value => ({ ...value, loading: false }));
  }, [supabase.auth]);

  useEffect(() => {
    const controller = new AbortController();
    getVideosList(controller.signal);
    return () => {
      controller.abort();
    };
  }, [getVideosList]);

  if (videos.error) return <ErrorCard title="Get videos failed" />;
  if (videos.loading) return <Loading text="Loading Subscribes videos..." />;

  return (
    <div>
      <ul className="flex flex-col gap-4 p-4">
        {videos.data?.map(item => (
          <li key={item.title}>
            <VideoListItem video={item} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Page;
