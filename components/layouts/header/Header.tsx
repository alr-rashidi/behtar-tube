"use client";

import { getProfilePictureURL } from "@/api/supabase";
import Button from "@/components/ui/Button";
import { SidebarToggleContext } from "@/contexts/sidebarToggleContext";
import { themeContext } from "@/contexts/themeContext";
import { Database } from "@/types/supabase";
import { User } from "@supabase/supabase-js";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { MdArrowBack, MdOutlineAccountCircle, MdOutlineDarkMode, MdOutlineLightMode, MdSearch } from "react-icons/md";
import Logo from "./Logo";
import SearchBar from "./search/SearchBar";

type PropsType = {
  user: Database["public"]["Tables"]["profiles"]["Row"];
};
const Header = ({ user }: PropsType) => {
  const { theme, switchTheme } = useContext(themeContext);
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const [smallScreenSearching, setSmallScreenSearching] = useState<boolean>(false);
  const { sidebarState, toggleSidebar } = useContext(SidebarToggleContext);
  const [ProfilePicURL, setProfilePicURL] = useState<string>()
  const smallScreenSearchWidth = 850;
  const router = useRouter();

  useEffect(() => {
    const windowWidthHandler = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", windowWidthHandler);

    if (windowWidth <= smallScreenSearchWidth && sidebarState) {
      toggleSidebar(false);
    }

    windowWidthHandler();
    return () => {
      window.removeEventListener("resize", windowWidthHandler);
    };
  }, [windowWidth]);

  useEffect(() => {
    const changeProfilePic = async () => {
      let url = await getProfilePictureURL(user.avatar_url!);
      setProfilePicURL(url)
    };
    changeProfilePic()
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-40 flex flex-row items-center justify-between h-12 py-2 transition bg-white md:h-14 dark:bg-darkBG">
      {!smallScreenSearching
        ? (
          <>
            <Logo showMenuIcon={true} />
            {windowWidth >= smallScreenSearchWidth && <SearchBar />}
            <div className="flex flex-row gap-2 h-full px-4">
              {windowWidth <= smallScreenSearchWidth && (
                <Button onClick={() => setSmallScreenSearching(true)}>
                  <MdSearch className="w-5 h-5" />
                </Button>
              )}
              <Button
                className="h-full"
                onClick={() => {
                  switchTheme();
                }}
              >
                {theme == "dark"
                  ? <MdOutlineLightMode className="w-5 h-5" />
                  : <MdOutlineDarkMode className="w-5 h-5" />}
              </Button>
              {user
                ? (
                  <Button
                    className="flex flex-row items-center gap-1"
                    onClick={() => router.push("/account")}
                  >
                    {ProfilePicURL
                      ? (
                        <Image
                          width={30}
                          height={30}
                          className="rounded-full"
                          src={ProfilePicURL}
                          alt="ProfilePic"
                        />
                      )
                      : <MdOutlineAccountCircle className="w-6 h-6" />}
                    <span className="text-sm md:text-base text-trim text-lines-1">{user.full_name}</span>
                  </Button>
                )
                : (
                  <Button
                    className="flex flex-row items-center gap-1"
                    onClick={() => router.push("/login")}
                  >
                    <MdOutlineAccountCircle className="w-6 h-6" />
                    <span className="text-sm md:text-base">Login</span>
                  </Button>
                )}
            </div>
          </>
        )
        : windowWidth <= smallScreenSearchWidth
        ? (
          <div className="flex flex-row items-center justify-around w-full h-full">
            <Button
              className="h-full"
              onClick={() => setSmallScreenSearching(false)}
            >
              <MdArrowBack className="w-7 h-7" />
            </Button>
            <SearchBar />
          </div>
        )
        : <>{setSmallScreenSearching(false)}</>}
    </div>
  );
};

export default Header;
