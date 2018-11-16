import { put, takeEvery, call } from 'redux-saga/effects';

import { actions } from '../auth';

import { login, signup } from '../../api/auth';

function* loginRequest(action) {
  const { email, password } = action.payload;
  try {
    const result = yield call(login, email, password);
    const {
      email: userEmail,
      first_name,
      last_name,
      authorization_token
    } = result.data.attributes;
    yield put({
      type: actions.setAuthState,
      payload: {
        email: userEmail,
        firstName: first_name,
        lastName: last_name,
        authToken: authorization_token
      }
    });
  } catch {
    yield put;
  }
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
