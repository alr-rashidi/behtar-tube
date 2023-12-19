import { helpBubbleClassName } from '@/components/HelpBubble';
import React from 'react'
import { MdFullscreen, MdFullscreenExit } from 'react-icons/md';

type PropsType = {
  fullscreen: boolean;
  handleFullscreenBtn: any;
}
const FullscreenBtn = ({fullscreen, handleFullscreenBtn}: PropsType) => {
  return (
    <div className="relative">
    <button
      onClick={handleFullscreenBtn}
      className="h-full peer"
    >
      {fullscreen ? (
        <MdFullscreenExit className="w-8 h-8" />
      ) : (
        <MdFullscreen className="w-8 h-8" />
      )}
    </button>
    <div className={`${helpBubbleClassName} bottom-10 -left-3/4`}>
      {fullscreen ? "Exit Fullscreen" : "Fullscreen"}
    </div>
  </div>
  )
}

export default FullscreenBtn