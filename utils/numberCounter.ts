const numberCounter = (viewCount: number) => {
  // Views = v
  let v;
  if (viewCount >= 1000) {
    if (viewCount >= 1000000) {
      if (viewCount >= 1000000000) {
        // Billiard
        if (viewCount >= 10000000000) {
          // v >= 10B
          v = (viewCount / 1000000000).toFixed() + "B";
        } else {
          v = (viewCount / 1000000000).toFixed(1) + "B";
        }
      } else {
        // Million
        if (viewCount >= 10000000) {
          // v >= 10M
          v = (viewCount / 1000000).toFixed() + "M";
        } else {
          v = (viewCount / 1000000).toFixed(1) + "M";
        }
      }
    } else {
      v = (viewCount / 1000).toFixed() + "K";
    }
  } else {
    v = viewCount.toFixed();
  }

  return v;
};

export default numberCounter;
