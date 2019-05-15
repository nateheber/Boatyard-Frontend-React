import { put, takeEvery, call } from 'redux-saga/effects';
import { isEmpty } from 'lodash';

import { actionTypes } from '../actions/auth';
import { actions as ProfileActions } from '../reducers/profile';
import { actionTypes as ProviderActions } from '../actions/providers';

import { login, signup } from '../../api/auth';

import { customApiClient } from '../../api';

const escalationClient = customApiClient('basic');

function* loginRequest(action) {
  const { params, success, error } = action.payload;
  const { email, password } = params;
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
    } = result.data;
    yield put({
      type: actionTypes.AUTH_LOGIN_SUCCESS,
      payload: authorizationToken
    });
    yield put({
      type: actionTypes.GET_USER_PERMISSION
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
    if (success) {
      yield call(success);
    }
  } catch (e) {
    yield put({
      type: actionTypes.AUTH_LOGIN_FAILURE,
      payload: e
    });
    if (error) {
      yield call(error, e);
    }
  }
}

function* userPermissionRequest(action) {
  try {
    const result = yield call(escalationClient.post, '/users/escalations', {
      escalation: { admin: true }
    });
    if (!isEmpty(result)) {
      yield put({
        type: actionTypes.SET_ADMIN_TOKEN,
        payload: result.data.attributes.authorizationToken
      });
      yield put({
        type: actionTypes.SET_PRIVILEGE,
        payload: 'admin'
      });
    } else {
      yield put({
        type: ProviderActions.LOGIN_WITH_PROVIDER,
        payload: {}
      });
    }
  } catch (e) {
    // toastr.error('Error', e.message);
    yield put({
      type: ProviderActions.LOGIN_WITH_PROVIDER,
      payload: {}
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

export default function* AuthSaga() {
  yield takeEvery(actionTypes.AUTH_LOGIN, loginRequest);
  yield takeEvery(actionTypes.AUTH_SIGNUP, signupRequest);
  yield takeEvery(actionTypes.GET_USER_PERMISSION, userPermissionRequest);
  yield takeEvery(actionTypes.AUTH_LOGOUT, logoutRequest);
}
