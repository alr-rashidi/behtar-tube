const ProfilePictureHttpsSolver = (url: string) => {
  let newUrl = url.startsWith("http") ? url : "https:" + url;

  return newUrl;
};

export default ProfilePictureHttpsSolver;