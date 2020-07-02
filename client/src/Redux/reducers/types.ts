import { TweetsInFeed } from "../../types/tweets";
import HomeFeed from '../../pages/HomeFeed/HomeFeed';

export interface userState {
  status : string,
  homeFeed : userHomeFeed | null,
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

