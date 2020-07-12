import HomeFeed from '../pages/HomeFeed/HomeFeed';
import { userHomeFeed, SetUserHomeFeedAction, UserProfileType, SetUserProfileAction } from './reducers/types';

export function setUserHomeFeed( feed : userHomeFeed) : SetUserHomeFeedAction {
  return {
    type: 'SET_HOME_FEED',
    feed
  }
}

export function setUserProfile( profile : UserProfileType) : SetUserProfileAction {
  return {
    type: 'SET_USER_PROFILE',
    profile
  }
}