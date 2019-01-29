import { put, takeEvery, call, select } from 'redux-saga/effects';
import { get } from 'lodash';

import { actionTypes } from '../actions/users';
import { getUserClient } from './sagaSelectors';

const refineUsers = (users) => {
  return users.map(user => {
    return {
      id: user.id,
      ...user.attributes
    };
  });
};

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
      yield call(error);
    }
  }
}

function* getUser(action) {
  const userClient = yield select(getUserClient);
  const { userId, success, error } = action.payload;
  try {
    const result = yield call(userClient.read, userId);
    const { data: user } = result;
    yield put({
      type: actionTypes.GET_USER_SUCCESS,
      payload: user
    });
    if (success) {
      yield call(success);
    }
  } catch (e) {
    yield put({ type: actionTypes.GET_USER_FAILURE, payload: e });
    if (error) {
      yield call(error);
    }
  }
}

function* createUser(action) {
  const userClient = yield select(getUserClient);
  const { data, success, error } = action.payload;
  try {
    const result = yield call(userClient.create, data);
    yield put({
      type: actionTypes.CREATE_USER_SUCCESS,
    });
    if (success) {
      yield call(success, get(result, 'data', {}));
    }
  } catch (e) {
    yield put({ type: actionTypes.CREATE_USER_FAILURE, payload: e });
    if (error) {
      yield call(error);
    }
  }
}

function* updateUser(action) {
  const userClient = yield select(getUserClient);
  const { userId, data, success, error } = action.payload;
  try {
    yield call(userClient.update, userId, data);
    yield put({
      type: actionTypes.UPDATE_USER_SUCCESS,
    });
    if (success) {
      yield call(success);
    }
  } catch (e) {
    yield put({ type: actionTypes.UPDATE_USER_FAILURE, payload: e });
    if (error) {
      yield call(error);
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
      yield call(error);
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
}
