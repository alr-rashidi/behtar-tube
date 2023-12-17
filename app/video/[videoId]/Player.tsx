"use client";

import { instance } from "@/components/getData";
import { DetailedVideoType } from "@/types";
import Plyr, { PlyrOptions, PlyrSource } from "plyr-react";

const Player = ({ data }: { data: DetailedVideoType }) => {
  const ValidAdaptiveFormats = data.formatStreams.filter(
    (item) => item.resolution != undefined
  );

  const videoSource: PlyrSource = {
    type: "video",
    title: data.title,
    sources: ValidAdaptiveFormats.map((item) => {
      const validUrl = item.url.replace(/https:\/\/.+\//i, instance + "/");

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
        src: instance + caption.url,
        srcLang: caption.languageCode,
        label: caption.label,
      };
    }),
  };
  const videoOptions: PlyrOptions = {
    ratio: "16:9",
  };

  return (
    <div className="overflow-hidden md:rounded-xl">
      <Plyr source={videoSource} options={videoOptions} />
    </div>
  );
};

export default Player;
