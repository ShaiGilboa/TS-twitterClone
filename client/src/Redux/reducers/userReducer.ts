import produce from 'immer';
import { userState, reduxAction } from './types';

const initialState : userState = {
  status: 'idle', /*  -'loggind-in'
                      -'idle'
                      -'signing-in'
                      -'logged-on'
                  */
  homeFeed: null,
  profile: null,
}


const appReducer = (state: userState = initialState, action: reduxAction) : userState=> {
  switch (action.type) {
    case 'SET_HOME_FEED':
      return produce(state, draftState => {
        draftState.homeFeed = action.feed;
      });
    case 'SET_STATUS_IDLE':
      return produce(state, draftState => {
        draftState.status = 'idle';
      });
    case 'SET_USER_PROFILE':
      return produce(state, draftState => {
        draftState.profile = action.profile;
      })
    default:
      return state;
  }
}

export default appReducer;