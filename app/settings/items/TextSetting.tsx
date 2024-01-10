"use client";

import React, { useEffect, useState } from "react";
import HelpBubble from "@/components/ui/HelpBubble";
import Link from "next/link";
import {
  getLocalStorageSetting,
  setLocalStorageSetting,
} from "@/utils/localStorageSettings";
import TextInput from "@/components/ui/TextInput";

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
      <TextInput
        id="input"
        className="block w-full"
        placeholder={title}
        value={inputValue}
        onChange={(e: any) => setInputValue(e.target.value)}
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
