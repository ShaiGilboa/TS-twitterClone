import lodash from 'lodash';
import * as express from 'express';

import { users, tweets, TweetType, MediaType, UserType } from '../data';
import { UserProfileType } from '../types/routes.helpers';
import { DenormalizedTweet } from '../types/feed';
import {
  CURRENT_USER_HANDLE,
  getUser,
  getUserProfile,
  getTweetsFroUser,
  getTweetsFromUser,
  simulateProblems,
  resolveRetweet,
  denormalizeTweet,
  getCurrentUserFromHandle,
  } from "./routes.helpers";

interface Tweets {
  [key : string] : DenormalizedTweet,
}
interface FormattedTweets {
  tweetsById : Tweets,
  tweetIds : string[],
}
const formatTweetResponse = (tweets : DenormalizedTweet[]) : FormattedTweets => {
  const tweetIds : string[] = lodash.sortBy(tweets, 'sortedTimestamp')
    .reverse()
    .map((tweet : DenormalizedTweet) : string => tweet.id)
  const tweetsById = tweets.reduce((tweetsAccumulator : Tweets, tweet : DenormalizedTweet) : Tweets=> {
    tweetsAccumulator[tweet.id] = {...tweet};
    delete tweetsAccumulator[tweet.id].sortedTimestamp;
    return tweetsAccumulator
  }, {})
  return {tweetsById, tweetIds}
}

const router = express.Router()
  .get('/api/feed/:currentUser/home-feed', (req : express.Request, res : express.Response) : void => {
    const currentUser : string = req.params.currentUser;
    console.log('currentUser', currentUser)
    const relevantTweets : DenormalizedTweet[] = getTweetsFroUser(currentUser)
    const { tweetsById, tweetIds} = formatTweetResponse(relevantTweets)
    return simulateProblems(res, {tweetsById, tweetIds})
  })

  .get('/api/feed/:currentUser/feed/:handle', (req : express.Request, res : express.Response) : express.Response => {
    const handle : string = req.params.handle;
    const currentUser : string = req.params.currentUser;
    const tweets : DenormalizedTweet[] = getTweetsFromUser(handle, currentUser);
    const { tweetsById, tweetIds} = formatTweetResponse(tweets);
    return res.status(200).json({
      tweetsById,
      tweetIds,
    });
  })

  export default router;