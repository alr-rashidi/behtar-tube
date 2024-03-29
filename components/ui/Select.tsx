import React from "react";
type PropsType = React.ComponentPropsWithRef<"select">
const SelectInput = ({ className: classNameProp, children, ...attributes }: PropsType) => {
  return (
    <select
      className={`${classNameProp} cursor-pointer bg-neutral-200 p-3 dark:bg-neutral-800 h-full rounded-lg hover:brightness-95 focus:brightness-90 border border-transparent focus:border-neutral-500 delay-75`}
      {...attributes}
    >
      {children}
    </select>
  );
};

export default SelectInput;
