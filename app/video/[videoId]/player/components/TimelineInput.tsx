import React, { FC, RefObject, useEffect, useRef } from "react";
import ReactPlayer from "react-player";

type PropsType = {
  videoRef: RefObject<ReactPlayer>;
  audioRef: RefObject<ReactPlayer>;
  currentTime: number;
};
const TimelineInput = ({ videoRef, audioRef, currentTime }: PropsType) => {
  const timelineInputRef = useRef<HTMLInputElement>(null);
  const timelineWatchedRef = useRef<HTMLDivElement>(null);
  const timelineBGRef = useRef<HTMLDivElement>(null);
  const timelineThumbRef = useRef<HTMLDivElement>(null);

  const handleTimeline = (value: number) => {
    if (videoRef.current && audioRef.current) {
      const videoInternalPlayer: Record<string, any> = videoRef.current.getInternalPlayer();
      const audioInternalPlayer: Record<string, any> = audioRef.current.getInternalPlayer();
      videoInternalPlayer.currentTime = value;
      audioInternalPlayer.currentTime = value;
    }
    ChangeTimelineThumbPosition();
  };

  useEffect(() => {
    ChangeTimelineThumbPosition();
  }, [currentTime]);

  const ChangeTimelineThumbPosition = () => {
    if (
      timelineThumbRef.current
      && timelineInputRef.current
      && timelineWatchedRef.current
      && videoRef.current
    ) {
      let position = `${
        // Timeline width - Thumb width / Video time(max value of input) = One percent of the width of input
        ((timelineInputRef.current.clientWidth - 16)
          / videoRef.current.getDuration())
        // ... * Timeline value (parseInt for TS intellisense)
        * videoRef.current.getCurrentTime()}px`;

      timelineThumbRef.current.style.left = position;
      timelineWatchedRef.current.style.width = position;
    }
  };

  return (
    <div aria-label="Timeline" className="relative w-full flex items-center">
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
        className="absolute left-0 w-full my-auto h-1 bg-gray-500 border-white pointer-events-none top-1/2 -translate-y-1/2"
      >
      </div>
      <div
        ref={timelineWatchedRef}
        className="absolute left-0 h-1 bg-red-500 border-white pointer-events-none top-1/2 -translate-y-1/2"
      >
      </div>
      <div
        ref={timelineThumbRef}
        className="absolute left-0 w-4 h-4 transition -translate-y-1/2 bg-red-800 border border-red-400 border-opacity-0 rounded-full pointer-events-none peer-active:border-opacity-100 peer-active:scale-125 top-1/2"
      />
    </div>
  );
};

export default TimelineInput;
