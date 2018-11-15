import { put, takeEvery, call } from 'redux-saga/effects';

import { actions } from '../auth';

import { login, signup } from '../../api/auth';

function* loginRequest(action) {
  const { email, password } = action.payload;
  const result = yield call(login, email, password);
  console.log(result);
}

function* signupRequest(action) {
  const { email, password } = action.payload;
  const result = yield call(signup, email, password);
  console.log(result);
}

export default function* Auth() {
  yield takeEvery(actions.login, loginRequest);
  yield takeEvery(actions.signup, signupRequest);
}
