import React, { FC, RefObject } from "react";

type PropsType = {
  videoRef: RefObject<HTMLVideoElement>;
  timelineInputRef: RefObject<HTMLInputElement>;
  timelineBGRef: RefObject<HTMLDivElement>;
  timelineThumbRef: RefObject<HTMLDivElement>;
  handleTimeline: Function;
};
const TimelineInput = ({
  videoRef,
  timelineInputRef,
  timelineBGRef,
  timelineThumbRef,
  handleTimeline,
}: PropsType) => {
  return (
    <div aria-label="Timeline" className="relative w-full h-full">
      <input
        type="range"
        max={videoRef.current?.duration}
        onChange={(e) => handleTimeline(parseInt(e.target.value))}
        onKeyDown={(e) => e.preventDefault()}
        ref={timelineInputRef}
        defaultValue={0}
        className="w-full h-full opacity-0 cursor-pointer peer"
      />
      <div
        ref={timelineBGRef}
        className="absolute w-full h-1 -translate-y-1/2 bg-gray-500 border-white pointer-events-none top-1/2"
      ></div>
      <div
        ref={timelineThumbRef}
        className="absolute left-0 w-4 h-4 transition -translate-y-1/2 bg-red-800 border border-red-400 border-opacity-0 rounded-full pointer-events-none peer-active:border-opacity-100 peer-active:scale-125 top-1/2"
      />
    </div>
  );
};

export default TimelineInput;
