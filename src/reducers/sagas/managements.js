import { put, takeEvery, call, select } from 'redux-saga/effects';
import { get } from 'lodash';

import { actions } from '../management';
import { getManagementClient } from './sagaSelectors';

function* createRequest(action) {
  const serviceClient = yield select(getManagementClient);
  yield call(serviceClient.create, action.payload);
  yield put({
    type: actions.fetchManagements
  });
}

function* fetchRequest(action) {
  const serviceClient = yield select(getManagementClient);
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
  const serviceClient = yield select(getManagementClient);
  yield call(serviceClient.delete, action.payload);
}

function* updateRequest(action) {
  const serviceClient = yield select(getManagementClient);
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
