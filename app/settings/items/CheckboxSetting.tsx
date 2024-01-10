"use client";

import Checkbox from "@/components/ui/Checkbox";
import HelpBubble from "@/components/ui/HelpBubble";
import { getLocalStorageSetting, setLocalStorageSetting } from "@/utils/localStorageSettings";
import { useEffect, useState } from "react";

type PropsType = {
  title: string;
  itemId: string;
  help?: string;
  defaultVal: boolean;
};
const CheckboxSetting = ({ title, itemId, help, defaultVal }: PropsType) => {
  const defaultValue = getLocalStorageSetting(itemId) == "true" ? true : false || defaultVal;

  const [checked, setChecked] = useState<boolean>(defaultValue);

  useEffect(() => {
    setLocalStorageSetting(itemId, checked ? "true" : "false");
  }, [checked, itemId]);

  return (
    <div className="flex flex-row items-center">
      <Checkbox checked={checked} id={`checkbox-${itemId}`} onChange={() => setChecked((prev) => !prev)} />
      <label className="flex flex-row items-center gap-2">
        {title}
        {help ? <HelpBubble text={help} /> : null}
      </label>
    </div>
  );
};

export default CheckboxSetting;
