import { put, takeEvery, call, select } from 'redux-saga/effects';
import { get, findIndex } from 'lodash';

import { actions } from '../users';
import { getUsers } from './sagaSelectors';

import { createUserClient } from '../../api';

const userClient = createUserClient('admin');

function* createRequest(action) {
  yield call(userClient.create, action.payload);
  yield put({
    type: actions.fetchUsers
  });
}

function* fetchRequest(action) {
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
  yield call(userClient.delete, action.payload);
}

function* updateRequest(action) {
  const { id, data } = action.payload;
  yield call(userClient.update, id, data);
  yield put({
    type: actions.fetchUsers
  });
}

export default function* UserSaga() {
  yield takeEvery(actions.createUsers, createRequest);
  yield takeEvery(actions.fetchUsers, fetchRequest);
  yield takeEvery(actions.fetchUser, fetchOneRequest);
  yield takeEvery(actions.deleteUsers, deleteRequest);
  yield takeEvery(actions.updateUsers, updateRequest);
}
