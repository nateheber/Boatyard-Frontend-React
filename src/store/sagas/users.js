import { put, takeEvery, call, select } from 'redux-saga/effects';
import { get, findIndex, isEmpty } from 'lodash';

import { actionTypes } from '../actions/users';
import { getUserClient } from './sagaSelectors';

const mergeResults = (base, secondary) => {
  const result = [...base];
  for (let i = 0; i < secondary.length; i += 1) {
    const idx = findIndex(result, user => user.id === secondary[i].id);
    if (idx === -1) {
      result.push({
        ...secondary[i]
      });
    }
  }
  return result;
};

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
  const { params, success, error } = action.payload;
  const keyword = get(params, 'keyword', '');
  let result = null;
  try {
    if (isEmpty(keyword)) {
      result = yield call(userClient.list, params);
      }
    const users = get(result, 'data', []);
    const { perPage, total } = result;
    yield put({
      type: actionTypes.GET_USERS_SUCCESS,
      payload: {
        users: refineUsers(users),
        perPage,
        total,
      }
    });
    if (success) {
      yield call(success);
    }  
  } catch (e) {
    yield put({ type: actionTypes.GET_USERS_FAILURE, payload: result });
    if (error) {
      yield call(error);
    }  
  }
}

function* getUser(action) {
  const userClient = yield select(getUserClient);
  const { userId, success, error } = action.payload;
  let result = null;
  try {
    result = yield call(userClient.read, userId);
    const { data: user } = result;
    yield put({
      type: actionTypes.GET_USER_SUCCESS,
      payload: user
    });
    if (success) {
      yield call(success);
    }  
  } catch (e) {
    yield put({ type: actionTypes.GET_USER_FAILURE, payload: result });
    if (error) {
      yield call(error);
    }  
  }
}

function* createUser(action) {
  const userClient = yield select(getUserClient);
  const { data, success, error } = action.payload;
  let result = null;
  try {
    result = yield call(userClient.create, data);
    yield put({
      type: actionTypes.CREATE_USER_SUCCESS,
    });
    if (success) {
      yield call(success);
    }  
  } catch (e) {
    yield put({ type: actionTypes.CREATE_USER_FAILURE, payload: result });
    if (error) {
      yield call(error);
    }  
  }
}

function* updateUser(action) {
  const userClient = yield select(getUserClient);
  const { userId, data, success, error } = action.payload;
  let result = null;
  try {
    result = yield call(userClient.update, userId, data);
    yield put({
      type: actionTypes.UPDATE_USER_SUCCESS,
    });
    if (success) {
      yield call(success);
    }  
  } catch (e) {
    yield put({ type: actionTypes.UPDATE_USER_FAILURE, payload: result });
    if (error) {
      yield call(error);
    }  
  }
}

function* deleteUser(action) {
  const userClient = yield select(getUserClient);
  const { userId, success, error } = action.payload;
  let result = null;
  try {
    result = yield call(userClient.delete, userId);
    yield put({
      type: actionTypes.DELETE_USER_SUCCESS,
    });
    if (success) {
      yield call(success);
    }  
  } catch (e) {
    yield put({ type: actionTypes.DELETE_USER_FAILURE, payload: result });
    if (error) {
      yield call(error);
    }  
  }
}

function* filterUsers(action) {
  const userClient = yield select(getUserClient);
  const { keyword, success, error } = action.payload;
  let result = null;
  try {
    if (isEmpty(keyword)) {
      result = yield call(userClient.list);
      const users = refineUsers(get(result, 'data', []));
      yield put({
        type: actionTypes.FILTER_USERS_SUCCESS,
        payload: users
      });
      if (success) {
        yield call(success, users)
      }
    } else {
      result = yield call(
        userClient.list,
        {
          page: 1,
          'user[first_name]': keyword,
        }
      );
      const firstFiltered = get(result, 'data', []);
      result = yield call(
        userClient.list,
        {
          page: 1,
          'user[last_name]': keyword,
        }
      );
      const secondFiltered = get(result, 'data', []);
      const parsedData = refineUsers(mergeResults(
        firstFiltered,
        secondFiltered
      ));
      yield put({
        type: actionTypes.FILTER_USERS_SUCCESS,
        payload: parsedData
      });
      if (success) {
        yield call(success, parsedData);
      }
    }
  } catch(err) {
    yield put({ type: actionTypes.FILTER_USERS_FAILURE, payload: result });
    if (error) {
      yield call(error, err);
    }
  }
}

export default function* UserSaga() {
  yield takeEvery(actionTypes.GET_USERS, getUsers);
  yield takeEvery(actionTypes.FILTER_USERS, filterUsers);
  yield takeEvery(actionTypes.GET_USER, getUser);
  yield takeEvery(actionTypes.CREATE_USER, createUser);
  yield takeEvery(actionTypes.UPDATE_USER, updateUser);
  yield takeEvery(actionTypes.DELETE_USER, deleteUser);
}
