import { put, takeEvery, call } from 'redux-saga/effects';

import { actions } from '../auth';
import { actions as ProfileActions } from '../profile';

import { login, signup } from '../../api/auth';

function* loginRequest(action) {
  const { email, password } = action.payload;
  try {
    const result = yield call(login, email, password);
    const {
      id,
      type,
      attributes: {
        firstName,
        lastName,
        email: userEmail,
        phoneNumber,
        authorizationToken
      }
    } = result;
    yield put({
      type: actions.setAuthState,
      payload: {
        authToken: authorizationToken
      }
    });
    yield put({
      type: ProfileActions.setProfile,
      payload: {
        id,
        email: userEmail || '',
        firstName: firstName || '',
        lastName: lastName || '',
        phoneNumber: phoneNumber || '',
        type
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

function* logoutRequest(action) {
  yield call(action.payload);
}

export default function* Auth() {
  yield takeEvery(actions.login, loginRequest);
  yield takeEvery(actions.signup, signupRequest);
  yield takeEvery(actions.logout, logoutRequest);
}
