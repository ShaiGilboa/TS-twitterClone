"use strict";
exports.__esModule = true;
exports.getUserProfile = exports.getUser = exports.simulateProblems = exports.getCurrentUserFromHandle = void 0;
var data_1 = require("../data");
var timers_1 = require("timers");
// HARDCODED CURRENT USER. for now....
var CURRENT_USER_HANDLE = 'treasurymog';
var MAX_DELAY = 2000;
var FAILURE_ODDS = 0.000000000001;
// const FAILURE_ODDS : number = 0.2;
exports.getCurrentUserFromHandle = function (handle) {
    return data_1.users[handle];
};
var transformUserToProfile = function (user, currentUser) {
    var userProfile = {
        handle: user.handle,
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
        isBeingFollowedByYou: currentUser.followingIds.includes(user.handle)
    };
    userProfile.handle = user.handle;
    userProfile.displayName = user.displayName;
    userProfile.avatarSrc = user.avatarSrc;
    userProfile.bannerSrc = user.bannerSrc;
    userProfile.location = user.location;
    userProfile.url = user.url;
    userProfile.joined = user.joined;
    userProfile.bio = user.bio;
    userProfile.numFollowing = user.followingIds.length;
    userProfile.numFollowers = user.followerIds.length;
    userProfile.numLikes = user.likeIds.length;
    userProfile.isFollowingYou = user.followingIds.includes(currentUser.handle);
    userProfile.isBeingFollowedByYou = currentUser.followingIds.includes(user.handle);
    return userProfile;
};
exports.simulateProblems = function (res, data) {
    var delay = Math.random() * MAX_DELAY;
    timers_1.setTimeout(function () {
        var shouldError = Math.random() <= FAILURE_ODDS;
        if (shouldError) {
            res.sendStatus(500);
            return;
        }
        res.json(data);
    }, delay);
    res.json(data);
};
exports.getUser = function (handle) {
    return data_1.users[handle.toLowerCase()];
};
exports.getUserProfile = function (handle) {
    var user = exports.getUser(handle);
    if (!user) {
        throw new Error('user-not-found');
    }
    var currentUser = exports.getCurrentUserFromHandle(CURRENT_USER_HANDLE);
    var userProfile = transformUserToProfile(user, currentUser);
    return userProfile;
};
