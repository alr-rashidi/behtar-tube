import React, { RefObject } from "react";

type PropsType = {
  muted: boolean;
  handleVolume: Function;
  volumeInputRef: RefObject<HTMLInputElement>;
};
const VolumeInput = ({ handleVolume, muted, volumeInputRef }: PropsType) => {
  return (
    <input
      type="range"
      step={5}
      max={100}
      ref={volumeInputRef}
      defaultValue={100}
      disabled={muted}
      onChange={(e) => handleVolume(e)}
      className="max-w-[5rem] accent-red-600"
    />
  );
};

export default VolumeInput;
