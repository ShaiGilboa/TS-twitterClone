import {MediaType, UserType} from '../data';
import { UserProfileType } from './routes.helpers';

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