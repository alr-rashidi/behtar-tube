"use client";

import { SidebarToggleContext } from "@/contexts/sidebarToggleContext";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useContext } from "react";
import { IconType } from "react-icons";
import { MdGroup, MdMovie, MdMusicNote, MdSettings, MdStar, MdVideogameAsset } from "react-icons/md";
import Logo from "./header/Logo";

type itemType = {
  id: string;
  icon: IconType;
};

type PropsType = {
  userAuth: any;
};
const Sidebar = ({ userAuth }: PropsType) => {
  const items: itemType[] = [
    { id: "trending", icon: MdStar },
    { id: "gaming", icon: MdVideogameAsset },
    { id: "music", icon: MdMusicNote },
    { id: "movies", icon: MdMovie },
  ];

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const { sidebarState, toggleSidebar } = useContext(SidebarToggleContext);

  let category: string;
  if (pathname == "/") {
    if (searchParams.get("category")) {
      category = searchParams.get("category") as string;
    } else {
      category = "trending";
    }
  }

  const handleClickItem = (itemId: string) => {
    if (items.find((item) => item.id == itemId)) {
      router.push(itemId != "trending" ? "/?category=" + itemId : "/");
    } else {
      router.push("/" + itemId);
    }
    toggleSidebar(false);
  };

  return (
    <>
      <div
        className={`absolute z-40 translate-x-0 transition md:opacity-0 md:pointer-events-none left-0 right-0 top-0 bottom-0 opacity-0 pointer-events-none ${
          sidebarState && "pointer-events-auto opacity-60"
        } bg-black w-full`}
        onClick={() => toggleSidebar(false)}
      >
        &nbsp;
      </div>
      <div
        className={`z-40 py-1 transition dark:bg-darkBG bg-white w-64 fixed md:ltr:translate-0 md:rtl:trtranslate ${
          sidebarState
            ? "translate-0"
            : "ltr:-translate-x-full rtl:translate-x-full"
        } md:rtl:right-0 md:ltr:left-0 top-0 h-full text-right`}
      >
        <Logo showMenuIcon />
        <div className="flex flex-col p-2">
          {items.map((item) => (
            <SidebarItem
              key={item.id}
              itemId={item.id}
              Icon={item.icon}
              selected={item.id == category}
              onClick={handleClickItem}
            />
          ))}
          {userAuth
            ? (
              <>
                <Divider />
                <SidebarItem
                  itemId={"subscribes"}
                  Icon={MdGroup}
                  selected={"/subscribes" == pathname}
                  onClick={handleClickItem}
                />
              </>
            )
            : null}
          <Divider />
          <SidebarItem
            itemId={"settings"}
            Icon={MdSettings}
            selected={"/settings" == pathname}
            onClick={handleClickItem}
          />
        </div>
      </div>
    </>
  );
};
type SidebarItemPropsType = {
  itemId: string;
  Icon: IconType;
  onClick: Function;
  selected: boolean;
};
const SidebarItem = ({
  itemId,
  Icon,
  selected,
  onClick: handleClick,
}: SidebarItemPropsType) => (
  <button
    className={`flex flex-row px-4 py-3 my-1 gap-4 cursor-pointer rounded-lg hover:bg-[#ff000040] active:scale-90 transition ${
      selected ? "bg-[#ff000020]" : ""
    }`}
    onClick={() => {
      handleClick && handleClick(itemId);
    }}
  >
    <Icon className="w-6 h-6" color={selected ? "red" : ""} />
    <span className={`${selected && "text-red-500"} first-letter:uppercase`}>
      {itemId}
    </span>
  </button>
);

const Divider = () => <hr className="my-2 border border-neutral-200 dark:border-neutral-800" />;

export default Sidebar;
