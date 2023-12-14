"use client";

import { createContext, useState } from "react";

type sideBarContextType = { sidebarState: boolean; toggleSidebar: (value?: boolean) => void };
export const SidebarToggleContext = createContext<sideBarContextType>({
  sidebarState: false,
  toggleSidebar: () => {},
});

type PropsType = {
  children: React.ReactNode;
};

export const SidebarToggleProvider = ({ children }: PropsType) => {
  const [sidebarToggle, setSidebarToggle] = useState(false);

  const toggleSidebar = (value?: boolean) => {
    setSidebarToggle((prev) => value || !prev);
  };

  return (
    <SidebarToggleContext.Provider
      value={{ sidebarState: sidebarToggle, toggleSidebar }}
    >
      {children}
    </SidebarToggleContext.Provider>
  );
};
