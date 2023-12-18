import React from "react";
import CheckboxSetting from "./items/CheckboxSetting";
import TextSetting from "./items/TextSetting";
import SelectSetting from "./items/SelectSetting";
import { YTMonitizedCountries } from "./data/YTMonitizedCountires";

const page = () => {
  const sectionClassName = "flex flex-col gap-3";
  const sectionTitleClassName = "text-2xl font-bold";

  return (
    <div className="flex flex-col gap-10 p-4">
      <section className={sectionClassName}>
        <h1 className={sectionTitleClassName}>General</h1>
        <CheckboxSetting
          title="Enable Search Suggestions"
          itemId="searchSuggestions"
          defaultVal={true}
        />
        <TextSetting
          title="Current invidious instance"
          itemId="instance"
          help="The server that BehtarTube connect to get data"
          helper="View all invidious instances list here"
          helperLink="https://api.invidious.io/"
          defaultVal="https://yt.artemislena.eu/"
        />
        <SelectSetting
          title="Trending region"
          itemId="region"
          list={YTMonitizedCountries}
          help="You can pick which country's trending videos you want to have displayed"
          defaultVal="US"
        />
      </section>
      <section className={sectionClassName}>
        <h1 className={sectionTitleClassName}>Player</h1>
        <CheckboxSetting
          title="Proxy Videos Through Invidious"
          itemId="proxyVideos"
          help="Will connect to Invidious to serve videos instead of making a direct connection to Youtube"
          defaultVal={true}
        />
        <CheckboxSetting
          title="Autoplay Videos"
          itemId="autoplayVideos"
          defaultVal={false}
        />
        <SelectSetting
          title="Default quality"
          itemId="defaultQuality"
          list={[
            { name: "360p", value: "360" },
            { name: "720p", value: "720" },
          ]}
          defaultVal="360"
        />
      </section>
    </div>
  );
};

export default page;
