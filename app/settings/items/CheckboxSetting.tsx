"use client";

import { useEffect, useState } from "react";
import {
  getLocalStorageSetting,
  setLocalStorageSetting,
} from "@/utils/localStorageSettings";
import HelpBubble from "@/components/HelpBubble";

type PropsType = {
  title: string;
  itemId: string;
  help?: string;
  defaultVal: boolean;
};
const CheckboxSetting = ({ title, itemId, help, defaultVal }: PropsType) => {
  const defaultValue = getLocalStorageSetting(itemId) == 'true' ? true : false || defaultVal;

  const [checked, setChecked] = useState<boolean>(defaultValue);

  useEffect(() => {
    setLocalStorageSetting(itemId, checked ? "true" : "false");
  }, [checked, itemId]);

  return (
    <div className="flex flex-row items-center">
      <div className="relative flex items-center p-3 rounded-full cursor-pointer">
        <input
          type="checkbox"
          className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-red-500 checked:bg-red-500 checked:before:bg-red-500 hover:before:opacity-10"
          checked={checked}
          id={`checkbox-${itemId}`}
          onChange={() => setChecked((prev) => !prev)}
        />
        <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3.5 w-3.5"
            viewBox="0 0 20 20"
            fill="currentColor"
            stroke="currentColor"
            stroke-width="1"
          >
            <path
              fill-rule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </span>
      </div>
      <label className="flex flex-row items-center gap-2" htmlFor={`checkbox-${itemId}`}>
        {title}
        {help ? <HelpBubble text={help} /> : null}
      </label>
    </div>
  );
};

export default CheckboxSetting;
