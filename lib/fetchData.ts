const getYTData = async (
  url: string,
  signal?: AbortSignal,
  cache?: RequestCache,
) => {
  const response = await fetch(url, {
    signal,
    cache: cache || "no-cache",
  });

  try {
    const data = await response.json();
    if (data.error) {
      throw new Error(`YouTube API error: ${data.error}`);
    } else {
      return data;
    }
  } catch (err: any) {
    console.log("Get Data Error: ", err);
    throw err.message;
  }
};

export default getYTData;
