import { getChannelInfo } from "@/api/getYTData";
import Button from "@/components/ui/Button";
import { ChannelType } from "@/types";
import { Database } from "@/types/supabase";
import numberCounter from "@/utils/numberCounter";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Image from "next/image";
import React from "react";
import { MdArrowBackIosNew } from "react-icons/md";
import { Community, Playlists, Shorts, Streams, SubscribeBtn, Tabs, Videos } from "./components/";

const page = async ({ params }: { params: { slug: string; tab: string } }) => {
  const channelId = params.slug;
  const tab = params.tab;

  const supabase = createServerComponentClient<Database>({ cookies });

  const data: ChannelType = await getChannelInfo(channelId);
  const {
    data: { user: userAuth },
  } = await supabase.auth.getUser();

  // Switch/Case bad support in NextJS
  const SelectedTabPage = ({ channelId }: { channelId: string }) => {
    if (tab == "community") {
      return <Community channelId={channelId} />;
    } else if (tab == "playlists") {
      return <Playlists channelId={channelId} />;
    } else if (tab == "shorts") {
      return <Shorts channelId={channelId} />;
    } else if (tab == "streams") {
      return <Streams channelId={channelId} />;
    } else if (tab == "videos") {
      return <Videos channelId={channelId} />;
    }
  };

  return (
    <section className="flex flex-col">
      <Image
        src={data.authorBanners[1].url}
        width={data.authorBanners[1].width}
        height={data.authorBanners[1].height}
        alt="Channel thumbnail"
        className="w-full bg-neutral-500 md:rounded-xl"
      />
      <div className="flex flex-row gap-4 p-4">
        <Image
          src={data.authorThumbnails[4].url}
          width={data.authorThumbnails[4].width}
          height={data.authorThumbnails[4].height}
          alt="Profile pic"
          className="w-1/3 h-fit max-w-[11rem] bg-neutral-500 rounded-full"
        />
        <div className="flex flex-col justify-center gap-2">
          <div className="text-3xl font-extrabold md:text-4xl">{data.author}</div>
          <div className="text-subtitle-color">
            {numberCounter(data.subCount) + " Subscribers"} - Family Friendly:&nbsp;
            {data.isFamilyFriendly ? "True" : "False"}
          </div>
          {data.description && (
            <div className="relative flex flex-row mt-1 cursor-pointer text-subtitle-color">
              <div className="text-trim text-lines-1 w-60 ">
                {data.description}
              </div>
              <MdArrowBackIosNew className="w-5 h-5" />
            </div>
          )}
          <div>
            {userAuth
              ? <SubscribeBtn userId={userAuth!.id} channelId={data.authorId} />
              : <Button className="!p-3" disabled>Need login your account to subscribe</Button>}
          </div>
        </div>
      </div>
      <Tabs tabs={data.tabs} channelId={channelId} selectedTab={tab} />
      <SelectedTabPage channelId={channelId} />
    </section>
  );
};

export default page;
