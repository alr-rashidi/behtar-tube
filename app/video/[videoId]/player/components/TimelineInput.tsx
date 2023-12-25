import React, { FC, RefObject, useEffect, useRef } from "react";
import ReactPlayer from "react-player";

type PropsType = {
  videoRef: RefObject<ReactPlayer>;
  audioRef: RefObject<ReactPlayer>;
  currentTime: number;
};
const TimelineInput = ({ videoRef, audioRef, currentTime }: PropsType) => {
  const timelineInputRef = useRef<HTMLInputElement>(null);
  const timelineBGRef = useRef<HTMLDivElement>(null);
  const timelineThumbRef = useRef<HTMLDivElement>(null);

  const handleTimeline = (value: number) => {
    if (videoRef.current && audioRef.current) {
      const videoInternalPlayer: Record<string, any> =
        videoRef.current.getInternalPlayer();
      const audioInternalPlayer: Record<string, any> =
        videoRef.current.getInternalPlayer();
        videoInternalPlayer.currentTime = videoRef.current.getDuration();
        audioInternalPlayer.currentTime = audioRef.current.getDuration();
    }
    ChangeTimelineThumbPosition();
  };

  useEffect(() => {
    ChangeTimelineThumbPosition();
  }, [currentTime]);

  const ChangeTimelineThumbPosition = () => {
    if (
      timelineThumbRef.current &&
      timelineInputRef.current &&
      videoRef.current
    ) {
      timelineThumbRef.current.style.left = `${
        // Timeline width - Thumb width / Video time(max value of input) = One percent of the width of input
        ((timelineInputRef.current.clientWidth - 16) /
          videoRef.current.getDuration()) *
        // ... * Timeline value (parseInt for TS intellisense)
        videoRef.current.getCurrentTime()
      }px`;
    }
  };

  return (
    <div aria-label="Timeline" className="relative w-full h-full">
      <input
        type="range"
        max={videoRef.current?.getDuration()}
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
