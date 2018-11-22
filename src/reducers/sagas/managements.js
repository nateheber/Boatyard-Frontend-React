import { put, takeEvery, call } from 'redux-saga/effects';
import { get } from 'lodash';

import { actions } from '../management';

import { createManagementClient } from '../../api';

const serviceClient = createManagementClient('admin');

function* createRequest(action) {
  yield call(serviceClient.create, action.payload);
  yield put({
    type: actions.fetchManagements
  });
}

function* fetchRequest(action) {
  const result = yield call(serviceClient.list);
  const services = get(result, 'data', []);
  yield put({
    type: actions.setManagements,
    payload: services.map(service => ({
      id: service.id,
      ...service.attributes
    }))
  });
}

function* deleteRequest(action) {
  yield call(serviceClient.delete, action.payload);
}

function* updateRequest(action) {
  const { id, data } = action.payload;
  yield call(serviceClient.update, id, data);
  yield put({
    type: actions.fetchManagements
  });
}

export default function* Profile() {
  yield takeEvery(actions.createManagements, createRequest);
  yield takeEvery(actions.fetchManagements, fetchRequest);
  yield takeEvery(actions.deleteManagements, deleteRequest);
  yield takeEvery(actions.updateManagements, updateRequest);
}
