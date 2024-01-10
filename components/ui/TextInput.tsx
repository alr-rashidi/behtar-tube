import React from "react";

type PropsType = {
  className?: string;
  [key: string]: any;
};
const TextInput = ({ type, className: classNameProp, children, ...attributes }: PropsType) => {
  return (
    <input
      type="text"
      className={`${classNameProp} bg-slate-200 dark:bg-slate-800 text-sm h-full rounded-lg hover:brightness-95 active:brightness-90 delay-75 active:scale-95 px-2`}
      {...attributes}
    />
  );
};

export default TextInput;
