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
import ReactPlayer, { Config, ReactPlayerProps } from "react-player";
import { OnProgressProps } from "react-player/base";

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
  const [videoSelectedSettings, setVideoSelectedSettings] =
    useState<VideoSelectedSettingsType>({
      videoResolution:
        getLocalStorageSetting("defaultVideoResolution") || "240p",
      audioQuality: "AUDIO_QUALITY_LOW",
      caption: "",
    });

  const proxyInstance = getLocalStorageSetting("proxyInstance") || instance;

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

  const listOfQualities: settingItemType[] = data.adaptiveFormats.map(
    (item) => {
      if ("resolution" in item) {
        return {
          label: item.qualityLabel,
          value: item.resolution,
        };
      } else {
        return null;
      }
    }
  );

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

  const mappedCaptions = data.captions.map((caption) => ({
    label: caption.label,
    value: caption.label,
  }));
  mappedCaptions.unshift({
    label: "",
    value: "None",
  });

  const listOfCaptions: settingItemType[] = mappedCaptions;

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
  }, []);

  const handlePlayBtn = () => {
    if (videoRef.current) {
      const internalPlayer: Record<string, any> =
        videoRef.current.getInternalPlayer();
      if (internalPlayer.paused) {
        internalPlayer.play();
        setPlaying(true);
      } else {
        internalPlayer.pause();
        setPlaying(false);
      }
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
      const internalPlayer: Record<string, any> =
        videoRef.current.getInternalPlayer();
      if (value >= 0 && value <= videoRef.current.getDuration()) {
        internalPlayer.currentTime = value;
      } else if (value < 0) {
        internalPlayer.currentTime = 0;
      } else {
        // videoRef.current.getCurrentTime() = videoRef.current.duration;
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
          videoRef.current.getDuration()) *
        // ... * Timeline value (parseInt for TS intellisense)
        videoRef.current.getCurrentTime()
      }px`;
    }
  };

  const handleVolume = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (videoRef.current) {
      const internalPlayer: Record<string, any> =
        videoRef.current.getInternalPlayer();
      if (value == 0) {
        setMuted(true);
      } else {
        setMuted(false);
      }
      internalPlayer.volume = value / 100;
    }
  };

  const handleMute = () => {
    if (videoRef.current && volumeInputRef.current) {
      const internalPlayer: Record<string, any> =
        videoRef.current.getInternalPlayer();
      if (muted) {
        internalPlayer.volume = parseInt(volumeInputRef.current.value) / 100;
        setMuted(false);
      } else {
        internalPlayer.volume = 0;
        setMuted(true);
      }
    }
  };

  const handleVideoDuration = (progress: OnProgressProps) => {
    setCurrentTime(progress.playedSeconds);
    ChangeTimelineThumbPosition();
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
      if (videoRef.current) {
        const internalPlayer: Record<string, any> =
          videoRef.current.getInternalPlayer();
        if (key == "k") {
          handlePlayBtn();
        } else if (key == "j") {
          internalPlayer.currentTime = videoRef.current.getCurrentTime() - 5;
        } else if (key == "l") {
          internalPlayer.currentTime = videoRef.current.getCurrentTime() + 5;
        } else if (key == "f") {
          handleFullscreenBtn();
        } else if (key == "ArrowLeft") {
          internalPlayer.currentTime = videoRef.current.getCurrentTime() - 10;
        } else if (key == "ArrowRight") {
          internalPlayer.currentTime = videoRef.current.getCurrentTime() + 10;
        }
      }
    };
    window.addEventListener("keydown", keyPressFunction);
    return () => window.removeEventListener("keydown", keyPressFunction);
  }, []);

  const videoConfig: Config =
    videoSelectedSettings.caption !== ""
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
                    mode: "showing",
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
    <div className="relative overflow-hidden rounded-xl" ref={videoDivRef}>
      <ReactPlayer
        ref={videoRef}
        key={JSON.stringify(videoSelectedSettings)}
        width="100%"
        height="100%"
        config={videoConfig}
        style={{ aspectRatio: "16/9" }}
        progressInterval={7}
        url="https://yt.artemislena.eu/videoplayback?expire=1703179205&ei=ZR-EZcjTBcOW1gK60oToCg&ip=2a02%3A8109%3A928f%3A4a00%3A922%3A505e%3Ad71a%3Ae14c&id=o-AH8F6TM27IzVnDhTMphs2BGMuv4EfnOU6gTgxgroyeJF&itag=18&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&mh=YY&mm=31%2C29&mn=sn-i5h7lner%2Csn-i5heen7d&ms=au%2Crdu&mv=m&mvi=2&pl=45&initcwndbps=2211250&spc=UWF9f5H4YpPWujUveoIptcZzZliuHXs&vprv=1&svpuc=1&mime=video%2Fmp4&gir=yes&clen=79162640&ratebypass=yes&dur=1052.630&lmt=1696521526889259&mt=1703157415&fvip=3&fexp=24007246&c=ANDROID&txp=5538434&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cgir%2Cclen%2Cratebypass%2Cdur%2Clmt&sig=AJfQdSswRAIgVnSQMq0H3siSvhb-U8wc5tNohbZ3OsNPWK4Qftha2QgCIHK8aB9nWjz30opDAegxEZ4T9Aj6aC1Zt5IbwawWmsGF&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AAO5W4owRAIgdv17pkRT8BQ_GVqRea5c2lTSreEnRwIybYSzLbwNGtICIDL1wlh667OUwSUuN-gdVqr7SvhoFqX_rQ67qB4D0b31&host=rr2---sn-i5h7lner.googlevideo.com"
        onReady={() => console.log(videoConfig)}
        onEnded={() => setPlaying(false)}
        onProgress={(progress) => handleVideoDuration(progress)}
        onBuffer={() => setLoading(true)}
        onBufferEnd={() => setLoading(false)}
      />
      <div className="absolute top-0 bottom-0 left-0 right-0 flex flex-col gap-1">
        <div
          className={`absolute w-full h-full bg-opacity-60 flex items-center justify-center transition ${
            !playing || loading ? "bg-[#00000090]" : null
          }`}
          ref={videoUnderLayerRef}
          onClick={handlePlayBtn}
        >
          {JSON.stringify(videoSelectedSettings)}

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
          {videoSettings ? (
            <SettingsBtn
              settings={videoSettings}
              setVideoSelectedSettings={setVideoSelectedSettings}
            />
          ) : null}
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
