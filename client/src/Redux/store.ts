import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './reducers';
import { userState } from './reducers/types';

const configureStore = () => {
  const store = createStore(
    rootReducer,
    composeWithDevTools(),
  )
  return store;
};

export type RootState = ReturnType<typeof rootReducer>;

export interface State {
  user : userState,
}

export default configureStore