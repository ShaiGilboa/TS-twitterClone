"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
const data_1 = require("../data");
const routes_helpers_1 = require("./routes.helpers");
const createTweet = (authorHandle, status, retweetInfo) => {
    const newTweetId = (Math.random() * Math.pow(10, 18)).toString();
    const timestamp = new Date().toISOString();
    if (retweetInfo.isRetweet) {
        const tweet = {
            id: newTweetId,
            authorHandle,
            timestamp,
            sortedTimestamp: timestamp,
            status,
            retweetOf: retweetInfo.retweetOf,
            retweetFrom: routes_helpers_1.getUserProfile(retweetInfo.originalTweet.authorHandle, authorHandle),
            likedBy: [],
            retweetedBy: [],
            media: [],
        };
        return tweet;
    }
    else {
        const tweet = {
            id: newTweetId,
            authorHandle,
            timestamp,
            sortedTimestamp: timestamp,
            status,
            likedBy: [],
            retweetedBy: [],
            media: [],
        };
        return tweet;
    }
};
const router = express.Router()
    .get('/api/tweet/:currentUserHandle/get/:tweetId', (req, res) => {
    const currentUserHandle = req.params.currentUserHandle;
    const tweetId = req.params.tweetId;
    const tweet = routes_helpers_1.resolveRetweet(data_1.tweets[tweetId], currentUserHandle);
    const denormalizedTweet = routes_helpers_1.denormalizeTweet(tweet, currentUserHandle);
    return routes_helpers_1.simulateProblems(res, { tweet });
})
    .post('/api/tweet', (req, res) => {
    const authorHandle = req.body.handle;
    const status = req.body.status;
    const newTweet = createTweet(authorHandle, status, { isRetweet: false });
    data_1.tweets[newTweet.id] = newTweet;
    return routes_helpers_1.simulateProblems(res, { tweet: newTweet });
})
    .put('/api/tweet/:currentUserHandle/like/:tweetId', (req, res) => {
    const currentUserHandle = req.params.currentUserHandle;
    const tweetId = req.params.tweetId;
    const like = req.body.like;
    const tweet = data_1.tweets[tweetId];
    if (!tweet) {
        return res.status(404).json({ message: 'tweet not found' });
    }
    const currentlyLiked = tweet.likedBy.includes(currentUserHandle);
    if (like === currentlyLiked) {
        return res.status(409).json({
            error: 'You are not allowed to like an already-liked tweet, or unlike an already-unliked tweet.',
        });
    }
    if (like) {
        tweet.likedBy.push(currentUserHandle);
    }
    else {
        tweet.likedBy = data_1.tweets[tweetId].likedBy.filter((handle) => handle !== currentUserHandle);
    }
    return res.status(209).json({ success: true });
})
    .put('/api/tweet/:currentUserHandle/retweet/:tweetId', (req, res) => {
    const currentUserHandle = req.params.currentUserHandle;
    const tweetId = req.params.tweetId;
    const retweet = req.body.retweet;
    const tweet = data_1.tweets[tweetId];
    if (!tweet) {
        return res.status(404).json({ message: 'tweet not found' });
    }
    const currentlyRetweeted = tweet.likedBy.includes(currentUserHandle);
    if (retweet === currentlyRetweeted) {
        return res.status(409).json({
            error: 'You are not allowed to like an already-liked tweet, or unlike an already-unliked tweet.',
        });
    }
    if (retweet) {
        tweet.retweetedBy.push(currentUserHandle);
        const retweet = createTweet(currentUserHandle, null, { isRetweet: true, retweetOf: tweetId, reTweetFrom: tweet.author, originalTweet: tweet });
        data_1.tweets[retweet.id] = retweet;
    }
    else {
        tweet.retweetedBy = tweet.retweetedBy.filter((handle) => handle !== currentUserHandle);
        // need to delete the retweet from teh data
        const retweet = Object.values(data_1.tweets).find((tweet) => {
            return (tweet.authorHandle === currentUserHandle && tweet.retweetOf === tweetId);
        });
        delete data_1.tweets[retweet.id];
    }
    return res.status(209).json({ success: true });
});
exports.default = router;
//# sourceMappingURL=tweet.js.map