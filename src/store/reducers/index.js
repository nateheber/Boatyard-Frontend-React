import { combineReducers } from 'redux';
import { reducer as toastrReducer } from 'react-redux-toastr';

import navigation from './navigation';
import auth from './auth';
import profile from './profile';
import provider from './providers';
import service from './services';
import category from './categories';
import user from './users';
import management from './managements';
import order from './orders';
import lineItem from './lineItems';
import boat from './boats';
import payment from './payments';
import creditCard from './credit-cards';
import providerLocation from './providerLocations';
import childAccount from './child-accounts';
import paymentGateway from './paymentGateway';
import icon from './icons';
import network from './networks';
import conversation from './conversations';
import siteBanner from './site-banners';
import quickReply from './quickReplies';
import messageTemplate from './messageTemplates';
import notifications from './notifications';
import workorders from './workorders';
import contractors from './contractors';

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
  childAccount,
  paymentGateway,
  icon,
  network,
  conversation,
  siteBanner,
  quickReply,
  messageTemplate,
  notifications,
  workorders,
  contractors,
});

export default rootReducer;
