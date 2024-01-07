import React from "react";
import { settingType } from "../../app/video/[videoId]/player/Player";

type PropsType = {
  children: React.ReactNode;
  classNameProp?: string;
  [key: string]: any;
};
const Button = ({ children, className: classNameProp, ...attributes }: PropsType) => {
  return (
    <button
      type="button"
      className={`${classNameProp} bg-slate-200 dark:bg-slate-800 text-sm h-full rounded hover:brightness-95 active:brightness-90 delay-75 active:scale-95 px-2 before:content-['']`}
      {...attributes}
    >
      {children}
    </button>
  );
};

export default Button;

// <!-- TW Elements is free under AGPL, with commercial license required for specific uses. See more details: https://tw-elements.com/license/ and contact us for queries at tailwind@mdbootstrap.com -->
