import { put, takeEvery, call, select } from 'redux-saga/effects';
import { get } from 'lodash';

import { actionTypes } from '../actions/users';
import { getUserClient, getExternalConnectionsClient } from './sagaSelectors';
import { refineUsers } from 'utils/users';

function* getExternalConnections(action) {
  const externalClient = yield select(getExternalConnectionsClient);
  const { params, success, error } = action.payload;

  try {
    const result = yield call(externalClient.list, params);
    let customers = (result.marineMaxCustomerInformation || {}).customerInformation || [];
    if (!Array.isArray(customers)) {
      customers = [customers];
    }
    if (success) {
      yield call(success, customers);
    }
  } catch (e) {
    if (error) {
      yield call(error, e);
    }
  }
}

function* getUsers(action) {
  const userClient = yield select(getUserClient);
  let successType = actionTypes.GET_USERS_SUCCESS;
  let failureType = actionTypes.GET_USERS_FAILURE;
  const { params, success, error } = action.payload;
  try {
    const result = yield call(userClient.list, params);
    const users = get(result, 'data', []);
    const { perPage, total } = result;
    switch (action.type) {
      case actionTypes.FILTER_USERS: {
        successType = actionTypes.FILTER_USERS_SUCCESS;
        failureType = actionTypes.FILTER_USERS_FAILURE;
        break;
      }
      default:
    }
    const refinedUsers = refineUsers(users);
    yield put({
      type: successType,
      payload: {
        users: refinedUsers,
        perPage,
        total,
      }
    });
    if (success) {
      yield call(success, refinedUsers);
    }
  } catch (e) {
    yield put({ type: failureType, payload: e });
    if (error) {
      yield call(error, e);
    }
  }
}

function* getUser(action) {
  const userClient = yield select(getUserClient);
  const { userId, success, error } = action.payload;
  try {
    const result = yield call(userClient.read, userId);
    const { data } = result;
    const payload = {
      id: data.id,
      type: data.type,
      ...data.attributes,
      ...data.relationships
    };
    yield put({
      type: actionTypes.GET_USER_SUCCESS,
      payload
    });
    if (success) {
      yield call(success, payload);
    }
  } catch (e) {
    yield put({ type: actionTypes.GET_USER_FAILURE, payload: e });
    if (error) {
      yield call(error, e);
    }
  }
}

function* createUser(action) {
  const userClient = yield select(getUserClient);
  const { data, success, error } = action.payload;
  try {
    const result = yield call(userClient.create, data);
    const user = get(result, 'data');
    const payload = {
      id: user.id,
      type: user.type,
      ...user.attributes,
      ...user.relationships
    };
    yield put({
      type: actionTypes.CREATE_USER_SUCCESS,
      payload
    });
    if (success) {
      yield call(success, payload);
    }
  } catch (e) {
    yield put({ type: actionTypes.CREATE_USER_FAILURE, payload: e });
    if (error) {
      yield call(error, e);
    }
  }
}

function* updateUser(action) {
  const userClient = yield select(getUserClient);
  const { userId, data, success, error } = action.payload;
  try {
    const result = yield call(userClient.update, userId, data);
    const user = get(result, 'data');
    const payload = {
      id: user.id,
      type: user.type,
      ...user.attributes,
      ...user.relationships
    };

    yield put({
      type: actionTypes.UPDATE_USER_SUCCESS,
      payload
    });
    if (success) {
      yield call(success, payload);
    }
  } catch (e) {
    yield put({ type: actionTypes.UPDATE_USER_FAILURE, payload: e });
    if (error) {
      yield call(error, e);
    }
  }
}

function* deleteUser(action) {
  const userClient = yield select(getUserClient);
  const { userId, success, error } = action.payload;
  try {
    yield call(userClient.delete, userId);
    yield put({
      type: actionTypes.DELETE_USER_SUCCESS,
    });
    if (success) {
      yield call(success);
    }
  } catch (e) {
    yield put({ type: actionTypes.DELETE_USER_FAILURE, payload: e });
    if (error) {
      yield call(error, e);
    }
  }
}

export default function* UserSaga() {
  yield takeEvery(actionTypes.GET_USERS, getUsers);
  yield takeEvery(actionTypes.FILTER_USERS, getUsers);
  yield takeEvery(actionTypes.GET_USER, getUser);
  yield takeEvery(actionTypes.CREATE_USER, createUser);
  yield takeEvery(actionTypes.UPDATE_USER, updateUser);
  yield takeEvery(actionTypes.DELETE_USER, deleteUser);
  yield takeEvery(actionTypes.FILTER_EXTERNAL_CUSTOMERS, getExternalConnections);
}
