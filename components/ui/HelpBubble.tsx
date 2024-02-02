import React from "react";
import { MdHelp } from "react-icons/md";

type PropsType = {
  divClassName?: string;
  bubbleClassName?: string;
  children?: React.ReactNode;
  text: string;
};

export const helpBubbleClassName =
  "absolute delay-300 w-max z-30 max-w-lg px-2 py-1 text-center transition scale-50 -tranneutral-x-1/2 -tranneutral-y-10 bg-white shadow dark:bg-black opacity-0 pointer-events-none peer-hover:tranneutral-y-0 bg-opacity-80 peer-hover:scale-100 peer-hover:opacity-100 rounded-xl left-1/2";

const DivWithHelpBubble = ({ text, divClassName, bubbleClassName, children }: PropsType) => {
  return (
    <div className={`${divClassName} relative`}>
      {children
        ? children
        : <MdHelp className="w-6 h-6 cursor-pointer peer" />}
      <div className={`${bubbleClassName} ${helpBubbleClassName} w-60`}>
        {text}
      </div>
    </div>
  );
};

export default DivWithHelpBubble;
