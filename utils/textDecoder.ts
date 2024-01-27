const localTextDecoder = (txt: string) => {
  var decodedString = txt.replace(/&#(\d+);/g, function(match, dec) {
    return String.fromCharCode(dec);
  });
  return decodedString;
};

export default localTextDecoder;
