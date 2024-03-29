import DivWithHelpBubble from "@/components/ui/HelpBubble";
import React, { Dispatch, SetStateAction, useState } from "react";
import { MdArrowBack, MdSettings } from "react-icons/md";
import { settingType, VideoSelectedSettingsType } from "../Player";

type PropsType = {
  settings: settingType[];
  setVideoSelectedSettings: Dispatch<SetStateAction<VideoSelectedSettingsType>>;
};
const SettingsBtn = ({ settings, setVideoSelectedSettings }: PropsType) => {
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [selectedList, setSelectedList] = useState<string>("");

  const handleSettingsClick = () => {
    setShowSettings((prev) => !prev);
  };

  const handleItemClick = (listId: string, itemValue: string) => {
    setVideoSelectedSettings((prev) => ({ ...prev, [listId]: itemValue }));
    setSelectedList("");
  };

  return (
    <DivWithHelpBubble text="Settings" bubbleClassName={`bottom-10 ${showSettings ? "hidden" : ""}`}>
      <MdSettings className="w-8 h-full px-1 cursor-pointer peer" onClick={handleSettingsClick} />
      <div
        className={`absolute bottom-10 right-0 min-w-[10rem] transition w-min min-h-40 overflow-y-scroll max-h-60 overflow-scroll flex flex-row py-2 gap-1 bg-black bg-opacity-80 rounded-t-xl ${
          showSettings
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className={` ${selectedList == "" ? "block" : "hidden"} flex flex-col gap-1 flex-shrink-0 w-40 px-2`}
        >
          {settings.map((setting) => (
            <button
              key={setting.name}
              onClick={() => setSelectedList(setting.name)}
            >
              {setting.name}
            </button>
          ))}
        </div>
        {settings.map((setting) => (
          <div
            key={setting.id}
            className={` ${selectedList == setting.name ? "block" : "hidden"} flex flex-col min-w-min w-full px-2`}
          >
            <button
              className="p-1 bg-white rounded-full bg-opacity-10 w-min"
              onClick={() => setSelectedList("")}
            >
              <MdArrowBack className="w-5 h-5" />
            </button>
            <div className="my-1">{setting.name}:</div>
            <div className="flex flex-col gap-1">
              <hr className="my-1 border-neutral-600" />
              {setting.items.map((item) => {
                if (item) {
                  return (
                    <button
                      key={item.value}
                      className="w-full py-2 text-sm cursor-pointer"
                      onClick={() => handleItemClick(setting.id, item.value)}
                    >
                      {item.label}
                    </button>
                  );
                }
              })}
            </div>
          </div>
        ))}
      </div>
    </DivWithHelpBubble>
  );
};

export default SettingsBtn;
