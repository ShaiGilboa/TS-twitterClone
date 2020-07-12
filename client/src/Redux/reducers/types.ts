import { TweetsInFeed } from "../../types/tweets";
import HomeFeed from '../../pages/HomeFeed/HomeFeed';

export interface userState {
  status : string,
  homeFeed : userHomeFeed | null,
  profile : UserProfileType | null,
}

export interface reduxAction {
  type : string,
  [key : string] : any,
}

export interface userHomeFeed {
  tweetIds : string[],
  tweetsById : TweetsInFeed
}

export interface SetUserHomeFeedAction {
  type : string,
  feed : userHomeFeed
}

export interface SetUserProfileAction {
  type : string,
  profile : UserProfileType
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
