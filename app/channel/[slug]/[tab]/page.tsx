import { ChannelType } from "@/types";
import Image from "next/image";
import React from "react";
import { getChannelInfo } from "@/components/getData";
import { MdArrowBackIosNew } from "react-icons/md";
import {
  Community,
  Playlists,
  Shorts,
  Streams,
  Tabs,
  Videos,
} from "./components/";
import numberCounter from "@/utils/numberCounter";

const page = async ({ params }: { params: { slug: string; tab: string } }) => {
  const channelId = params.slug;
  const tab = params.tab;

  const data: ChannelType = await getChannelInfo(channelId);

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
        className="w-full bg-gray-500 md:rounded-xl"
      />
      <div className="flex flex-row gap-4 p-4">
        <Image
          src={data.authorThumbnails[4].url}
          width={data.authorThumbnails[4].width}
          height={data.authorThumbnails[4].height}
          alt="Profile pic"
          className="w-1/3 h-fit max-w-[11rem] bg-gray-500 rounded-full"
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
            {/* <button className="subButton">Subscribe</button> */}
          </div>
        </div>
      </div>
      <Tabs tabs={data.tabs} channelId={channelId} selectedTab={tab} />
      <SelectedTabPage channelId={channelId} />
    </section>
  );
};

export default page;
