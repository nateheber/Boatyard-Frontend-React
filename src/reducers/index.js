import { combineReducers } from 'redux';

import navigation from './navigation';
import auth from './auth';
import profile from './profile';
import provider from './providers';
import service from './services';
import category from './categories';
import user from './users';
import management from './management';
import appstate from './appstate';
import order from './orders';
import lineItem from './lineItems';
import boat from './boats';
import payment from './payments';

const rootReducer = combineReducers({
  navigation,
  auth,
  profile,
  provider,
  service,
  category,
  user,
  management,
  appstate,
  order,
  lineItem,
  boat,
  payment
});

export default rootReducer;
