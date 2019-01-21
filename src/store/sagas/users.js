import { put, takeEvery, call, select } from 'redux-saga/effects';
import { get, findIndex, isEmpty } from 'lodash';

import { actions } from '../reducers/users';
import { getUsersPageNumber, getUserClient } from './sagaSelectors';

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
  const page = yield select(getUsersPageNumber);
  const result = yield call(userClient.list, {page});
  const users = get(result, 'data', []);
  const { perPage, total } = result;
  yield put({
    type: actions.setUsers,
    payload: {
      users: users.map(user => ({
        id: user.id,
        ...user.attributes
      })),
      perPage,
      total,
    }
  });
}

function* fetchOneRequest(action) {
  const userClient = yield select(getUserClient);
  const { data: user } = yield call(userClient.read, action.payload);
  yield put({
    type: actions.setUser,
    payload: user
  });
}

function* deleteRequest(action) {
  const userClient = yield select(getUserClient);
  yield call(userClient.delete, action.payload);
}

function* updateRequest(action) {
  const userClient = yield select(getUserClient);
  const { id, data, callback } = action.payload;
  yield call(userClient.update, id, data);
  yield put({
    type: actions.fetchUsers
  });
  if (callback) {
    yield call(callback)
  }
}

function* filterRequest(action) {
  const userClient = yield select(getUserClient);
  const { payload: { keyword, resolve, reject } } = action;
  try {
    if (isEmpty(keyword)) {
      const result = yield call(userClient.list);
      const users = get(result, 'data', []);
      const parsedData = users.map(user => ({
        id: user.id,
        ...user.attributes
      }));
      yield put({
        type: actions.setFilteredUsers,
        payload: parsedData
      });
      if (resolve) {
        yield call(resolve, parsedData)
      }
    } else {
      const firstFilter = yield call(
        userClient.list,
        {
          page: 1,
          'user[first_name]': keyword,
        }
      );
      const secondFilter = yield call(
        userClient.list,
        {
          page: 1,
          'user[last_name]': keyword,
        }
      );
      const result = mergeResults(
        get(firstFilter, 'data', []),
        get(secondFilter, 'data', [])
      );
      const parsedData = result.map(user => ({
        id: user.id,
        ...user.attributes
      }))
      yield put({
        type: actions.setFilteredUsers,
        payload: parsedData
      });
      if (resolve) {
        yield call(resolve, parsedData)
      }
    }
  } catch(err) {
    if (reject) {
      yield call(reject, err)
    }
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
