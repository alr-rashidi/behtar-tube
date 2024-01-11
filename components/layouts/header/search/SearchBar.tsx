"use client";

import Button from "@/components/ui/Button";
import TextInput from "@/components/ui/TextInput";
import { getLocalStorageSetting } from "@/utils/localStorageSettings";
import { useRouter, useSearchParams } from "next/navigation";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { MdClose, MdSearch } from "react-icons/md";
import SearchSuggestions from "./SearchSuggestions";

const SearchBar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const defaultValue: string = searchParams.get("q") || "";
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputText, setInputText] = useState<string>(defaultValue as string);
  const showSuggestion = getLocalStorageSetting("searchSuggestions") == "true" ? true : false;

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

  return (
    <div className="flex flex-row h-full lg:ltr:ml-20 lg:rtl:mr-20" dir="ltr">
      <Button
        className="flex items-center justify-center w-16 rounded-r-none border border-gray-300 dark:border-gray-700"
        onClick={handleSearch}
      >
        <MdSearch className="w-5 h-5" />
      </Button>
      <div className="relative">
        <TextInput
          className={`h-full pl-10 pr-4 ${
            showSuggestion ? "peer" : null
          } text-right transition active:scale-100 bg-[#eee] dark:bg-[#222] border border-gray-300 dark:border-gray-700 rounded-l-none w-60 lg:w-96`}
          placeholder="جستجو"
          value={inputText}
          onChange={(e: any) => handleChange(e)}
          onKeyDown={(e: any) => handleKeyDown(e)}
          ref={inputRef}
        />
        {inputText != "" && (
          <>
            <SearchSuggestions inputText={inputText} />
            <button
              className="absolute top-0 left-0 w-10 h-10 p-2"
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
