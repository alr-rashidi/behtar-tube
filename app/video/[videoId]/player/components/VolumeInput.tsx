import DivWithHelpBubble, { helpBubbleClassName } from "@/components/ui/HelpBubble";
import React, { ChangeEvent, RefObject, useRef, useState } from "react";
import { MdVolumeMute, MdVolumeUp } from "react-icons/md";
import ReactPlayer from "react-player";

type PropsType = {
  audioRef: RefObject<ReactPlayer>;
};
const VolumeInput = ({ audioRef }: PropsType) => {
  const [muted, setMuted] = useState<boolean>(false);
  const volumeInputRef = useRef<HTMLInputElement>(null);

  const handleVolume = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (audioRef.current) {
      const internalPlayer: Record<string, any> = audioRef.current.getInternalPlayer();
      if (value == 0) {
        setMuted(true);
      } else {
        setMuted(false);
      }
      internalPlayer.volume = value / 100;
    }
  };

  const handleMute = () => {
    if (audioRef.current && volumeInputRef.current) {
      const internalPlayer: Record<string, any> = audioRef.current.getInternalPlayer();
      if (muted) {
        internalPlayer.volume = parseInt(volumeInputRef.current.value) / 100;
        setMuted(false);
      } else {
        internalPlayer.volume = 0;
        setMuted(true);
      }
    }
  };

  return (
    <div className="flex items-center group">
      <DivWithHelpBubble text={muted ? "Unmute" : "Mute"} bubbleClassName="bottom-10">
        <button onClick={handleMute} className="flex items-center peer">
          {muted ? <MdVolumeMute className="w-6 h-6" /> : <MdVolumeUp className="w-6 h-6" />}
        </button>
      </DivWithHelpBubble>
      <input
        type="range"
        step={5}
        max={100}
        ref={volumeInputRef}
        defaultValue={100}
        disabled={muted}
        onChange={(e) => handleVolume(e)}
        className="max-w-[5rem] w-0 group-hover:w-max opacity-0 group-hover:opacity-100 transition accent-red-600"
      />
    </div>
  );
};

export default VolumeInput;
