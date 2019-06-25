import { put, takeEvery, call, select } from 'redux-saga/effects';
import { get } from 'lodash';
import { profileSelector } from '../selectors/profile';
import { actionTypes } from '../actions/auth';
import { actions as ProfileActions } from '../reducers/profile';

import { login, signup, sendResetRequest, resetPassword, createPassword, createCustomerPassword } from '../../api/auth';

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
    const res = yield call(escalationClient.get, '/users/escalations?per_page=100');
    let result = {};
    if (res.isBoatyardAdmin) {
      result = yield call(escalationClient.post, '/users/escalations', {
        escalation: { admin: true }
      });
      yield put({
        type: actionTypes.GET_USER_PERMISSION_SUCCESS,
        payload: result.data.attributes.authorizationToken
      });
      yield put({
        type: actionTypes.SET_PRIVILEGE,
        payload: {privilege: 'admin', isLocationAdmin: false}
      });
      yield put({ type: actionTypes.LOGIN_WITH_PROVIDER_SUCCESS, payload: get(result, 'data') });
    } else if (res.data.length > 0) {
      const profile = yield select(profileSelector);
      let provider_id = get(res.data[0], 'relationships.provider.data.id', undefined);
      let provider_location_id = (res.data[0], 'relationships.provider_location.data.id', undefined);
      provider_id = provider_id && parseInt(provider_id);
      provider_location_id = provider_location_id && parseInt(provider_location_id)
      result = yield call(escalationClient.post, '/users/escalations', {
        escalation: { user_id: parseInt(profile.id), provider_id, provider_location_id }
      });
      yield put({
        type: actionTypes.SET_PROVIDER_INFO,
        payload: get(result, 'data')
      });
      yield put({
        type: actionTypes.SET_PRIVILEGE,
        payload: {
          privilege: 'provider',
          isLocationAdmin: !!provider_location_id,
          // locationName
        }
      });
    } 
    if (success) {
      yield call(success);
    }
    
  } catch (e) {
    
    if (error) {
      yield call(error, e);
    }  
  }
}

function* signupRequest(action) {
  const { email, password } = action.payload;
  yield call(signup, email, password);
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

function* createInvitedUser(action) {
  const { token, password, success, error } = action.payload;
  try {
    const result = yield call(createPassword, token, password);
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
      type: actionTypes.CREATE_PASSWORD_SUCCESS,
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
    yield put({ type: actionTypes.CREATE_PASSWORD_FAILURE, payload: e });
    if (error) {
      yield call(error, e);
    }
  }
}


function* createInvitedCustomer(action) {
  const { token, password, success, error } = action.payload;
  try {
    const result = yield call(createCustomerPassword, token, password);
    const user = get(result, 'data');
    yield put({
      type: actionTypes.CREATE_CUSTOMER_PASSWORD_SUCCESS,
    });
    if (success) {
      yield call(success, user);
    }
  } catch (e) {
    yield put({ type: actionTypes.CREATE_CUSTOMER_PASSWORD_FAILURE, payload: e });
    if (error) {
      yield call(error, e);
    }
  }
}

function* setRefreshFlag(action) {
  const { flag, success, error } = action.payload;
  try {
    yield put({ type: actionTypes.SET_REFRESH_FLAG_SUCCESS, payload: flag });
    if (success) {
      yield call(success);
    }
  } catch (e) {
    yield put({ type: actionTypes.SET_REFRESH_FLAG_FAILURE, payload: e });
    if (error) {
      yield call(error, e);
    }
  }
}

export default function* AuthSaga() {
  yield takeEvery(actionTypes.AUTH_LOGIN, loginRequest);
  yield takeEvery(actionTypes.AUTH_SIGNUP, signupRequest);
  yield takeEvery(actionTypes.GET_USER_PERMISSION, userPermissionRequest);
  yield takeEvery(actionTypes.SEND_RESET_REQUEST, sendRequestToResetPassword);
  yield takeEvery(actionTypes.RESET_PASSWORD, changePassword);
  yield takeEvery(actionTypes.CREATE_PASSWORD, createInvitedUser);
  yield takeEvery(actionTypes.CREATE_CUSTOMER_PASSWORD, createInvitedCustomer);
  yield takeEvery(actionTypes.SET_REFRESH_FLAG, setRefreshFlag);
}
