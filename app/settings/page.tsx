import React from "react";
import CheckboxSetting from "./items/CheckboxSetting";
import TextSetting from "./items/TextSetting";

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
      </section>
      <section className={sectionClassName}>
        <h1 className={sectionTitleClassName}>Player</h1>
        <CheckboxSetting
          title="Proxy Videos Through Invidious"
          itemId="proxyVideos"
          help="Will connect to Invidious to serve videos instead of making a direct connection to Youtube"
          defaultVal={true}
        />
        <TextSetting
          title="invidious instance to Proxy videos(if active)"
          itemId="proxyInstance"
          help="The server that BehtarTube connect to get videos and subtitles"
          helper="View all invidious instances list here"
          helperLink="https://api.invidious.io/"
          defaultVal="https://yt.artemislena.eu/"
        />
        <CheckboxSetting
          title="Autoplay Videos"
          itemId="autoplayVideos"
          defaultVal={false}
        />
      </section>
    </div>
  );
};

export default page;
