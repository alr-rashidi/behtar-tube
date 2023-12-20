import { TrendVideoCategories } from "@/types";

const getData = async (
  url: string,
  signal?: AbortSignal,
  cache?: RequestCache
) => {
  const response = await fetch(url, {
    signal,
    cache: cache || "no-cache",
  });

  try {
    const data = await response.json();

    return data;
  } catch (err) {
    console.log("Get Data Error: ", err);
    return null;
  }
};

export const instance = "https://vid.puffyan.us";
// export const instance = "https://yt.artemislena.eu";

export const getChannelInfo = async (query: string, signal?: AbortSignal) => {
  return await getData(`${instance}/api/v1/channels/${query}`, signal);
};

export const getTrendVideos = async (
  category: TrendVideoCategories,
  signal?: AbortSignal
) => {
  return await getData(
    `${instance}/api/v1/trending?fields=title,videoId,videoThumbnails,author,authorId,lengthSeconds,viewCount,published${
      category && `&type=${category}`
    }`,
    signal
  );
};

export const getCommentsData = async (query: string, signal?: AbortSignal) => {
  return await getData(`${instance}/api/v1/comments/${query}`, signal);
};

export const getSearchSuggestionsData = async (
  query: string,
  signal?: AbortSignal
) => {
  return await getData(
    `${instance}/api/v1/search/suggestions?q=${query}`,
    signal
  );
};

export const getSearchData = async (
  query: string,
  page?: number,
  signal?: AbortSignal
) => {
  return await getData(
    `${instance}/api/v1/search?q=${query}${page && "&page=" + page}`,
    signal
  );
};

export const getVideoData = async (query: string, signal?: AbortSignal) => {
  return await getData(`${instance}/api/v1/videos/${query}`, signal);
};

export const getPlaylistData = async (query: string, signal?: AbortSignal) => {
  return await getData(`${instance}/api/v1/playlists/${query}`, signal);
};

export const getChannelVideos = async (query: string, signal?: AbortSignal) => {
  return await getData(`${instance}/api/v1/channels/${query}/videos/`, signal);
};

export const getChannelShorts = async (query: string, signal?: AbortSignal) => {
  return await getData(`${instance}/api/v1/channels/${query}/shorts/`, signal);
};

export const getChannelPlaylists = async (
  query: string,
  signal?: AbortSignal
) => {
  return await getData(
    `${instance}/api/v1/channels/${query}/playlists/`,
    signal
  );
};

export const getChannelCommunity = async (
  query: string,
  signal?: AbortSignal
) => {
  return await getData(
    `${instance}/api/v1/channels/${query}/community/`,
    signal
  );
};

export const getChannelStreams = async (
  query: string,
  signal?: AbortSignal
) => {
  return await getData(`${instance}/api/v1/channels/${query}/streams/`, signal);
};

export const getChannelChannels = async (
  query: string,
  signal?: AbortSignal
) => {
  return await getData(
    `${instance}/api/v1/channels/${query}/channels/`,
    signal
  );
};
