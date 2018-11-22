import { put, takeEvery, call } from 'redux-saga/effects';
import { get } from 'lodash';

import { actions } from '../users';

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
    payload: users.map(service => ({
      id: service.id,
      ...service.attributes
    }))
  });
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
  yield takeEvery(actions.deleteUsers, deleteRequest);
  yield takeEvery(actions.updateUsers, updateRequest);
}
