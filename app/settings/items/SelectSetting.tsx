"use client";

import HelpBubble from "@/components/ui/HelpBubble";
import SelectInput from "@/components/ui/Select";
import { getLocalStorageSetting, setLocalStorageSetting } from "@/utils/localStorageSettings";
import React, { useEffect, useState } from "react";

export type SelectSettingListType = { name: string; value: string };

type PropsType = {
  title: string;
  itemId: string;
  list: SelectSettingListType[];
  defaultVal: string;
  help?: string;
};
const SelectSetting = ({
  title,
  itemId,
  list,
  help,
  defaultVal,
}: PropsType) => {
  const defaultValue = getLocalStorageSetting(itemId) || defaultVal;

  const [selectedItem, setSelectedItem] = useState(defaultValue);

  useEffect(() => {
    setLocalStorageSetting(itemId, selectedItem);
  }, [selectedItem, itemId]);

  return (
    <div>
      <label
        htmlFor="input"
        className="flex flex-row gap-1 mx-4 mb-2 font-medium dark:text-white"
      >
        {title}
        {help ? <HelpBubble text={help} /> : null}
      </label>
      <SelectInput
        className="block w-full"
        onChange={(e: any) => setSelectedItem(e.target.value)}
        value={selectedItem}
      >
        {list.map((item) => (
          <option key={item.value} value={item.value}>
            {item.name}
          </option>
        ))}
      </SelectInput>
    </div>
  );
};

export default SelectSetting;
