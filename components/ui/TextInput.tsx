import React, { forwardRef } from "react";

type PropsType = React.ComponentPropsWithRef<"input">

const TextInput = forwardRef<HTMLInputElement, PropsType>(
  function input({ className: classNameProp, children, ...attributes }: PropsType, ref) {
    return (
      <input
        type="text"
        ref={ref as any}
        className={`${classNameProp} bg-neutral-200 p-3 dark:bg-neutral-800 text-sm h-full rounded-lg hover:brightness-95 focus:brightness-90 border border-transparent focus:border-neutral-500 delay-75 disabled:text-neutral-400 disabled:cursor-not-allowed`}
        {...attributes}
      />
    );
  },
);

export default TextInput;
