import { all, fork } from 'redux-saga/effects';

import AuthSaga from './auth';

export default function* mainSaga() {
  yield all([fork(AuthSaga)]);
}
