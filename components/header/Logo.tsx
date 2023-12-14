"use client";

import { SidebarToggleContext } from "@/contexts/sidebarToggleContext";
import Link from "next/link";
import { stringify } from "querystring";
import React, { useContext } from "react";
import { FaYoutube } from "react-icons/fa";
import { MdMenu } from "react-icons/md";

type PropsType = {
  showMenuIcon?: boolean;
};
const Logo = ({ showMenuIcon }: PropsType) => {
  const { toggleSidebar } = useContext(SidebarToggleContext);

  return (
    <div className="flex flex-row items-center px-2 text-lg font-bold">
      {showMenuIcon ? (
        <button
          className="block px-2 md:hidden"
          onClick={() => toggleSidebar()}
        >
          <MdMenu className="w-8 h-8" />
        </button>
      ) : null}
      <Link href={"/"} className="flex flex-row items-center gap-1 px-2 py-2">
        <FaYoutube color="red" className="w-8 h-8" />
        BehtarTube
      </Link>
    </div>
  );
};

export default Logo;
