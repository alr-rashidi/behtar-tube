"use client";

import { createContext, useState } from "react";

type themeType = "light" | "dark";

type themeContextType = {
  theme: themeType;
  switchTheme: Function;
};

export const themeContext: React.Context<themeContextType> =
  createContext<themeContextType>({ theme: "dark", switchTheme: () => {} });

type PropsType = {
  children: React.ReactNode;
};

export const ThemeProvider = ({ children }: PropsType) => {
  const [selectedTheme, setSelectedTheme] = useState<themeType>("dark");

  const switchTheme = () => {
    
    setSelectedTheme(selectedTheme == "dark" ? "light" : "dark");
  };

  return (
    <themeContext.Provider value={{ theme: selectedTheme, switchTheme }}>
      <div className={selectedTheme}>{children}</div>
    </themeContext.Provider>
  );
};
