import { put, takeEvery, call, select } from 'redux-saga/effects';
import { get, findIndex, isEmpty } from 'lodash';

import { actions } from '../users';
import { getUsers, getUserClient } from './sagaSelectors';

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

function* createRequest(action) {
  const userClient = yield select(getUserClient);
  yield call(userClient.create, action.payload);
  yield put({
    type: actions.fetchUsers
  });
}

function* fetchRequest(action) {
  const userClient = yield select(getUserClient);
  const result = yield call(userClient.list);
  const users = get(result, 'data', []);
  yield put({
    type: actions.setUsers,
    payload: users.map(user => ({
      id: user.id,
      ...user.attributes
    }))
  });
}

function* fetchOneRequest(action) {
  const userClient = yield select(getUserClient);
  const currentUserList = yield select(getUsers);
  const idx = findIndex(currentUserList, info => info.id === action.payload);
  if (idx === -1) {
    const { data: user } = yield call(userClient.read, action.payload);
    yield put({
      type: actions.setUser,
      payload: {
        id: user.id,
        ...user.attributes
      }
    });
  }
}

function* deleteRequest(action) {
  const userClient = yield select(getUserClient);
  yield call(userClient.delete, action.payload);
}

function* updateRequest(action) {
  const userClient = yield select(getUserClient);
  const { id, data } = action.payload;
  yield call(userClient.update, id, data);
  yield put({
    type: actions.fetchUsers
  });
}

function* filterRequest(action) {
  const userClient = yield select(getUserClient);
  const { payload: keyword } = action;
  if (isEmpty(keyword)) {
    const result = yield call(userClient.list);
    const users = get(result, 'data', []);
    yield put({
      type: actions.setFilteredUsers,
      payload: users.map(user => ({
        id: user.id,
        ...user.attributes
      }))
    });
  } else {
    const firstFilter = yield call(
      userClient.list,
      0,
      `?user[first_name]=${keyword}`
    );
    const secondFilter = yield call(
      userClient.list,
      0,
      `?user[last_name]=${keyword}`
    );
    const result = mergeResults(
      get(firstFilter, 'data', []),
      get(secondFilter, 'data', [])
    );
    yield put({
      type: actions.setFilteredUsers,
      payload: result.map(user => ({
        id: user.id,
        ...user.attributes
      }))
    });
  }
}

export default function* UserSaga() {
  yield takeEvery(actions.createUsers, createRequest);
  yield takeEvery(actions.fetchUsers, fetchRequest);
  yield takeEvery(actions.fetchUser, fetchOneRequest);
  yield takeEvery(actions.deleteUsers, deleteRequest);
  yield takeEvery(actions.updateUsers, updateRequest);
  yield takeEvery(actions.filterUsers, filterRequest);
}
