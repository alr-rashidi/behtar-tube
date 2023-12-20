"use client";

import Loading from "@/app/Loading";
import { getLocalStorageSetting } from "@/calc/localStorageSettings";
import { instance } from "@/components/getData";
import { DetailedVideoType } from "@/types";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { MdPlayArrow } from "react-icons/md";
import TimelineInput from "./components/TimelineInput";
import VolumeInput from "./components/VolumeInput";
import MuteBtn from "./components/MuteBtn";
import FullscreenBtn from "./components/FullscreenBtn";
import PlayBtn from "./components/PlayBtn";
import videoTimeFormater from "@/calc/videoTimeFormater";
import SettingsBtn from "./components/SettingsBtn";

type settingItemType =
  | {
      label: string;
      value: string;
    }
  | null
  | undefined;

export type settingType = {
  name: string;
  items: settingItemType[];
};

const Player = ({ data }: { data: DetailedVideoType }) => {
  const videoDivRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const timelineInputRef = useRef<HTMLInputElement>(null);
  const timelineBGRef = useRef<HTMLDivElement>(null);
  const videoUnderLayerRef = useRef<HTMLDivElement>(null);
  const timelineThumbRef = useRef<HTMLDivElement>(null);
  const volumeInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [showControls, setShowControls] = useState<boolean>();
  const [playing, setPlaying] = useState<boolean>(false);
  const [fullscreen, setFullscreen] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [muted, setMuted] = useState<boolean>(false);
  const [videoSettings, setVideoSettings] = useState<settingType[]>();

  const proxyInstance = getLocalStorageSetting("instance") || instance;

  const videoUnderLayerClassName =
    "w-full h-full flex items-center justify-center";

  var filterSettingItems = (obj: settingItemType[]) => {
    const uniqueItems = Array.from(new Set(obj.map((item) => item?.value)));
    return uniqueItems.map((value) => {
      const matchingItem = obj.find((item) => item?.value === value);
      if (matchingItem) {
        return {
          value: matchingItem.value,
          label: matchingItem.label,
        };
      }
      return null;
    });
  };

  const listOfQualities: settingItemType[] = data.adaptiveFormats.map((item) => {
    if ("resolution" in item) {
      return {
        label: item.qualityLabel,
        value: item.resolution,
      };
    } else {
      return null;
    }
  });

  const listOfAudios: settingItemType[] = data.adaptiveFormats.map((item) => {
    if ("audioQuality" in item) {
      return {
        label: item.audioQuality,
        value: item.audioQuality,
      };
    } else {
      return null;
    }
  });

  const listOfCaptions: settingItemType[] = data.captions.map(caption => ({
    label: caption.label,
    value: caption.languageCode
  }));

  // set videoSettings to state
  useEffect(() => {
    setVideoSettings([
      {
        name: "Video Qualities",
        items: filterSettingItems(listOfQualities),
      },
      { name: "Audio Qualities", items: filterSettingItems(listOfAudios) },
      { name: "Captions", items: listOfCaptions },
    ]);
  }, []);

  const handlePlayBtn = () => {
    if (videoRef.current?.paused) {
      videoRef.current.play();
      setPlaying(true);
    } else {
      videoRef.current?.pause();
      setPlaying(false);
    }
  };

  const handleFullscreenBtn = () => {
    if (document.fullscreenElement == videoDivRef.current) {
      document.exitFullscreen();
      setFullscreen(false);
    } else {
      videoDivRef.current?.requestFullscreen();
      setFullscreen(true);
    }
  };

  const handleTimeline = (value: number) => {
    if (
      timelineThumbRef.current &&
      timelineInputRef.current &&
      videoRef.current
    ) {
      if (value >= 0 && value <= videoRef.current.duration) {
        videoRef.current.currentTime = value;
      } else if (value < 0) {
        videoRef.current.currentTime = 0;
      } else {
        videoRef.current.currentTime = videoRef.current.duration;
      }

      ChangeTimelineThumbPosition();
    }
  };

  const ChangeTimelineThumbPosition = () => {
    if (
      timelineThumbRef.current &&
      timelineInputRef.current &&
      videoRef.current
    ) {
      timelineThumbRef.current.style.left = `${
        // Timeline width - Thumb width / Video time(max value of input) = One percent of the width of input
        ((timelineInputRef.current.clientWidth - 16) /
          videoRef.current.duration) *
        // ... * Timeline value (parseInt for TS intellisense)
        videoRef.current.currentTime
      }px`;
    }
  };

  const handleVolume = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (videoRef.current) {
      if (value == 0) {
        setMuted(true);
      } else {
        setMuted(false);
      }
      videoRef.current.volume = value / 100;
    }
  };

  const handleMute = () => {
    if (videoRef.current && volumeInputRef.current) {
      if (muted) {
        videoRef.current.volume = parseInt(volumeInputRef.current.value) / 100;
        setMuted(false);
      } else {
        videoRef.current.volume = 0;
        setMuted(true);
      }
    }
  };

  videoRef.current?.addEventListener("waiting", () => {
    setLoading(true);
  });
  videoRef.current?.addEventListener("canplay", () => {
    setLoading(false);
  });
  videoRef.current?.addEventListener("timeupdate", (e: any) => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current?.currentTime);
      ChangeTimelineThumbPosition();
    }
  });
  videoRef.current?.addEventListener("ended", (e: any) => {
    setPlaying(false);
  });
  // Handle pointer moves on videoDiv
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const handlePointerOverVideo = (e: PointerEvent) => {
      clearTimeout(timeout);
      setShowControls(true);
      timeout = setTimeout(() => {
        setShowControls(false);
      }, 5000);
    };

    const videoUnderLayerRefCurrent = videoUnderLayerRef.current;
    videoUnderLayerRefCurrent?.addEventListener(
      "pointermove",
      handlePointerOverVideo
    );
    return () =>
      videoUnderLayerRefCurrent?.removeEventListener(
        "pointermove",
        handlePointerOverVideo
      );
  }, []);
  // Handle keyboard shortcuts
  useEffect(() => {
    const keyPressFunction = (e: any) => {
      const key = e.key;
      if (key == "k") {
        handlePlayBtn();
      } else if (key == "j") {
        if (videoRef.current) {
          videoRef.current.currentTime = videoRef.current.currentTime - 5;
        }
      } else if (key == "l") {
        if (videoRef.current) {
          videoRef.current.currentTime = videoRef.current.currentTime + 5;
        }
      } else if (key == "f") {
        handleFullscreenBtn();
      } else if (key == "ArrowLeft") {
        if (videoRef.current) {
          videoRef.current.currentTime = videoRef.current.currentTime - 10;
        }
      } else if (key == "ArrowRight") {
        if (videoRef.current) {
          videoRef.current.currentTime = videoRef.current.currentTime + 10;
        }
      }
    };
    window.addEventListener("keydown", keyPressFunction);
    return () => window.removeEventListener("keydown", keyPressFunction);
  }, []);

  return (
    <div className="relative overflow-hidden rounded-xl" ref={videoDivRef}>
      <video ref={videoRef} className="w-full">
        {/* <source
          src={data.formatStreams[1].url.replace(
            /https:\/\/.+\//i,
            proxyInstance + "/"
          )}
          type={data.formatStreams[1].type}
        /> */}
        <source src="https://www.w3schools.com/html/mov_bbb.mp4" />
        {/* {data.captions.map((item) => (
          <track
            key={item.languageCode}
            src={proxyInstance + item.url}
            kind={item.label}
            srcLang={item.languageCode}
          />
        ))} */}
      </video>
      <div className="absolute top-0 bottom-0 left-0 right-0 flex flex-col gap-1">
        <div
          className={`absolute w-full h-full bg-opacity-60 flex items-center justify-center transition ${
            !playing || loading ? "bg-[#00000090]" : null
          }`}
          ref={videoUnderLayerRef}
          onClick={handlePlayBtn}
        >
          {loading ? (
            <div className={videoUnderLayerClassName}>
              <Loading />
            </div>
          ) : null}
          {!playing ? (
            <div className={`${videoUnderLayerClassName} pointer-events-none`}>
              <MdPlayArrow className="w-12 h-12 p-2 bg-black rounded-full bg-opacity-20" />
            </div>
          ) : null}
        </div>
        <div
          aria-label="BottomPanel"
          className={`absolute bottom-0 left-0 right-0 flex flex-row h-10 gap-3 px-2 ${
            showControls && playing ? "opacity-100" : "opacity-0"
          } ${
            !playing ? "opacity-100" : null
          } hover:opacity-100 transition bg-gray-900`}
        >
          <PlayBtn handlePlayBtn={handlePlayBtn} playing={playing} />
          <TimelineInput
            timelineInputRef={timelineInputRef}
            timelineBGRef={timelineBGRef}
            videoRef={videoRef}
            timelineThumbRef={timelineThumbRef}
            handleTimeline={handleTimeline}
          />
          <div className="my-auto">{videoTimeFormater(currentTime)}</div>
          <MuteBtn muted={muted} handleMute={handleMute} />
          <VolumeInput
            volumeInputRef={volumeInputRef}
            handleVolume={handleVolume}
            muted={muted}
          />
          {videoSettings ? <SettingsBtn settings={videoSettings} /> : null}
          <FullscreenBtn
            fullscreen={fullscreen}
            handleFullscreenBtn={handleFullscreenBtn}
          />
        </div>
      </div>
    </div>
  );
};

export default Player;
