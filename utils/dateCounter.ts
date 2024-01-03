const dateCounter = (dateNum: number) => {
  const date = dateNum * 1000;
  const currentTime = new Date().getTime();
  const diffInSeconds = Math.abs((currentTime - date) / 1000);

  function formatPublishText(num: number, timeUnit: string) {
    const isPlural = num > 1;
    return `${num} ${timeUnit}${isPlural ? "s" : ""} ago`;
  }

  let published;

  if (!(diffInSeconds >= 60)) { // less than 1 minute
    published = Math.floor(diffInSeconds);
    return formatPublishText(published, "second");
  } else if (!(diffInSeconds >= 60 * 60)) { // less than 1 hour
    published = Math.floor(diffInSeconds / 60);
    return formatPublishText(published, "minute");
  } else if (!(diffInSeconds >= 60 * 60 * 24)) { // less than 1 day
    published = Math.floor(diffInSeconds / (60 * 60));
    return formatPublishText(published, "hour");
  } else if (!(diffInSeconds >= 60 * 60 * 24 * 30)) { // less than 1 month
    published = Math.floor(diffInSeconds / (60 * 60 * 24));
    return formatPublishText(published, "day");
  } else if (!(diffInSeconds >= 60 * 60 * 24 * 30 * 12)) { // less than 1 year
    published = Math.floor(diffInSeconds / (60 * 60 * 24 * 30));
    return formatPublishText(published, "month");
  } else { // less than 1 year
    published = Math.floor(diffInSeconds / (60 * 60 * 24 * 30 * 12));
    return formatPublishText(published, "year");
  }
};

export default dateCounter;
