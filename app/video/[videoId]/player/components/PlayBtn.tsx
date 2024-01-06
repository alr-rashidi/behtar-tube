import { helpBubbleClassName } from "@/components/ui/HelpBubble";
import React, { MouseEventHandler } from "react";
import { MdPause, MdPlayArrow } from "react-icons/md";

type PropsType = {
  playing: boolean;
  handlePlay: MouseEventHandler<HTMLButtonElement>;
};
const PlayBtn = ({ handlePlay, playing }: PropsType) => {
  return (
    <div className="relative">
      <button onClick={handlePlay} className="h-full peer">
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
