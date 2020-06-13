import { users, tweets, UserType, TweetType } from '../data';
import { Response } from 'express';
import { setTimeout } from 'timers';
import { DenormalizedTweet } from '../types/feed';
import { Duplex } from 'stream';
import { UserProfileType } from '../types/routes.helpers';

interface VoidFunction {(): void;}

// HARDCODED CURRENT USER. for now....
export const CURRENT_USER_HANDLE : string = 'treasurymog';
const MAX_DELAY : number = 2000;
const FAILURE_ODDS : number = 0.000000000001;
// const FAILURE_ODDS : number = 0.2;

export const getCurrentUserFromHandle = (handle : string) : UserType => {
  return users[handle];
} 

const transformUserToProfile = (user : UserType, currentUser : UserType) : UserProfileType => {
  const userProfile : UserProfileType = {
    authorHandle : user.handle,
    displayName : user.displayName,
    avatarSrc : user.avatarSrc,
    bannerSrc : user.bannerSrc,
    location : user.location,
    url : user.url,
    joined : user.joined,
    bio : user.bio,
    numFollowing : user.followingIds.length,
    numFollowers : user.followerIds.length,
    numLikes : user.likeIds.length,
    isFollowingYou : user.followingIds.includes(currentUser.handle),
    isBeingFollowedByYou : currentUser.followingIds.includes(user.handle),
  };

  return userProfile;
}

export const simulateProblems = (res: Response, data: object) : Response => {
  const delay : number = Math.random() * MAX_DELAY;
  setTimeout (() => {
    const shouldError : boolean = Math.random() <= FAILURE_ODDS;

    if(shouldError) {
      return res.status(500).json({message : 'server error'});
    }

    return res.status(200).json(data);
  }, delay);
  return res.status(200).json(data)
}

export const getUser = (handle : string) : UserType => {
  return users[handle.toLowerCase()];
}

export const getUserProfile = (handle : string, currentUserHandle : string) : UserProfileType => {
  const user : UserType = getUser(handle);
  if(!user){
    throw new Error('user-not-found');
  }
  // might be an issue when current user is the profile
  const currentUser : UserType = getCurrentUserFromHandle(currentUserHandle);
  const userProfile : UserProfileType = transformUserToProfile(user, currentUser); 

  return userProfile;
}

export const resolveRetweet = (tweet : TweetType, currentUserHandle : string) : TweetType => {
  if(!tweet.retweetOf)return tweet;
  const originalTweet : TweetType = tweet[tweet.retweetOf];
  return {
    ...originalTweet,
    id: tweet.id,
    retweetFrom: getUserProfile(tweet.authorHandle, currentUserHandle),
    sortedTimestamp: tweet.timestamp,
    likedBy: tweet.likedBy,
    retweetedBy: tweet.retweetedBy,
  }
}

export const denormalizeTweet = (tweet : TweetType, currentUserHandle : string) : DenormalizedTweet => {
  if(tweet.retweetFrom){
    const tweetCopy : DenormalizedTweet = {
      id: tweet.id,
      author: getUserProfile(tweet.retweetFrom.authorHandle, currentUserHandle),
      timestamp: tweet.timestamp,
      sortedTimestamp: tweet.sortedTimestamp,
      retweetOf : tweet.retweetOf, //original tweet id
      retweetFrom : tweet.retweetFrom,
      isLiked: tweet.likedBy.includes(currentUserHandle),
      numLikes: tweet.likedBy.length,
      numRetweets: tweet.retweetedBy.length,
      isRetweeted: tweet.retweetedBy.includes(currentUserHandle),
      status: tweet.status,
      media: tweet.media,
    }
    return tweetCopy;
  } else {
    const tweetCopy : DenormalizedTweet = {
      id: tweet.id,
      author: getUserProfile(tweet.authorHandle, currentUserHandle),
      timestamp: tweet.timestamp,
      sortedTimestamp: tweet.sortedTimestamp,
      retweetOf : tweet.retweetOf, //original tweet id
      retweetFrom : tweet.retweetFrom,
      isLiked: tweet.likedBy.includes(currentUserHandle),
      numLikes: tweet.likedBy.length,
      numRetweets: tweet.retweetedBy.length,
      isRetweeted: tweet.retweetedBy.includes(currentUserHandle),
      status: tweet.status,
      media: tweet.media,
    }
    return tweetCopy;
  }
}

export const getTweetsFromUser = (userId : string, currentUserHandle : string) : DenormalizedTweet[] => {
  return Object.values(tweets)
    .filter(tweet => tweet.authorHandle.toLowerCase() === userId.toLowerCase())
    .map((tweet : TweetType) => resolveRetweet(tweet, currentUserHandle))
    .map((tweet : TweetType) : DenormalizedTweet => denormalizeTweet(tweet, currentUserHandle));
}

export const duplicateTweetReducer = (tweetsAcc : TweetType[], tweet : TweetType, index : number, allTweets : TweetType[]) : TweetType[] => {
  // If the user is following Profile A and Profile B, and Profile B
  // retweets the tweet of Profile A, we only want to show whichever
  // copy is newest, not both.
  for (let i : number = 0; i < index; i++) {
    let iteratedTweet : TweetType = allTweets[i];
    if (
      iteratedTweet.id === tweet.retweetOf ||
      tweet.id === iteratedTweet.retweetOf
    ) {
      return tweetsAcc;
    }
  }

  return [...tweetsAcc, tweet];
}

export const getTweetsFroUser = (currentUserHandle : string) : DenormalizedTweet[] => {
  const user : UserType = users[currentUserHandle];

  return Object.values(tweets)
    .filter(
      tweet =>
        user.followingIds.includes(tweet.authorHandle.toLowerCase()) ||
        tweet.authorHandle.toLowerCase() === currentUserHandle.toLowerCase()
    )
    .reduce(duplicateTweetReducer, [])
    .map((tweet : TweetType) => resolveRetweet(tweet, currentUserHandle))
    .map((tweet : TweetType) : DenormalizedTweet => denormalizeTweet(tweet, currentUserHandle));
}