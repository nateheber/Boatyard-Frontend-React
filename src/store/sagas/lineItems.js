import { put, takeEvery, call, select } from 'redux-saga/effects';
import { get, sortBy } from 'lodash';

import { actions } from '../reducers/lineItems';
import { getCustomApiClient } from './sagaSelectors';

function* createRequest(action) {
  const lineItemClient = yield select(getCustomApiClient)
  const { orderId, data, callback } = action.payload
  yield call(lineItemClient.post, `/orders/${orderId}/items/`, {line_item: data})
  yield put({
    type: actions.fetchLineItems,
    payload: orderId
  });
  if (callback) {
    yield call(callback);
  }
}

function* createBatchRequest(action) {
  const lineItemClient = yield select(getCustomApiClient)
  const { orderId, data, callback } = action.payload
  for (let i = 0; i < data.length; i += 1) {
    yield call(lineItemClient.post, `/orders/${orderId}/items/`, {line_item: data[i]});
  }
  if (callback) {
    yield call(callback)
  }
}

function* fetchRequest(action) {
  const lineItemClient = yield select(getCustomApiClient);
  const { payload: orderId } = action;
  const result = yield call(lineItemClient.get, `/orders/${orderId}/items/`);
  const lineItems = sortBy(get(result, 'data', []), ['id']);
  yield put({
    type: actions.setLineItems,
    payload: lineItems.map(lineItem => ({
      id: lineItem.id,
      ...lineItem.attributes
    }))
  });
}

function* deleteRequest(action) {
  const lineItemClient = yield select(getCustomApiClient);
  const { payload: { orderId, itemId, callback } } = action;
  yield call(lineItemClient.delete, `/orders/${orderId}/items/${itemId}`);
  yield put({
    type: actions.fetchLineItems,
    payload: orderId
  });
  if (callback) {
    yield call(callback)
  }
}

function* updateRequest(action) {
  const lineItemClient = yield select(getCustomApiClient);
  const { orderId, itemId, data } = action.payload;
  yield call(lineItemClient.patch, `/orders/${orderId}/items/${itemId}`, {line_item: data});
  yield put({
    type: actions.fetchLineItems,
    payload: orderId
  });
}

function* updateBatchRequest(action) {
  const lineItemClient = yield select(getCustomApiClient);
  const { orderId, data, callback } = action.payload;
  for (let i = 0; i < data.length; i += 1) {
    const { id, lineItem } = data[i];
    yield call(lineItemClient.patch, `/orders/${orderId}/items/${id}`, { line_item: lineItem })
  }
  yield put({
    type: actions.fetchLineItems,
    payload: orderId,
  })
  if (callback) {
    yield call(callback)
  }
}

export default function* Profile() {
  yield takeEvery(actions.createLineItem, createRequest);
  yield takeEvery(actions.createLineItems, createBatchRequest);
  yield takeEvery(actions.fetchLineItems, fetchRequest);
  yield takeEvery(actions.deleteLineItem, deleteRequest);
  yield takeEvery(actions.updateLineItem, updateRequest);
  yield takeEvery(actions.updateLineItems, updateBatchRequest);
}
