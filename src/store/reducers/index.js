import { combineReducers } from 'redux';
import { reducer as toastrReducer } from 'react-redux-toastr'

import navigation from './navigation';
import auth from './auth';
import profile from './profile';
import provider from './providers';
import service from './services';
import category from './categories';
import user from './users';
import management from './management';
import order from './orders';
import lineItem from './lineItems';
import boat from './boats';
import payment from './payments';
import creditCard from './credit-cards';
import providerLocation from './providerLocations';
import providerLocationService from './providerLocationServices';
import childAccount from './child-accounts';
import icon from './icons';

const rootReducer = combineReducers({
  navigation,
  auth,
  profile,
  provider,
  service,
  category,
  user,
  management,
  order,
  lineItem,
  boat,
  payment,
  creditCard,
  toastr: toastrReducer,
  providerLocation,
  providerLocationService,
  childAccount,
  icon
});

export default rootReducer;
