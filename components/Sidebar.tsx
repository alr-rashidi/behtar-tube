"use client";

import React, { useContext } from "react";
import {
  MdStar,
  MdVideogameAsset,
  MdMusicNote,
  MdMovie,
  MdClose,
} from "react-icons/md";
import { FaYoutube } from "react-icons/fa";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { IconType } from "react-icons";
import Link from "next/link";
import { SidebarToggleContext } from "@/contexts/sidebarToggleContext";
import Logo from "./header/Logo";

interface itemInterface {
  id: string;
  icon: IconType;
}

const Sidebar = () => {
  const items: itemInterface[] = [
    { id: "trending", icon: MdStar },
    { id: "gaming", icon: MdVideogameAsset },
    { id: "music", icon: MdMusicNote },
    { id: "movies", icon: MdMovie },
  ];

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();

  const { sidebarState, toggleSidebar } = useContext(SidebarToggleContext);

  let category: string;
  if (pathName == "/") {
    if (searchParams.get("category")) {
      category = searchParams.get("category") as string;
    } else {
      category = "trending";
    }
  }

  const handleClickItem = (itemId: string) => {
    router.push(itemId != "trending" ? "/?category=" + itemId : "/");
    console.log("Clicked!");
  };

  return (
    <>
      <div
        className={`absolute z-40 translate-x-0 transition left-0 right-0 top-0 bottom-0 opacity-0 pointer-events-none ${
          sidebarState && "pointer-events-auto opacity-60"
        } bg-black w-full`}
        onClick={() => toggleSidebar(false)}
      >
        &nbsp;
      </div>
      <div
        className={`z-40 py-1 transition dark:bg-darkBG bg-white w-64 fixed md:ltr:translate-x-0 md:rtl:translate-x-0 ${
          sidebarState
            ? "translate-x-0"
            : "ltr:-translate-x-full rtl:translate-x-full"
        } md:rtl:right-0 md:ltr:left-0 top-0 h-full text-right`}
      >
        <Logo showMenuIcon />
        <ul className="flex flex-col p-2">
          {items.map((item) => (
            <button
              key={item.id}
              className={`flex flex-row px-4 py-3 my-1 gap-4 cursor-pointer rounded-lg hover:bg-[#ff000040] active:scale-90 transition ${
                category == item.id ? "bg-[#ff000020]" : ""
              }`}
              onClick={() => {
                handleClickItem(item.id);
              }}
            >
              <item.icon
                className="w-6 h-6"
                color={category == item.id ? "red" : ""}
              />
              <span
                className={`${
                  category == item.id && "text-red-500"
                } first-letter:uppercase`}
              >
                {item.id}
              </span>
            </button>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
