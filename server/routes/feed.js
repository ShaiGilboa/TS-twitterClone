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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
const express = __importStar(require("express"));
const routes_helpers_1 = require("./routes.helpers");
const formatTweetResponse = (tweets) => {
    const tweetIds = lodash_1.default.sortBy(tweets, 'sortedTimestamp')
        .reverse()
        .map((tweet) => tweet.id);
    const tweetsById = tweets.reduce((tweetsAccumulator, tweet) => {
        tweetsAccumulator[tweet.id] = Object.assign({}, tweet);
        delete tweetsAccumulator[tweet.id].sortedTimestamp;
        return tweetsAccumulator;
    }, {});
    return { tweetsById, tweetIds };
};
const router = express.Router()
    .get('/api/feed/:currentUser/home-feed', (req, res) => {
    const currentUser = req.params.currentUser;
    const relevantTweets = routes_helpers_1.getTweetsFroUser(currentUser);
    const { tweetsById, tweetIds } = formatTweetResponse(relevantTweets);
    return routes_helpers_1.simulateProblems(res, { tweetsById, tweetIds });
})
    .get('/api/feed/:currentUser/feed/:handle', (req, res) => {
    const handle = req.params.handle;
    const currentUser = req.params.currentUser;
    const tweets = routes_helpers_1.getTweetsFromUser(handle, currentUser);
    const { tweetsById, tweetIds } = formatTweetResponse(tweets);
    return res.status(200).json({
        tweetsById,
        tweetIds,
    });
});
exports.default = router;
//# sourceMappingURL=feed.js.map