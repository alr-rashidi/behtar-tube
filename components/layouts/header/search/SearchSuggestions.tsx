"use client";

import { getSearchSuggestionsData } from "@/api/getYTData";
import { searchSuggestionsType } from "@/types";
import localTextDecoder from "@/utils/textDecoder";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

type PropsType = {
  inputText: string;
};
const SearchSuggestions = ({ inputText }: PropsType) => {
  const getSuggestionsTimeout = useRef<NodeJS.Timeout | null>(null);
  const [data, setData] = useState<searchSuggestionsType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (getSuggestionsTimeout.current) {
      clearTimeout(getSuggestionsTimeout.current);
    }
    getSuggestionsTimeout.current = setTimeout(() => {
      setLoading(true);
      const controller = new AbortController();
      const getData = async () => {
        try {
          const newData: searchSuggestionsType = await getSearchSuggestionsData(
            inputText,
            controller.signal,
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

  return (
    <ul className="absolute left-0 flex-col hidden w-full gap-2 p-2 text-right transition bg-white rounded-lg shadow peer-focus:flex active:flex dark:bg-black backdrop-blur bg-opacity-60 dark:bg-opacity-60">
      {!loading
        ? (
          data?.suggestions
          && data.suggestions.map((item, index) => (
            <li
              className={`text-trim text-lines-1 border-gray-300 dark:border-gray-700 ${
                index + 1 != data.suggestions.length ? "border-b" : ""
              } py-0.5`}
              key={item}
            >
              <Link href={"/search?q=" + localTextDecoder(item)}>
                {localTextDecoder(item)}
              </Link>
            </li>
          ))
        )
        : <p>Loading...</p>}
    </ul>
  );
};

export default SearchSuggestions;
