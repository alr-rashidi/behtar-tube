'use client'

import React, { useEffect, useState } from "react";
import HelpBubble from "./components/HelpBubble";
import { getLocalStorageSetting, setLocalStorageSetting } from "@/calc/localStorageSettings";

type PropsType = {
  title: string;
  itemId: string;
  list: { name: string; value: string }[];
  help?: string;
  defaultVal: string
};
const SelectSetting = ({ title, itemId, list, help, defaultVal }: PropsType) => {
  const defaultValue = getLocalStorageSetting(itemId) || defaultVal;

  const [selectedItem, setSelectedItem] = useState(defaultValue);

  useEffect(() => {
    setLocalStorageSetting(itemId, selectedItem);
  }, [selectedItem]);

  return (
    <div>
      <label
        htmlFor="input"
        className="flex flex-row gap-1 mx-4 mb-2 font-medium dark:text-white"
      >
        {title}
        {help ? <HelpBubble text={help} /> : null}
      </label>
      <select
        id="hs-select-label"
        className="block w-full px-4 py-3 bg-gray-100 border-gray-200 rounded-lg cursor-pointer pe-9 dark:bg-gray-900"
        onChange={(e) => setSelectedItem(e.target.value)}
        value={selectedItem}
      >
        {list.map((item) => (
          <option key={item.value} value={item.value}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectSetting;
