"use client";

import { getLocalStorageSetting } from "@/calc/localStorageSettings";
import { DetailedVideoType } from "@/types";
import Plyr, { PlyrOptions, PlyrSource } from "plyr-react";

const Player = ({ data }: { data: DetailedVideoType }) => {
  const proxyInstance = getLocalStorageSetting("proxyInstance");
  const autoplaySetting = getLocalStorageSetting("autoplay");

  const ValidAdaptiveFormats = data.formatStreams.filter(
    (item) => item.resolution != undefined
  );

  const videoSource: PlyrSource = {
    type: "video",
    title: data.title,
    sources: ValidAdaptiveFormats.map((item) => {
      const validUrl = item.url.replace(/https:\/\/.+\//i, proxyInstance + "/");

      return {
        src: validUrl,
        type: `video/${item.container}`,
        size: parseInt(item.resolution!),
      };
    }),
    previewThumbnails: {
      src: data.videoThumbnails[3].url,
    },
    tracks: data.captions.map((caption) => {
      return {
        kind: "captions",
        src: proxyInstance + caption.url,
        srcLang: caption.languageCode,
        label: caption.label,
      };
    }),
  };
  const videoOptions: PlyrOptions = {
    autoplay: autoplaySetting || false,
    ratio: "16:9",
  };

  return (
    <div className="overflow-hidden md:rounded-xl">
      <Plyr source={videoSource} options={videoOptions} />
    </div>
  );
};

export default Player;
