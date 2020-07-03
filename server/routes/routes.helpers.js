"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTweetsFroUser = exports.duplicateTweetReducer = exports.getTweetsFromUser = exports.denormalizeTweet = exports.resolveRetweet = exports.getUserProfile = exports.getUser = exports.simulateProblems = exports.getCurrentUserFromHandle = exports.CURRENT_USER_HANDLE = void 0;
const data_1 = require("../data");
const timers_1 = require("timers");
// HARDCODED CURRENT USER. for now....
exports.CURRENT_USER_HANDLE = 'treasurymog';
const MAX_DELAY = 2;
const FAILURE_ODDS = 0.000000000001;
// const FAILURE_ODDS : number = 0.2;
exports.getCurrentUserFromHandle = (handle) => {
    return data_1.users[handle];
};
const transformUserToProfile = (user, currentUser) => {
    const userProfile = {
        authorHandle: user.handle,
        displayName: user.displayName,
        avatarSrc: user.avatarSrc,
        bannerSrc: user.bannerSrc,
        location: user.location,
        url: user.url,
        joined: user.joined,
        bio: user.bio,
        numFollowing: user.followingIds.length,
        numFollowers: user.followerIds.length,
        numLikes: user.likeIds.length,
        isFollowingYou: user.followingIds.includes(currentUser.handle),
        isBeingFollowedByYou: currentUser.followingIds.includes(user.handle),
    };
    return userProfile;
};
exports.simulateProblems = (res, data) => {
    const delay = Math.random() * MAX_DELAY;
    timers_1.setTimeout(() => {
        const shouldError = Math.random() <= FAILURE_ODDS;
        if (shouldError) {
            return res.status(500).json({ message: 'server error' });
        }
        res.status(200).json(data);
    }, delay);
    // res.status(200).json(data)
};
exports.getUser = (handle) => {
    return data_1.users[handle.toLowerCase()];
};
exports.getUserProfile = (handle, currentUserHandle) => {
    const user = exports.getUser(handle);
    if (!user) {
        throw new Error('user-not-found');
    }
    // might be an issue when current user is the profile
    const currentUser = exports.getCurrentUserFromHandle(currentUserHandle);
    const userProfile = transformUserToProfile(user, currentUser);
    return userProfile;
};
exports.resolveRetweet = (tweet, currentUserHandle) => {
    if (!tweet.retweetOf)
        return tweet;
    const originalTweet = data_1.tweets[tweet.retweetOf];
    return Object.assign(Object.assign({}, originalTweet), { id: tweet.id, retweetFrom: exports.getUserProfile(tweet.authorHandle, currentUserHandle), retweetOf: tweet.retweetOf, sortedTimestamp: tweet.timestamp, likedBy: tweet.likedBy, retweetedBy: tweet.retweetedBy });
};
exports.denormalizeTweet = (tweet, currentUserHandle) => {
    if (tweet.retweetFrom) {
        const tweetCopy = {
            id: tweet.id,
            author: exports.getUserProfile(tweet.retweetFrom.authorHandle, currentUserHandle),
            timestamp: tweet.timestamp,
            sortedTimestamp: tweet.sortedTimestamp,
            retweetOf: tweet.retweetOf,
            retweetFrom: tweet.retweetFrom,
            isLiked: tweet.likedBy.includes(currentUserHandle),
            numLikes: tweet.likedBy.length,
            numRetweets: tweet.retweetedBy.length,
            isRetweeted: tweet.retweetedBy.includes(currentUserHandle),
            status: tweet.status,
            media: tweet.media,
        };
        return tweetCopy;
    }
    else {
        const tweetCopy = {
            id: tweet.id,
            author: exports.getUserProfile(tweet.authorHandle, currentUserHandle),
            timestamp: tweet.timestamp,
            sortedTimestamp: tweet.sortedTimestamp,
            retweetOf: tweet.retweetOf,
            retweetFrom: tweet.retweetFrom,
            isLiked: tweet.likedBy.includes(currentUserHandle),
            numLikes: tweet.likedBy.length,
            numRetweets: tweet.retweetedBy.length,
            isRetweeted: tweet.retweetedBy.includes(currentUserHandle),
            status: tweet.status,
            media: tweet.media,
        };
        return tweetCopy;
    }
};
exports.getTweetsFromUser = (userId, currentUserHandle) => {
    return Object.values(data_1.tweets)
        .filter(tweet => tweet.authorHandle.toLowerCase() === userId.toLowerCase())
        .map((tweet) => exports.resolveRetweet(tweet, currentUserHandle))
        .map((tweet) => exports.denormalizeTweet(tweet, currentUserHandle));
};
exports.duplicateTweetReducer = (tweetsAcc, tweet, index, allTweets) => {
    // If the user is following Profile A and Profile B, and Profile B
    // retweets the tweet of Profile A, we only want to show whichever
    // copy is newest, not both.
    for (let i = 0; i < index; i++) {
        let iteratedTweet = allTweets[i];
        if (iteratedTweet.id === tweet.retweetOf ||
            tweet.id === iteratedTweet.retweetOf) {
            return tweetsAcc;
        }
    }
    return [...tweetsAcc, tweet];
};
exports.getTweetsFroUser = (currentUserHandle) => {
    const user = data_1.users[currentUserHandle];
    return Object.values(data_1.tweets)
        .filter(tweet => user.followingIds.includes(tweet.authorHandle.toLowerCase()) ||
        tweet.authorHandle.toLowerCase() === currentUserHandle.toLowerCase())
        .reduce(exports.duplicateTweetReducer, [])
        .map((tweet) => exports.resolveRetweet(tweet, currentUserHandle))
        .map((tweet) => exports.denormalizeTweet(tweet, currentUserHandle));
};
//# sourceMappingURL=routes.helpers.js.map