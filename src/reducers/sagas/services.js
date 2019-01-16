import { put, takeEvery, call, select } from 'redux-saga/effects';
import { get, isEmpty } from 'lodash';

import { actions } from '../services';
import { getServiceClient } from './sagaSelectors';

function* createRequest(action) {
  const { resolve, reject } = action.meta;
  try {
    const serviceClient = yield select(getServiceClient);
    yield call(serviceClient.create, action.payload);
    yield put({
      type: actions.fetchServices
    });
    if (resolve) resolve('success');
  } catch(e) {
    if (reject) reject(e);
  }
}

function* fetchRequest(action) {
  const serviceClient = yield select(getServiceClient);
  const page = action.payload;
  const result = yield call(serviceClient.list, page);
  const services = get(result, 'data', []);
  const { perPage, total } = result;
  yield put({
    type: actions.setServices,
    payload: {
      services: services.map(service => ({
        id: service.id,
        ...service.attributes
      })),
      perPage,
      total
    }
  });
}

function* deleteRequest(action) {
  const serviceClient = yield select(getServiceClient);
  yield call(serviceClient.delete, action.payload);
}

function* updateRequest(action) {
  const { resolve, reject } = action.meta;
  try {
    const serviceClient = yield select(getServiceClient);
    const { id, data } = action.payload;
    yield call(serviceClient.update, id, data);
    yield put({
      type: actions.fetchServices
    });
    if (resolve) resolve('success');
  } catch(e) {
    if (reject) reject(e);
  }
}

function* filterRequest(action) {
  const serviceClient = yield select(getServiceClient);
  const { payload: keyword } = action;
  if (isEmpty(keyword)) {
    const result = yield call(serviceClient.list);
    const services = get(result, 'data', []);
    yield put({
      type: actions.setFilteredServices,
      payload: services.map(service => ({
        id: service.id,
        ...service.attributes
      }))
    });
  } else {
    const result = yield call(
      serviceClient.list,
      0,
      `?service[name]=${keyword}`
    );
    const services = get(result, 'data', [])
    yield put({
      type: actions.setFilteredServices,
      payload: services.map(service => ({
        id: service.id,
        ...service.attributes
      }))
    });
  }
}

function* fetchOneRequest(action) {
  const serviceClient = yield select(getServiceClient);
  const { id, callback } = action.payload
  const { data: service } = yield call(serviceClient.read, id);
  yield call(callback, service)
}

export default function* Profile() {
  yield takeEvery(actions.createServices, createRequest);
  yield takeEvery(actions.fetchServices, fetchRequest);
  yield takeEvery(actions.deleteServices, deleteRequest);
  yield takeEvery(actions.updateServices, updateRequest);
  yield takeEvery(actions.filterServices, filterRequest);
  yield takeEvery(actions.fetchOne, fetchOneRequest);
}
