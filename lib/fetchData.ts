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
    return data;
  } catch (err) {
    console.log("Get Data Error: ", err);
    return null;
  }
};

export default getYTData;
