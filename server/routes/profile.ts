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

export const router = express.Router()
  .get('/api/:currentUser/profile', (req : express.Request, res : express.Response) => {
    const currentUser : string = req.params.currentUser;
    const profile : UserProfileType = getUserProfile(currentUser, currentUser);

    return simulateProblems(res, {profile});
  })

  .get('/api/:currentUser/profile/:handle', (req : express.Request, res : express.Response) => {
    const currentUser : string = req.params.currentUser;
    const handle : string = req.params.handle;
    try {
      const profile : UserProfileType = getUserProfile(handle, currentUser);
      return simulateProblems(res, {profile})
    } catch (err) {
      if(err.message === 'user-not-found') {
        return res.status(400).json({error: 'user-not-found'})
      }
    }
  }
  )
  .get('/api/:currentUser/following/:handle', (req : express.Request, res : express.Response) => {
    const handle : string = req.params.handle;
    const currentUser : string = req.params.currentUser;
    const user : UserType = getUser(handle);
    const following : UserProfileType[] = user.followingIds.map((followingHandle : string) => getUserProfile(followingHandle, currentUser))
    return res.status(200).json({following})
  })
  .get('/api/:currentUser/followers/handle', (req : express.Request, res : express.Response) => {
    const handle : string = req.params.handle;
    const currentUser : string = req.params.currentUser;
    const user : UserType = getUser(handle);
    const followers : UserProfileType[] = user.followerIds.map((followerHandle : string) => getUserProfile(followerHandle, currentUser))
    return res.status(200).json({followers})
  })
  .put('/api/:currentUser/follow/:handle', (req : express.Request, res : express.Response) => {
    const handle : string = req.params.handle;
    const currentUserHandle : string = req.params.currentUser;
    const user : UserType = getUser(handle);
    const currentUser : UserType = getUser(currentUserHandle);
    if(user.followerIds.includes(currentUserHandle)){
      return res.status(409).json({
        error : 'You are already following this user'
      })
    }else {
      user.followerIds.push(currentUserHandle);
      currentUser.followingIds.push(handle)
      return res.status(209).json({success : true})
    }
  })
  .put('/api/:currentUser/unfollow/:handle', (req : express.Request, res : express.Response) => {
    const handle : string = req.params.handle;
    const currentUserHandle : string = req.params.currentUser;
    const user : UserType = getUser(handle);
    const currentUser : UserType = getUser(currentUserHandle);
    if(!user.followerIds.includes(currentUserHandle)){
      return res.status(409).json({
        error: 'You do not follow the user you are trying to follow'
      })
    } else {
      const followersHandleIndex : number = user.followerIds.indexOf(currentUserHandle);
      user.followerIds.splice(followersHandleIndex, 1);
      const followingHandleIndex : number = currentUser.followingIds.indexOf(handle);
      currentUser.followingIds.splice(followingHandleIndex, 1);
      return res.status(209).json({success: true})
    }
  })

