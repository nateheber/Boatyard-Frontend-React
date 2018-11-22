import { put, takeEvery, call } from 'redux-saga/effects';
import { get } from 'lodash';

import { actions } from '../services';

import { createServiceClient } from '../../api';

const serviceClient = createServiceClient('admin');

function* createRequest(action) {
  yield call(serviceClient.create, action.payload);
  yield put({
    type: actions.fetchServices
  });
}

function* fetchRequest(action) {
  const result = yield call(serviceClient.list);
  const services = get(result, 'data', []);
  yield put({
    type: actions.setServices,
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
    type: actions.fetchServices
  });
}

export default function* Profile() {
  yield takeEvery(actions.createServices, createRequest);
  yield takeEvery(actions.fetchServices, fetchRequest);
  yield takeEvery(actions.deleteServices, deleteRequest);
  yield takeEvery(actions.updateServices, updateRequest);
}
