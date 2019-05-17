import { put, takeEvery, call } from 'redux-saga/effects';

import { actionTypes } from '../actions/auth';
import { actions as ProfileActions } from '../reducers/profile';

import { login, signup, sendResetRequest, resetPassword } from '../../api/auth';

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
  const { success, error } = action.payload;
  try {
    const result = yield call(escalationClient.post, '/users/escalations', {
      escalation: { admin: true }
    });
    yield put({
      type: actionTypes.GET_USER_PERMISSION_SUCCESS,
      payload: result.data.attributes.authorizationToken
    });
    yield put({
      type: actionTypes.SET_PRIVILEGE,
      payload: 'admin'
    });
    if (success) {
      yield call(success);
    }  
  } catch (e) {
    yield put({ type: actionTypes.GET_USER_PERMISSION_FAILURE, payload: e });
    if (error) {
      yield call(error, e);
    }  
  }
}

function* signupRequest(action) {
  const { email, password } = action.payload;
  const result = yield call(signup, email, password);
  console.log(result);
}

function* sendRequestToResetPassword(action) {
  const { email, success, error } = action.payload;
  try {
    yield call(sendResetRequest, email);
    yield put({ type: actionTypes.SEND_RESET_REQUEST_SUCCESS });
    if (success) {
      yield call(success);
    }
  } catch (e) {
    yield put({ type: actionTypes.SEND_RESET_REQUEST_FAILURE, payload: e });
    if (error) {
      yield call(error, e);
    }
  }
}

function* changePassword(action) {
  const { token, password, success, error } = action.payload;
  try {
    yield call(resetPassword, token, password);
    yield put({ type: actionTypes.RESET_PASSWORD_SUCCESS });
    if (success) {
      yield call(success);
    }
  } catch (e) {
    yield put({ type: actionTypes.RESET_PASSWORD_FAILURE, payload: e });
    if (error) {
      yield call(error, e);
    }
  }
}

function* logoutRequest(action) {
  yield call(action.payload);
}

export default function* AuthSaga() {
  yield takeEvery(actionTypes.AUTH_LOGIN, loginRequest);
  yield takeEvery(actionTypes.AUTH_SIGNUP, signupRequest);
  yield takeEvery(actionTypes.GET_USER_PERMISSION, userPermissionRequest);
  yield takeEvery(actionTypes.SEND_RESET_REQUEST, sendRequestToResetPassword);
  yield takeEvery(actionTypes.RESET_PASSWORD, changePassword);
  yield takeEvery(actionTypes.AUTH_LOGOUT, logoutRequest);
}
