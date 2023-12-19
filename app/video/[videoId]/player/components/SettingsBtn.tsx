import React, { useState } from "react";
import { MdSettings } from "react-icons/md";
import { settingType } from "../Player";

const SettingsBtn = ({ settings }: { settings: settingType[] }) => {
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [secondList, setSecondList] = useState<string>("");

  const handleSettingsClick = () => {
    setShowSettings((prev) => !prev);
  };

  const handleItemClick = (listName: string, itemValue: string) => {
    alert(itemValue);
    setSecondList("");
  };

  type SettingsType = {
    name: string;
    items: { label: string; value: string }[];
  }[];
  const settingsArray: SettingsType = [
    {
      name: "Video quality",
      items: [
        { label: "Item Label 1", value: "item1" },
        { label: "Item Label 2", value: "item2" },
        { label: "Item Label 3", value: "item3" },
        { label: "Item Label 4", value: "item4" },
      ],
    },
    {
      name: "Audio quality",
      items: [
        { label: "Item Label 1", value: "item1" },
        { label: "Item Label 2", value: "item2" },
        { label: "Item Label 3", value: "item3" },
      ],
    },
    {
      name: "caption",
      items: [
        { label: "Item Label 1", value: "item1" },
        { label: "Item Label 2", value: "item2" },
      ],
    },
  ];

  return (
    <div className="relative">
      <MdSettings className="w-6 h-full" onClick={handleSettingsClick} />
      <div
        className={`absolute bottom-10 right-0 w-40 h-40 overflow-scroll flex flex-row py-2 gap-1 transition bg-black bg-opacity-80 rounded ${
          showSettings
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }}`}
      >
        <div
          className={` ${
            secondList == "" ? "block" : "hidden"
          } flex flex-col flex-shrink-0 w-40 px-2`}
        >
          {settings.map((setting) => (
            <button
              key={setting.name}
              onClick={() => setSecondList(setting.name)}
            >
              {setting.name}
            </button>
          ))}
        </div>

        {settings.map((setting) => (
          <div
            key={setting.name}
            className={` ${
              secondList == "" ? "hidden" : "block"
            } flex flex-col w-40 px-2`}
          >
            {setting.items.map((item) => {
              if (item) {
                return (
                  <div key={item.value}>
                    <button
                      className="cursor-pointer"
                      onClick={() => handleItemClick(setting.name, item.value)}
                    >
                      {item.label}
                    </button>
                  </div>
                );
              }
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SettingsBtn;
