"use client";

import Link from "next/link";
import React, { useState } from "react";

const Tabs = ({
  tabs,
  channelId,
  selectedTab,
}: {
  tabs: string[];
  channelId: string;
  selectedTab: string;
}) => {
  const [activeTab, setActiveTab] = useState<string>(selectedTab);

  const removeInvalidTabs = (tabs: string[]) => {
    const validTabs = ["community", "playlists", "shorts", "videos", "streams"];

    const newTabs = tabs.filter((value) => validTabs.includes(value));
    return newTabs;
  };

  return (
    <div className="flex flex-row overflow-x-scroll border-b border-gray-600 text-subtitle-color">
      {removeInvalidTabs(tabs).map((tab) => (
        <Link
          key={tab}
          href={`/channel/${channelId}/${tab}`}
          className={`px-4 py-2 transition border-gray-500 hover:border-b ${
            tab == activeTab &&
            "dark:text-white text-black border-b dark:border-white border-black"
          }`}
          onClick={() => setActiveTab(tab)}
        >
          {tab}
        </Link>
      ))}
    </div>
  );
};

export default Tabs;
