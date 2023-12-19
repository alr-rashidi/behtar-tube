import { helpBubbleClassName } from "@/components/HelpBubble";
import React, { MouseEventHandler } from "react";
import { MdPause, MdPlayArrow } from "react-icons/md";

type PropsType = {
  playing: boolean;
  handlePlayBtn: MouseEventHandler<HTMLButtonElement>;
};
const PlayBtn = ({ handlePlayBtn, playing }: PropsType) => {
  return (
    <div className="relative">
      <button onClick={handlePlayBtn} className="h-full peer">
        {playing ? (
          <MdPause className="w-8 h-8" />
        ) : (
          <MdPlayArrow className="w-8 h-8" />
        )}
      </button>
      <div className={`${helpBubbleClassName} bottom-10 left-3/4`}>
        {playing ? "Pause" : "Play"}
      </div>
    </div>
  );
};

export default PlayBtn;
