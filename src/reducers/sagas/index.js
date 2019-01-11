import { all, fork } from 'redux-saga/effects';

import AuthSaga from './auth';
import ProfileSaga from './profile';
import ProviderSaga from './providers';
import ServicesSaga from './services';
import UsersSaga from './users';
import ManagementSaga from './managements';
import CategorySaga from './categories';
import OrderSaga from './orders';
import LineItemSaga from './lineItems';
import BoatSaga from './boats';

export default function* mainSaga() {
  yield all([
    fork(AuthSaga),
    fork(ProfileSaga),
    fork(ProviderSaga),
    fork(ServicesSaga),
    fork(UsersSaga),
    fork(ManagementSaga),
    fork(CategorySaga),
    fork(OrderSaga),
    fork(LineItemSaga),
    fork(BoatSaga),
  ]);
}
