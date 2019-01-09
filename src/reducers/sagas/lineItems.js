import { put, takeEvery, call, select } from 'redux-saga/effects';
import { get } from 'lodash';

import { actions } from '../lineItems';
import { getCustomApiClient } from './sagaSelectors';

function* createRequest(action) {
  const lineItemClient = yield select(getCustomApiClient);
  const { orderId, data } = action.payload
  yield call(lineItemClient.post, `/orders/${orderId}/items/`, data)
  yield put({
    type: actions.fetchLineItems
  });
}

function* fetchRequest(action) {
  const lineItemClient = yield select(getCustomApiClient);
  const { payload: orderId } = action;
  const result = yield call(lineItemClient.get, `/orders/${orderId}/items/`);
  const lineItems = get(result, 'data', []);
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
  const { payload: { orderId, itemId } } = action;
  yield call(lineItemClient.delete, `/orders/${orderId}/items/${itemId}`);
  yield put({
    type: actions.fetchLineItems
  });
}

function* updateRequest(action) {
  const lineItemClient = yield select(getCustomApiClient);
  const { orderId, itemId, data } = action.payload;
  yield call(lineItemClient.patch, `/orders/${orderId}/items/${itemId}`, data);
  yield put({
    type: actions.fetchLineItems
  });
}

export default function* Profile() {
  yield takeEvery(actions.createLineItem, createRequest);
  yield takeEvery(actions.fetchLineItems, fetchRequest);
  yield takeEvery(actions.deleteLineItem, deleteRequest);
  yield takeEvery(actions.updateLineItem, updateRequest);
}
