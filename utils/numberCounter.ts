const numberCounter = (viewCount: number) => {
  // Views = v
  let v;
  if (viewCount < 1000) { // less than 1k
    v = viewCount.toFixed();
  } else if (viewCount < 1000000) { // less than 1M
    v = (viewCount / 1000).toFixed() + "K";
  } else if (viewCount < 1000000000) { // less than 1B
    let viewsLessThan10M = viewCount < 10000000 ? 1 : 0;
    v = (viewCount / 1000000).toFixed(viewsLessThan10M ? 1 : 0) + "M";
  } else { // More than 1B
    let viewsLessThan10B = viewCount < 1000000000 ? 1 : 0;
    v = (viewCount / 1000000000).toFixed(viewsLessThan10B ? 1 : 0) + "B";
  }

  return v;
};

export default numberCounter;
