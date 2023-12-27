const dateCounter = (dateNum: number) => {
  const date = dateNum * 1000;
  const now = new Date().getTime();
  const d = (now - date) / 1000;
  let publishText;

  const publishTextFormater = (number: number, timeRange: string) => {
    publishText = `${number} ${timeRange}${number > 1 ? "s" : ""} ago`;
  };

  // Published time = p & difference = d
  let p;
  if (d >= 60) {
    if (d >= 60 * 60) {
      if (d >= 60 * 60 * 24) {
        if (d >= 60 * 60 * 24 * 30) {
          if (d >= 60 * 60 * 24 * 30 * 12) {
            p = Math.floor(d / (60 * 60 * 24 * 30 * 12));
            publishTextFormater(p, "year");
          } else {
            p = Math.floor(d / (60 * 60 * 24 * 30));
            publishTextFormater(p, "month");
          }
        } else {
          p = Math.floor(d / (60 * 60 * 24));
          publishTextFormater(p, "day");
        }
      } else {
        p = Math.floor(d / (60 * 60));
        publishTextFormater(p, "hour");
      }
    } else {
      p = Math.floor(d / 60);
      publishTextFormater(p, "minute");
    }
  } else {
    p = Math.floor(d);
    publishTextFormater(p, "second");
  }

  return publishText;
};

export default dateCounter;
