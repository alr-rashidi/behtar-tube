"use client";

import React, { useContext, useEffect, useState } from "react";
import SearchBar from "./search/SearchBar";
import {
  MdArrowForward,
  MdOutlineAccountCircle,
  MdOutlineDarkMode,
  MdOutlineLightMode,
  MdSearch,
} from "react-icons/md";
import { themeContext } from "../../contexts/themeContext";
import { usePathname } from "next/navigation";
import Logo from "./Logo";

const Header = () => {
  const { theme, switchTheme } = useContext(themeContext);
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const [smallScreenSearching, setSmallScreenSearching] =
    useState<boolean>(false);
  const pathname = usePathname();
  const smallScreenSearchWidth = 850;

  useEffect(() => {
    const windowWidthHandler = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", windowWidthHandler);

    windowWidthHandler();
    return () => {
      window.removeEventListener("resize", windowWidthHandler);
    };
  }, [windowWidth]);

  return (
    <div className="fixed top-0 left-0 right-0 z-40 flex flex-row items-center justify-between py-2 transition bg-white h-14 dark:bg-darkBG">
      {!smallScreenSearching ? (
        <>
          <Logo showMenuIcon={true} />
          {windowWidth >= smallScreenSearchWidth && <SearchBar />}
          <div className="flex flex-row-reverse gap-2 px-4">
            <button
              onClick={() => alert("Coming soon...")}
              className="flex flex-row items-center gap-1 customButton"
            >
              <MdOutlineAccountCircle className="w-6 h-6" />
              <span className="text-sm md:text-base">Login / SignUp</span>
            </button>
            <button
              className="customButton"
              onClick={() => {
                switchTheme();
              }}
            >
              {theme == "dark" ? (
                <MdOutlineLightMode className="w-5 h-5" />
              ) : (
                <MdOutlineDarkMode className="w-5 h-5" />
              )}
            </button>
            {windowWidth <= smallScreenSearchWidth && (
              <button
                className="customButton"
                onClick={() => setSmallScreenSearching(true)}
              >
                <MdSearch className="w-5 h-5" />
              </button>
            )}
          </div>
        </>
      ) : windowWidth <= smallScreenSearchWidth ? (
        <div className="flex flex-row items-center justify-around w-full h-full">
          <button
            className="customButton"
            onClick={() => setSmallScreenSearching(true)}
          >
            <MdArrowForward className="w-7 h-7" />
          </button>
          <SearchBar />
        </div>
      ) : (
        <>{setSmallScreenSearching(false)}</>
      )}
    </div>
  );
};

export default Header;
