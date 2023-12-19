import { helpBubbleClassName } from '@/components/HelpBubble'
import React from 'react'
import { MdVolumeMute, MdVolumeUp } from 'react-icons/md'

type PropsType = {
  muted: boolean;
  handleMute: any;
}
const MuteBtn = ({handleMute, muted}: PropsType) => {
  return (
    <div className="relative">
    <button onClick={handleMute} className="h-full peer">
      {muted ? (
        <MdVolumeMute className="w-6 h-6" />
      ) : (
        <MdVolumeUp className="w-6 h-6" />
      )}
    </button>
    <div className={`${helpBubbleClassName} bottom-10`}>
      {muted ? "Unmute" : "Mute"}
    </div>
  </div>
  )
}

export default MuteBtn