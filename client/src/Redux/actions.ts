import HomeFeed from '../pages/HomeFeed/HomeFeed';
import { userHomeFeed, SetUserHomeFeedAction } from './reducers/types';

export function setUserHomeFeed( feed : userHomeFeed) : SetUserHomeFeedAction {
  return {
    type: 'SET_HOME_FEED',
    feed
  }
}