export type TrendVideoCategories =
  | "trending"
  | "gaming"
  | "music"
  | "movies"
  | "news";

type ThumbnailObjectType = {
  quality: string;
  url: string;
  width: number;
  height: number;
};

export type ImageObjectType = {
  url: string;
  width: number;
  height: number;
};

type MultiImageAttachmentType = {
  type: "multiImage";
  images: ImageObjectType[][];
};

type PollAttachmentType = {
  type: "poll";
  totalVotes: number;
  choices: {
    text: string;
    image?: ImageObjectType[];
  }[];
};

type ImageAttachmentType = {
  type: "image";
  imageThumbnails: ImageObjectType[];
};

export type CommunityPostAttachmentType =
  | ImageAttachmentType
  | MultiImageAttachmentType
  | VideoType
  | PollAttachmentType
  | SearchedPlayListType;

export type CommentType = {
  author: string;
  authorThumbnails: ThumbnailObjectType[];
  authorId: string;
  authorUrl: string;

  isEdited: boolean;
  isPinned: boolean;

  content: string;
  contentHtml: string;
  published: number;
  publishedText: string;
  likeCount: number;
  commentId: string;
  authorIsChannelOwner: boolean;
  creatorHeart?: {
    creatorThumbnail: string;
    creatorName: string;
  };
  replies?: {
    replyCount: number;
    continuation: string;
  };
};

export type CommentsType = {
  commentCount?: number;
  videoId: string;
  comments: CommentType[];
  continuation?: string;
};

export type CommunityPostCommentsType = {
  attachment: CommunityPostAttachmentType;
  author: string;
  authorIsChannelOwner: boolean;
  authorId: string;
  authorThumbnails: ImageObjectType[];
  authorUrl: string;
  commentId: string;
  content: string;
  contentHtml: string;
  isEdited: boolean;
  likeCount: number;
  published: number;
  publishedText: string;
  replyCount: number;
};

export type VideoType = {
  type: "video"; //

  title: string;
  videoId: string;

  author: string;
  authorId: string;
  authorUrl: string;
  authorVerified: boolean;

  videoThumbnails: ThumbnailObjectType[];

  description: string;
  descriptionHtml: string;

  viewCount: number;
  viewCountText: string;
  lengthSeconds: number;

  published: number;
  publishedText: string;

  premiereTimestamp: number;

  liveNow: boolean;
  premium: boolean;
  isUpcoming: boolean;
};

export type PlaylistType = {
  title: string;
  playlistId: string;

  author: string;
  authorId: string;
  authorThumbnails: ImageObjectType[];
  description: string;
  descriptionHtml: string;

  videoCount: number;
  viewCount: number;
  updated: number;

  videos: VideoType[];
};

export type DetailedVideoType = {
  title: string;
  videoId: string;
  videoThumbnails: ThumbnailObjectType[];

  description: string;
  descriptionHtml: string;
  published: number;
  publishedText: string;

  keywords: string[];
  viewCount: number;
  likeCount: number;
  dislikeCount: number;

  paid: boolean;
  premium: boolean;
  isFamilyFriendly: boolean;
  allowedRegions: string[];
  genre: string;
  genreUrl: string;

  author: string;
  authorId: string;
  authorUrl: string;
  authorThumbnails: ThumbnailObjectType[];

  subCountText: string;
  lengthSeconds: number;
  allowRatings: boolean;
  rating: number;
  isListed: boolean;
  liveNow: boolean;
  isUpcoming: boolean;
  premiereTimestamp?: number;

  hlsUrl?: string;
  adaptiveFormats: ({
    init: string;
    index: string;
    bitrate: string;
    url: string;
    itag: string;
    type: string;
    clen: string;
    lmt: string;
    projectionType: number;
  } & (
    // audio
    | {
        audioQuality: string;
        audioSampleRate: number;
        audioChannels: number;
      }
      // video
    | {
        container: string;
        encoding: string;
        fps: number;
        qualityLabel: string;
        resolution: string;
      }
  ))[];
  formatStreams: {
    url: string;
    itag: string;
    type: string;
    quality: string;
    container: string;
    encoding: string;
    qualityLabel: string;
    resolution: string;
    size: string;
  }[];
  captions: {
    label: string;
    languageCode: string;
    url: string;
  }[];
  recommendedVideos: {
    videoId: string;
    title: string;
    videoThumbnails: ThumbnailObjectType[];
    author: string;
    lengthSeconds: number;
    viewCountText: string;
  }[];
};

export type SearchedChannelType = {
  type: "channel";

  author: string;
  authorId: string;
  authorUrl: string;
  authorVerified: boolean;
  authorThumbnails: ThumbnailObjectType[];

  autoGenerated: boolean;
  channelHandle: string;
  subCount: number;
  videoCount: number;

  description: string;
  descriptionHtml: string;
};

export type SearchedPlayListType = {
  type: "playlist";

  title: string;
  playlistId: string;
  playlistThumbnail: string;

  author: string;
  authorId: string;
  authorUrl: string;
  authorVerified: boolean;

  videoCount: number;
  videos: {
    title: string;
    videoId: string;
    lengthSeconds: number;
    videoThumbnails: ThumbnailObjectType[];
  }[];
};

export type searchDataType = [
  VideoType | SearchedChannelType | SearchedPlayListType
];

export type searchSuggestionsType = {
  query: string;
  suggestions: string[];
};

export type ChannelType = {
  author: string;
  authorId: string;
  authorUrl: string;
  authorVerified: boolean;
  authorBanners: ImageObjectType[];
  authorThumbnails: ImageObjectType[];

  subCount: number;
  totalViews: number;
  joined: number;

  autoGenerated: boolean;
  isFamilyFriendly: boolean;

  description: string;
  descriptionHtml: string;
  allowedRegions: string[];

  tabs: string[];

  latestVideos: VideoType[];
  relatedChannels: SearchedChannelType[];
};

export type CommunityPostType = {
  authorId: string;
  comments: CommunityPostCommentsType[];
};

export type ChannelVideosType = {
  videos: VideoType[];
  continuation: string;
};

export type ChannelPlaylistsType = {
  playlists: SearchedPlayListType[];
  continuation: string;
};
