import { combineReducers } from 'redux';

import navigation from './navigation';
import auth from './auth';
import profile from './profile';
import provider from './providers';
import service from './services';
import category from './categories';
import user from './users';
import management from './management';

const rootReducer = combineReducers({
  navigation,
  auth,
  profile,
  provider,
  service,
  category,
  user,
  management
});

export default rootReducer;
