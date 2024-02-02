"use client";

import { instance } from "@/api/getYTData";
import Loading from "@/app/Loading";
import { DetailedVideoType } from "@/types";
import { getLocalStorageSetting } from "@/utils/localStorageSettings";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { MdPlayArrow } from "react-icons/md";
import ReactPlayer, { Config } from "react-player";
import { OnProgressProps } from "react-player/base";
import FullscreenBtn from "./components/FullscreenBtn";
import PlayBtn from "./components/PlayBtn";
import SettingsBtn from "./components/SettingsBtn";
import TimelineInput from "./components/TimelineInput";
import VideoTime from "./components/VideoTime";
import VolumeInput from "./components/VolumeInput";

type settingItemType =
  | {
    label: string;
    value: string;
  }
  | null
  | undefined;

export type settingType = {
  name: string;
  id: string;
  items: settingItemType[];
};

export type VideoSelectedSettingsType = {
  videoResolution: string;
  audioQuality: string;
  caption: string;
};

const Player = ({ data }: { data: DetailedVideoType }) => {
  const videoDivRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<ReactPlayer>(null);
  const audioRef = useRef<ReactPlayer>(null);
  const videoUnderLayerRef = useRef<HTMLDivElement>(null);
  const [videoLoading, setVideoLoading] = useState<boolean>(true);
  const [audioLoading, setAudioLoading] = useState<boolean>(true);
  const [showControls, setShowControls] = useState<boolean>();
  const [playing, setPlaying] = useState<boolean>(false);
  const [fullscreen, setFullscreen] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [videoSettings, setVideoSettings] = useState<settingType[]>();
  const [videoSelectedSettings, setVideoSelectedSettings] = useState<VideoSelectedSettingsType>({
    videoResolution: "144p",
    audioQuality: "AUDIO_QUALITY_LOW",
    caption: "",
  });

  const isLoading = videoLoading || audioLoading;

  useEffect(() => {
    if (videoRef.current && audioRef.current) {
      const videoInternalPlayer: Record<string, any> = videoRef.current.getInternalPlayer();
      const audioInternalPlayer: Record<string, any> = audioRef.current.getInternalPlayer();
      if (videoInternalPlayer?.paused) {
        videoInternalPlayer.pause();
        audioInternalPlayer.pause();
        setPlaying(false);
        videoInternalPlayer.currentTime = 0;
        audioInternalPlayer.currentTime = 0;
      }
    }
  }, [videoSelectedSettings]);

  const proxyInstance = getLocalStorageSetting("proxyInstance") || instance;

  const videoUnderLayerClassName = "w-full h-full flex items-center justify-center";

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

  const listOfQualities: settingItemType[] = useMemo(() =>
    data.adaptiveFormats.map(
      (item) => {
        if ("resolution" in item) {
          return {
            label: item.qualityLabel,
            value: item.resolution,
          };
        } else {
          return null;
        }
      },
    ), [data.adaptiveFormats]);

  const listOfAudios: settingItemType[] = useMemo(() =>
    data.adaptiveFormats.map((item) => {
      if ("audioQuality" in item) {
        return {
          label: item.audioQuality,
          value: item.audioQuality,
        };
      } else {
        return null;
      }
    }), [data.adaptiveFormats]);

  const mappedCaptions = useMemo(() =>
    data.captions.map((caption) => ({
      label: caption.label,
      value: caption.label,
    })).concat({
      label: "",
      value: "None",
    }), [data.captions]);
  const listOfCaptions: settingItemType[] = mappedCaptions;

  // set default video resolution if available
  useEffect(() => {
    if (
      listOfQualities.find((item) => {
        item?.value == getLocalStorageSetting("defaultVideoResolution");
      })
    ) {
      setVideoSelectedSettings(prev => ({
        ...prev,
        videoResolution: getLocalStorageSetting("defaultVideoResolution"),
      }));
    }
  }, [listOfQualities]);

  // set videoSettings to state
  useEffect(() => {
    setVideoSettings([
      {
        name: "Video Resolution",
        id: "videoResolution",
        items: filterSettingItems(listOfQualities),
      },
      {
        name: "Audio Qualities",
        id: "audioQuality",
        items: filterSettingItems(listOfAudios),
      },
      { name: "Caption", id: "caption", items: listOfCaptions },
    ]);
  }, [listOfQualities, listOfAudios, listOfCaptions]);

  const handlePlay = useCallback(() => {
    if (videoRef.current && audioRef.current) {
      const videoInternalPlayer: Record<string, any> = videoRef.current.getInternalPlayer();
      const audioInternalPlayer: Record<string, any> = audioRef.current.getInternalPlayer();
      if (videoInternalPlayer.paused && !isLoading) {
        videoInternalPlayer.play();
        audioInternalPlayer.play();
        setPlaying(true);
      } else {
        videoInternalPlayer.pause();
        audioInternalPlayer.pause();
        setPlaying(false);
      }
    }
  }, [isLoading]);

  const handleFullscreenBtn = () => {
    if (document.fullscreenElement == videoDivRef.current) {
      document.exitFullscreen();
      setFullscreen(false);
    } else {
      videoDivRef.current?.requestFullscreen();
      setFullscreen(true);
    }
  };

  const handleVideoProgress = (progress: OnProgressProps) => {
    setCurrentTime(progress.playedSeconds);
  };
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
      handlePointerOverVideo,
    );
    return () =>
      videoUnderLayerRefCurrent?.removeEventListener(
        "pointermove",
        handlePointerOverVideo,
      );
  }, []);
  // Handle keyboard shortcuts
  useEffect(() => {
    const keyPressFunction = (e: any) => {
      const key = e.key;
      if (videoRef.current && audioRef.current) {
        const videoInternalPlayer: Record<string, any> = videoRef.current.getInternalPlayer();
        const audioInternalPlayer: Record<string, any> = audioRef.current.getInternalPlayer();
        let localCurrentTime = videoRef.current.getCurrentTime();
        if (key == "k") {
          handlePlay();
        } else if (key == "j") {
          videoInternalPlayer.currentTime = localCurrentTime - 5;
          audioInternalPlayer.currentTime = localCurrentTime - 5;
        } else if (key == "l") {
          videoInternalPlayer.currentTime = localCurrentTime + 5;
          audioInternalPlayer.currentTime = localCurrentTime + 5;
        } else if (key == "f") {
          handleFullscreenBtn();
        } else if (key == "ArrowLeft") {
          videoInternalPlayer.currentTime = localCurrentTime - 10;
          audioInternalPlayer.currentTime = localCurrentTime - 10;
        } else if (key == "ArrowRight") {
          videoInternalPlayer.currentTime = localCurrentTime + 10;
          audioInternalPlayer.currentTime = localCurrentTime + 10;
        }
      }
    };
    window.addEventListener("keydown", keyPressFunction);
    return () => window.removeEventListener("keydown", keyPressFunction);
  }, [handlePlay]);

  const videoConfig: Config = videoSelectedSettings.caption !== ""
    ? data.captions.reduce((config, caption) => {
      if (caption.label === videoSelectedSettings.caption) {
        return {
          file: {
            attributes: {
              crossOrigin: "anonymous",
            },
            tracks: [
              {
                kind: "subtitles",
                src: proxyInstance + caption.url,
                srcLang: "en",
                label: caption.label,
                default: true,
              },
            ],
          },
        };
      } else {
        return config;
      }
    }, {})
    : {};

  return (
    <div
      className={`relative overflow-hidden rounded-xl bg-neutral-500 ${!showControls ? "cursor-none" : "cursor-auto"}`}
      ref={videoDivRef}
    >
      <ReactPlayer
        ref={videoRef}
        key={JSON.stringify(videoSelectedSettings) + "-video"}
        width="100%"
        height="100%"
        config={videoConfig}
        style={{ aspectRatio: "16/9" }}
        pip={false}
        url={data.adaptiveFormats
          .filter((item) => {
            if ("resolution" in item) {
              return item.resolution == videoSelectedSettings.videoResolution;
            }
          })
          .map((item) => item.url.replace(/https:\/\/.+\//i, proxyInstance + "/"))}
        onEnded={() => setPlaying(false)}
        onPlay={() => isLoading ? videoRef.current?.getInternalPlayer().pause() : null}
        onProgress={(progress) =>
          isLoading
            ? videoRef.current?.getInternalPlayer().pause()
            : handleVideoProgress(progress)}
        onBuffer={() => setVideoLoading(true)}
        onBufferEnd={() => setVideoLoading(false)}
        onReady={() => setVideoLoading(false)}
      />
      <ReactPlayer
        ref={audioRef}
        key={JSON.stringify(videoSelectedSettings) + "-audio"}
        width="0"
        height="0"
        url={data.adaptiveFormats
          .filter((item) => {
            if ("audioQuality" in item) {
              return item.audioQuality == videoSelectedSettings.audioQuality;
            }
          })
          .map((item) => item.url.replace(/https:\/\/.+\//i, proxyInstance + "/"))}
        onEnded={() => setPlaying(false)}
        onPlay={() => isLoading ? audioRef.current?.getInternalPlayer().pause() : null}
        onProgress={() => isLoading ? audioRef.current?.getInternalPlayer().pause() : null}
        onBuffer={() => setAudioLoading(true)}
        onBufferEnd={() => setAudioLoading(false)}
        onReady={() => setAudioLoading(false)}
      />
      <div className="absolute top-0 bottom-0 left-0 right-0 flex flex-col gap-1">
        <div
          className={`absolute w-full h-full bg-opacity-60 flex items-center justify-center transition ${
            !playing || isLoading ? "bg-[#00000090]" : null
          }`}
          ref={videoUnderLayerRef}
          onClick={handlePlay}
        >
          {playing && isLoading
            ? (
              <div className={videoUnderLayerClassName}>
                <Loading />
              </div>
            )
            : null}
          {!playing
            ? (
              <div className={`${videoUnderLayerClassName} pointer-events-none`}>
                <MdPlayArrow className="w-12 h-12 p-2 bg-white dark:bg-black rounded-full bg-opacity-20" />
              </div>
            )
            : null}
        </div>
        <div
          aria-label="BottomPanel"
          className={`absolute bottom-0 left-0 right-0 flex flex-row h-10 gap-3 px-2 ${
            showControls && playing ? "opacity-100" : "opacity-0"
          } ${!playing ? "opacity-100" : null} hover:opacity-100 transition bg-white dark:bg-black bg-opacity-80`}
        >
          <PlayBtn handlePlay={handlePlay} playing={playing} />
          <TimelineInput
            videoRef={videoRef}
            audioRef={audioRef}
            currentTime={currentTime}
          />
          <VideoTime currentTime={currentTime} />
          <VolumeInput audioRef={audioRef} />
          {videoSettings
            ? (
              <SettingsBtn
                settings={videoSettings}
                setVideoSelectedSettings={setVideoSelectedSettings}
              />
            )
            : null}
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
