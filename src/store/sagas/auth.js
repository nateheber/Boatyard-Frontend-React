import { put, takeEvery, call } from 'redux-saga/effects';
import { isEmpty } from 'lodash';

import { actions } from '../reducers/auth';
import { actions as ProfileActions } from '../reducers/profile';
import { actions as ProviderActions } from '../reducers/providers';

import { login, signup } from '../../api/auth';

import { customApiClient } from '../../api';

const escalationClient = customApiClient('basic');

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
        authToken: authorizationToken,
        errorMessage: '',
        loading: false
      }
    });
    yield put({
      type: actions.getUserPermission
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
  } catch (err) {
    yield put({
      type: actions.setAuthState,
      payload: {
        authToken: '',
        errorMessage: 'Invalid username or password',
        loading: false
      }
    });
  }
}

function* userPermissionRequest() {
  const result = yield call(escalationClient.post, '/users/escalations', {
    escalation: { admin: true }
  });
  if (!isEmpty(result)) {
    yield put({
      type: actions.setAdminToken,
      payload: result.data.attributes.authorizationToken
    });
    yield put({
      type: actions.setPrivilege,
      payload: 'admin'
    });
  } else {
    yield put({
      type: ProviderActions.selectProvider
    });
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
  yield takeEvery(actions.getUserPermission, userPermissionRequest);
}
