import lodash from 'lodash';
import * as express from 'express';
import { tweets, users, TweetType, UserType } from '../data';
import { resolveRetweet, denormalizeTweet, simulateProblems, getUserProfile } from './routes.helpers';
import { DenormalizedTweet } from '../types/feed';
import { UserProfileType } from '../types/routes.helpers';

interface retweetInfo {
  isRetweet : boolean,
  retweetOf? : string,
  reTweetFrom? : UserType,
  originalTweet? : TweetType,
}

const createTweet = (authorHandle : string, status : string, retweetInfo : retweetInfo) : TweetType => {
  const newTweetId : string = (Math.random() * 10 ** 18).toString();
  const timestamp : string = new Date().toISOString();
  
  if(retweetInfo.isRetweet) {
    const tweet : TweetType = {
      id: newTweetId,
      authorHandle,
      timestamp,
      sortedTimestamp: timestamp,
      status,
      retweetOf: retweetInfo.retweetOf,
      retweetFrom: getUserProfile(retweetInfo.originalTweet.authorHandle, authorHandle),
      likedBy: [],
      retweetedBy: [],
      media: [],
    }
    return tweet
  } else {
    const tweet : TweetType = {
      id: newTweetId,
      authorHandle,
      timestamp,
      sortedTimestamp: timestamp,
      status,
      likedBy: [],
      retweetedBy: [],
      media: [],
    }
    return tweet;
  }
}

const router = express.Router()
  .get('/api/tweet/:currentUserHandle/get/:tweetId', (req : express.Request, res : express.Response) : void => {
    const currentUserHandle : string = req.params.currentUserHandle;
    const tweetId : string = req.params.tweetId;
    const tweet : TweetType = resolveRetweet(tweets[tweetId], currentUserHandle)
    const denormalizedTweet : DenormalizedTweet = denormalizeTweet(tweet, currentUserHandle);
    simulateProblems(res, {tweet});
  })
  .post('/api/tweet', (req : express.Request, res : express.Response) : void => {
    const authorHandle : string = req.body.handle;
    const status : string = req.body.status;
    const newTweet : TweetType = createTweet(authorHandle, status, {isRetweet : false})
    tweets[newTweet.id] = newTweet;
    simulateProblems(res, {tweet : newTweet})
  })
  .put('/api/tweet/:currentUserHandle/like/:tweetId', (req : express.Request, res : express.Response) : express.Response => {
    const currentUserHandle : string = req.params.currentUserHandle;
    const tweetId : string = req.params.tweetId; 
    const like : boolean = req.body.like;
    const tweet : TweetType = tweets[tweetId];
    if(!tweet){
      return res.status(404).json({message: 'tweet not found'});
    }
    const currentlyLiked : boolean = tweet.likedBy.includes(currentUserHandle);
    if(like === currentlyLiked){
      return res.status(409).json({
        error:
        'You are not allowed to like an already-liked tweet, or unlike an already-unliked tweet.',
    });
    }
    if(like){
      tweet.likedBy.push(currentUserHandle);
    } else {
      tweet.likedBy = tweets[tweetId].likedBy.filter((handle : string) => handle!== currentUserHandle)
    }
    return res.status(209).json({success : true})
  })
  .put('/api/tweet/:currentUserHandle/retweet/:tweetId', (req : express.Request, res : express.Response) : express.Response => {
    const currentUserHandle : string = req.params.currentUserHandle;
    const tweetId : string = req.params.tweetId; 
    const retweet : boolean = req.body.retweet;
    const tweet : TweetType = tweets[tweetId];
    if(!tweet){
      return res.status(404).json({message: 'tweet not found'});
    }
    const currentlyRetweeted : boolean = tweet.likedBy.includes(currentUserHandle);
    if(retweet === currentlyRetweeted){
      return res.status(409).json({
        error:
        'You are not allowed to like an already-liked tweet, or unlike an already-unliked tweet.',
    });
    }
    if(retweet){
      tweet.retweetedBy.push(currentUserHandle);
      const retweet : TweetType = createTweet(currentUserHandle, null, {isRetweet : true, retweetOf : tweetId, reTweetFrom : tweet.author, originalTweet : tweet})
      tweets[retweet.id] = retweet;
    } else {
      tweet.retweetedBy = tweet.retweetedBy.filter((handle : string) => handle !== currentUserHandle );
      // need to delete the retweet from teh data
      const retweet : TweetType = Object.values(tweets).find((tweet : TweetType) => {
        return (tweet.authorHandle === currentUserHandle && tweet.retweetOf === tweetId)
      })
      delete tweets[retweet.id];
    }
    return res.status(209).json({success : true})
  })

export default router;
