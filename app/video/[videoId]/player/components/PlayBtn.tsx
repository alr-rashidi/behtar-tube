import DivWithHelpBubble from "@/components/ui/HelpBubble";
import React, { MouseEventHandler } from "react";
import { MdPause, MdPlayArrow } from "react-icons/md";

type PropsType = {
  playing: boolean;
  handlePlay: MouseEventHandler<HTMLButtonElement>;
};
const PlayBtn = ({ handlePlay, playing }: PropsType) => {
  return (
    <DivWithHelpBubble bubbleClassName="bottom-10 left-3/4" text={playing ? "Pause" : "Play"}>
      <button onClick={handlePlay} className="h-full peer">
        {playing ? <MdPause className="w-8 h-8" /> : <MdPlayArrow className="w-8 h-8" />}
      </button>
    </DivWithHelpBubble>
  );
};

export default PlayBtn;
