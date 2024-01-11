"use client";

import { SidebarToggleContext } from "@/contexts/sidebarToggleContext";
import Link from "next/link";
import React, { useContext } from "react";
import { FaYoutube } from "react-icons/fa";
import { MdMenu } from "react-icons/md";

type PropsType = {
  showMenuIcon?: boolean;
};
const Logo = ({ showMenuIcon }: PropsType) => {
  const { toggleSidebar } = useContext(SidebarToggleContext);

  return (
    <div className="flex flex-row items-center py-2 text-lg font-bold">
      {showMenuIcon ? (
        <button
          className="block pl-2 md:hidden"
          onClick={() => toggleSidebar()}
        >
          <MdMenu className="w-8 h-8" />
        </button>
      ) : null}
      <Link href={"/"} className="flex flex-row items-center gap-1 pl-2 pr-1">
        <FaYoutube color="red" className="w-8 h-8" />
        <div className="max-h-fit">BehtarTube</div>
      </Link>
    </div>
  );
};

export default Logo;
