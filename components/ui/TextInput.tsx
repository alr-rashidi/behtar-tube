import React, { forwardRef } from "react";

type PropsType = {
  className?: string;
  [key: string]: any;
};
const TextInput = forwardRef<HTMLInputElement, PropsType>(
  function input({ className: classNameProp, children, ...attributes }: PropsType, ref) {
    return (
      <input
        type="text"
        ref={ref}
        className={`${classNameProp} bg-slate-200 p-3 dark:bg-slate-800 text-sm h-full rounded-lg hover:brightness-95 focus:brightness-90 border border-transparent focus:border-gray-500 delay-75 disabled:text-gray-400 disabled:cursor-not-allowed`}
        {...attributes}
      />
    );
  },
);

export default TextInput;
