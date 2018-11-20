import { combineReducers } from 'redux';

import navigation from './navigation';
import auth from './auth';
import profile from './profile';

const rootReducer = combineReducers({
  navigation,
  auth,
  profile
});

export default rootReducer;
