import React from "react";

type PropsType = {
  children: React.ReactNode;
  Theme?: ThemesNamesType;
  className?: string;
  [key: string]: any;
};

type ThemesNamesType = "red" | "sharp";

type ThemesType = {
  [key: string]: {
    light: string;
    dark: string;
    textLight?: string;
    textDark?: string;
  };
};
const Themes: ThemesType = {
  red: {
    light: "bg-red-200",
    dark: "dark:bg-red-800",
  },
  sharp: {
    light: "bg-neutral-900",
    dark: "dark:bg-neutral-200",
    textLight: "text-white",
    textDark: "dark:text-black"
  },
};

const Button = ({ children, Theme, className: classNameProp, ...attributes }: PropsType) => {
  return (
    <button
      type="button"
      className={`${classNameProp} ${
        Theme
          ? `${Themes[Theme].light} ${Themes[Theme].dark} ${Themes[Theme].textLight} ${Themes[Theme].textDark}`
          : "bg-neutral-200 dark:bg-neutral-800"
      } text-sm h-full rounded-lg hover:brightness-95 active:brightness-90 delay-75 active:scale-95 px-2`}
      {...attributes}
    >
      {children}
    </button>
  );
};

export default Button;
