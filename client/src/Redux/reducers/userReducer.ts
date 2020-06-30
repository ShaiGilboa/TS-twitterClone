import produce from 'immer';
import { userState, reduxAction } from './types';

const initialState = {
  status: 'idle', /*  -'loggind-in'
                      -'idle'
                      -'signing-in'
                      -'logged-on'
                  */
  homeFeed: null,

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
  
    default:
      return state;
  }
}

export default appReducer;