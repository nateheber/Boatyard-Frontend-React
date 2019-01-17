import { put, takeEvery, call, select } from 'redux-saga/effects';
import { get } from 'lodash';

import { actions } from '../orders';
import { getOrderClient } from './sagaSelectors';

function* createRequest(action) {
  const orderClient = yield select(getOrderClient);
  const { data } = action.payload;
  yield call(orderClient.create, data);
  yield put({
    type: actions.fetchOrders
  });
}

function* fetchRequest(action) {
  const orderClient = yield select(getOrderClient);
  const page = action.payload;
  const result = yield call(orderClient.list, page);
  const orders = get(result, 'data', []);
  const { perPage, total } = result;
  yield put({
    type: actions.setOrders,
    payload: {
      orders: orders.map(order => ({
        id: order.id,
        ...order.attributes
      })),
      perPage,
      total,
    }
  });
}

function* getRequest(action) {
  const orderClient = yield select(getOrderClient);
  const { payload: orderId } = action;
  const result = yield call(orderClient.read, orderId);
  yield put({
    type: actions.setOrder,
    payload: result
  });
}

function* deleteRequest(action) {
  const orderClient = yield select(getOrderClient);
  yield call(orderClient.delete, action.payload);
}

function* updateRequest(action) {
  const orderClient = yield select(getOrderClient);
  const { id, data } = action.payload;
  yield call(orderClient.update, id, data);
  yield put({
    type: actions.fetchOrders
  });
}

export default function* Profile() {
  yield takeEvery(actions.createOrders, createRequest);
  yield takeEvery(actions.getOrder, getRequest);
  yield takeEvery(actions.fetchOrders, fetchRequest);
  yield takeEvery(actions.deleteOrders, deleteRequest);
  yield takeEvery(actions.updateOrders, updateRequest);
}
