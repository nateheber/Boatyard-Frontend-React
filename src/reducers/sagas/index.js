import { all, fork } from 'redux-saga/effects';

import AuthSaga from './auth';
import ProfileSaga from './profile';

export default function* mainSaga() {
  yield all([fork(AuthSaga), fork(ProfileSaga)]);
}
