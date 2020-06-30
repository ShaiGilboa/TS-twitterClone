export interface DenormalizedTweet {
  id: string,
  author?: UserProfileType,
  timestamp: string,
  sortedTimestamp: string,
  retweetOf? : string, //original tweet id
  retweetFrom? : UserProfileType,
  isLiked: boolean,
  numLikes: number,
  numRetweets: number,
  isRetweeted: boolean,
  status?: string,
  media?: MediaType[],
}

export interface UserProfileType {
  authorHandle: string,
  displayName: string,
  avatarSrc: string,
  bannerSrc: string,
  location: string,
  url: string,
  joined: string,
  bio: string,
  numFollowing: number,
  numFollowers: number,
  numLikes: number,
  isFollowingYou: boolean,
  isBeingFollowedByYou: boolean,
}

export interface TweetsInFeed {
  [key : string] : DenormalizedTweet,
}

export interface MediaType {
  type: string,
  url: string,
}