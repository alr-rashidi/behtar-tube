import React from "react";

type PropsType = {
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
};
const Button = ({ children, className: classNameProp, ...attributes }: PropsType) => {
  return (
    <button
      type="button"
      className={`${classNameProp} bg-slate-200 dark:bg-slate-800 text-sm h-full rounded-lg hover:brightness-95 active:brightness-90 delay-75 active:scale-95 px-2`}
      {...attributes}
    >
      {children}
    </button>
  );
};

export default Button;