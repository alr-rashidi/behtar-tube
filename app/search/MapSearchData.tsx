import { ChannelListItem, PlaylistListItem, VideoListItem } from "@/components/listItems";
import { searchDataType } from "@/types";
import React from "react";

type PropsType = {
  data: searchDataType;
};
const MapSearchData = ({ data }: PropsType) => {
  return (
    <>
      {data.map((item) => {
        if (item.type == "video") {
          return <VideoListItem key={item.videoId} video={item} />;
        } else if (item.type == "channel") {
          return <ChannelListItem key={item.channelHandle} channel={item} />;
        } else {
          return <PlaylistListItem key={item.playlistId} playlist={item} />;
        }
      })}
    </>
  );
};

export default MapSearchData;
