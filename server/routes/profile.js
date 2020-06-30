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
const routes_helpers_1 = require("./routes.helpers");
const router = express.Router()
    .get('/api/profile/:currentUser/get', (req, res) => {
    const currentUser = req.params.currentUser;
    const profile = routes_helpers_1.getUserProfile(currentUser, currentUser);
    routes_helpers_1.simulateProblems(res, { profile });
})
    .get('/api/profile/:currentUser/other/:handle', (req, res) => {
    const currentUser = req.params.currentUser;
    const handle = req.params.handle;
    try {
        const profile = routes_helpers_1.getUserProfile(handle, currentUser);
        routes_helpers_1.simulateProblems(res, { profile });
    }
    catch (err) {
        if (err.message === 'user-not-found') {
            res.status(400).json({ error: 'user-not-found' });
        }
    }
})
    .get('/api/profile/:currentUser/following/:handle', (req, res) => {
    const handle = req.params.handle;
    const currentUser = req.params.currentUser;
    const user = routes_helpers_1.getUser(handle);
    const following = user.followingIds.map((followingHandle) => routes_helpers_1.getUserProfile(followingHandle, currentUser));
    return res.status(200).json({ following });
})
    .get('/api/profile/:currentUser/followers/handle', (req, res) => {
    const handle = req.params.handle;
    const currentUser = req.params.currentUser;
    const user = routes_helpers_1.getUser(handle);
    const followers = user.followerIds.map((followerHandle) => routes_helpers_1.getUserProfile(followerHandle, currentUser));
    return res.status(200).json({ followers });
})
    .put('/api/profile/:currentUser/follow/:handle', (req, res) => {
    const handle = req.params.handle;
    const currentUserHandle = req.params.currentUser;
    const user = routes_helpers_1.getUser(handle);
    const currentUser = routes_helpers_1.getUser(currentUserHandle);
    if (user.followerIds.includes(currentUserHandle)) {
        return res.status(409).json({
            error: 'You are already following this user'
        });
    }
    else {
        user.followerIds.push(currentUserHandle);
        currentUser.followingIds.push(handle);
        return res.status(209).json({ success: true });
    }
})
    .put('/api/profile/:currentUser/unfollow/:handle', (req, res) => {
    const handle = req.params.handle;
    const currentUserHandle = req.params.currentUser;
    const user = routes_helpers_1.getUser(handle);
    const currentUser = routes_helpers_1.getUser(currentUserHandle);
    if (!user.followerIds.includes(currentUserHandle)) {
        return res.status(409).json({
            error: 'You do not follow the user you are trying to follow'
        });
    }
    else {
        const followersHandleIndex = user.followerIds.indexOf(currentUserHandle);
        user.followerIds.splice(followersHandleIndex, 1);
        const followingHandleIndex = currentUser.followingIds.indexOf(handle);
        currentUser.followingIds.splice(followingHandleIndex, 1);
        return res.status(209).json({ success: true });
    }
});
exports.default = router;
//# sourceMappingURL=profile.js.map