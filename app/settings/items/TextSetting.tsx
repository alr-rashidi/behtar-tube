"use client";

import React, { useEffect, useState } from "react";
import HelpBubble from "@/components/HelpBubble";
import Link from "next/link";
import {
  getLocalStorageSetting,
  setLocalStorageSetting,
} from "@/utils/localStorageSettings";

type PropsType = {
  title: string;
  itemId: string;
  help?: string;
  helper?: string;
  helperLink?: string;
  defaultVal: string;
};
const TextSetting = ({
  title,
  itemId,
  help,
  helper,
  helperLink,
  defaultVal
}: PropsType) => {
  const defaultValue = getLocalStorageSetting(itemId) || defaultVal;

  const [inputValue, setInputValue] = useState(defaultValue);

  useEffect(() => {
    setLocalStorageSetting(itemId, inputValue);
  }, [inputValue]);

  return (
    <div className="my-2">
      <label
        htmlFor="input"
        className="flex flex-row gap-1 mx-4 mb-2 font-medium dark:text-white"
      >
        {title}
        {help ? <HelpBubble text={help} /> : null}
      </label>
      <input
        id="input"
        className="block w-full px-4 py-3 bg-gray-100 border-gray-200 rounded-lg focus:border-blue-500 dark:bg-gray-900"
        placeholder={title}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      {helper && helperLink ? (
        <Link
          href={helperLink}
          className="mt-2 text-sm text-blue-500 underline"
          target="_blank"
        >
          {helper}
        </Link>
      ) : (
        <p className="mt-2 text-sm text-gray-500">{helper}</p>
      )}
    </div>
  );
};

export default TextSetting;
