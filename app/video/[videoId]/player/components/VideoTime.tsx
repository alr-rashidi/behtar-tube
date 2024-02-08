import videoTimeFormater from "@/utils/videoTimeFormater";
import React from "react";

type PropType = {
  currentTime: number;
};
const VideoTime = ({ currentTime }: PropType) => {
  return <div className="my-auto">{videoTimeFormater(currentTime)}</div>;
};

export default VideoTime;
