import { put, takeEvery, call, select } from 'redux-saga/effects';
import { get } from 'lodash';

import { actions } from '../services';
import { getServiceClient, getServicesPageNumber } from './sagaSelectors';

function* createRequest(action) {
  const serviceClient = yield select(getServiceClient);
  yield call(serviceClient.create, action.payload);
  yield put({
    type: actions.fetchServices
  });
}

function* fetchRequest(action) {
  const serviceClient = yield select(getServiceClient);
  const nextPage = yield select(getServicesPageNumber);
  const result = yield call(serviceClient.list, nextPage);
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
  const serviceClient = yield select(getServiceClient);
  yield call(serviceClient.delete, action.payload);
}

function* updateRequest(action) {
  const serviceClient = yield select(getServiceClient);
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
