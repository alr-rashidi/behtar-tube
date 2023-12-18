import React from "react";
import { MdHelp } from "react-icons/md";

type PropsType = {
  text: string;
}
const HelpBubble = ({text}: PropsType) => {
  return (
    <div className="relative">
      <MdHelp className="w-6 h-6 cursor-pointer peer" />
      <div className="absolute max-w-lg p-2 text-center transition scale-50 -translate-x-1/2 -translate-y-10 bg-black opacity-0 pointer-events-none peer-hover:translate-y-0 bg-opacity-80 peer-hover:scale-100 peer-hover:opacity-100 rounded-xl left-1/2 w-60">
        {text}
      </div>
    </div>
  );
};

export default HelpBubble;
