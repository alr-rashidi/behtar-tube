"use client";

import { searchSuggestionsType } from "@/types";
import React, { useEffect, useRef, useState } from "react";
import { getSearchSuggestionsData } from "@/components/getData";
import localTextDecoder from "@/calc/textDecoder";
import { useRouter } from "next/navigation";
import { getLocalStorageSetting } from "@/calc/localStorageSettings";

type PropsType = {
  inputText: string;
};
const SearchSuggestions = ({ inputText }: PropsType) => {
  const router = useRouter();

  const getSuggestionsTimeout = useRef<NodeJS.Timeout | null>(null);

  const [data, setData] = useState<searchSuggestionsType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (getSuggestionsTimeout.current) {
      clearTimeout(getSuggestionsTimeout.current);
    }
    setLoading(true);
    getSuggestionsTimeout.current = setTimeout(() => {
      const controller = new AbortController();
      const getData = async () => {
        try {
          const newData: searchSuggestionsType = await getSearchSuggestionsData(
            inputText,
            controller.signal
          );
          setData(newData);
        } catch {
          setData(null);
        }
        setLoading(false);
      };
      getData();

      return () => {
        controller.abort();
      };
    }, 1000);
  }, [inputText]);

  const handleClick = (item: string) => {
    router.push("/search?q=" + item);
  };

  return (
    <ul className='absolute peer-focus:flex active:flex flex-col hidden text-right transition left-0 gap-2 bg-white dark:bg-black shadow backdrop-blur bg-opacity-60 dark:bg-opacity-60 w-full rounded-lg p-2'>
      {!loading ? (
        data &&
        data.suggestions.map((item) => (
          <li className="text-trim text-lines-1" key={item}>
            <button onClick={() => handleClick(item)}>
              {localTextDecoder(item)}
            </button>
          </li>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </ul>
  );
};

export default SearchSuggestions;
