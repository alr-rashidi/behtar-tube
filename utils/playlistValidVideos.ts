type PropsType = {
  title: string;
  [key: string]: any
}[]
function playlistValidVideos(videos: PropsType) {
  const validVideos = videos.filter(
    (video) => video.title != "[Private video]"
  );
  return validVideos;
}

export default playlistValidVideos;
