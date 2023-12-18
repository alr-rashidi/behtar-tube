"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { MdClose, MdSearch } from "react-icons/md";
import SearchSuggestions from "./SearchSuggestions";
import { getLocalStorageSetting } from "@/calc/localStorageSettings";

const SearchBar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const defaultValue: string = searchParams.get("q") || "";
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputText, setInputText] = useState<string>(defaultValue as string);
  const showSuggestion = getLocalStorageSetting('searchSuggestions') == 'true' ? true : false;

  useEffect(() => {
    if (searchParams.get("q") != null) {
      setInputText(searchParams.get("q") as string);
    }
  }, [searchParams]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key == "Enter") {
      if (inputText != "") {
        router.push("/search?q=" + inputText);
        inputRef.current?.blur();
      } else {
        router.push("/");
        inputRef.current?.blur();
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleSearch = () => {
    router.push("/search?q=" + inputText);
  };

  const handleReset = () => {
    setInputText("");
    inputRef.current!.focus();
  };

  console.log(showSuggestion);  

  return (
    <div className="flex flex-row h-full lg:ltr:ml-20 lg:rtl:mr-20" dir="ltr">
      <button
        className="flex items-center justify-center w-16 transition bg-gray-300 border border-gray-400 rounded-l-full dark:bg-gray-700 dark:border-gray-600"
        onClick={handleSearch}
      >
        <MdSearch className="w-5 h-5" />
      </button>
      <div className="relative">
        <input
          className={`h-full pl-10 pr-4 ${showSuggestion ? 'peer' : null} text-right transition bg-gray-100 border border-gray-300 rounded-r-full dark:border-gray-600 focus:border-gray-400 dark:bg-stone-900 w-60 lg:w-96`}
          placeholder="جستجو"
          value={inputText}
          onChange={(e) => handleChange(e)}
          onKeyDown={(e) => handleKeyDown(e)}
          ref={inputRef}
        />
        {inputText != "" && (
          <>
            <SearchSuggestions inputText={inputText} />
            <button
              className="absolute top-0 left-0 w-10 h-10 p-2 opacity-80 hover:opacity-100"
              onClick={handleReset}
            >
              <MdClose className="w-full h-full" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
