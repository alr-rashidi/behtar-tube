import DivWithHelpBubble from "@/components/ui/HelpBubble";
import React from "react";
import { MdFullscreen, MdFullscreenExit } from "react-icons/md";

type PropsType = {
  fullscreen: boolean;
  handleFullscreenBtn: any;
};
const FullscreenBtn = ({ fullscreen, handleFullscreenBtn }: PropsType) => {
  return (
    <DivWithHelpBubble text={fullscreen ? "Exit Fullscreen" : "Fullscreen"} bubbleClassName="bottom-10 -left-6">
      <button
        onClick={handleFullscreenBtn}
        className="h-full peer"
      >
        {fullscreen ? <MdFullscreenExit className="w-8 h-8" /> : <MdFullscreen className="w-8 h-8" />}
      </button>
    </DivWithHelpBubble>
  );
};

export default FullscreenBtn;
