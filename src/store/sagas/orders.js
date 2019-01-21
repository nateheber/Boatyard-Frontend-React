import { put, takeEvery, call, select } from 'redux-saga/effects';
import { get } from 'lodash';

import { actionTypes } from '../actions/orders';
import { getOrderClient } from './sagaSelectors';

function* getOrders(action) {
  const orderClient = yield select(getOrderClient);
  let successType = actionTypes.GET_ORDERS_SUCCESS;
  let failureType = actionTypes.GET_ORDERS_FAILURE;
  try {
    const result = yield call(orderClient.list, action.payload);
    const orders = get(result, 'data', []);
    const included = get(result, 'included', []);
    const { perPage, total } = result;
    switch (action.type) {
      case actionTypes.GET_NEW_ORDERS: {
        successType = actionTypes.GET_NEW_ORDERS_SUCCESS;
        failureType = actionTypes.GET_NEW_ORDERS_FAILURE;
        break;
      }
      case actionTypes.GET_SCHEDULED_ORDERS: {
        successType = actionTypes.GET_SCHEDULED_ORDERS_SUCCESS;
        failureType = actionTypes.GET_SCHEDULED_ORDERS_FAILURE;
        break;
      }
      case actionTypes.GET_ASSIGNED_ORDERS: {
        successType = actionTypes.GET_ASSIGNED_ORDERS_SUCCESS;
        failureType = actionTypes.GET_ASSIGNED_ORDERS_FAILURE;
        break;
      }
      case actionTypes.GET_OPEN_ORDERS: {
        successType = actionTypes.GET_OPEN_ORDERS_SUCCESS;
        failureType = actionTypes.GET_OPEN_ORDERS_FAILURE;
        break;
      }
      default: {
        successType = actionTypes.GET_ORDERS_SUCCESS;
        failureType = actionTypes.GET_ORDERS_FAILURE;

      }
    }
    yield put({
      type: successType,
      payload: {
        orders: orders.map(order => ({
          id: order.id,
          ...order.attributes,
          relationships: order.relationships,
        })),
        included,
        perPage,
        total,
      }
    });
  } catch (e) {
    yield put({ type: failureType, message: e.message });
  }

}

function* getOrder(action) {
  const orderClient = yield select(getOrderClient);
  const { orderId } = action.payload;
  try {
    const result = yield call(orderClient.read, orderId);
    yield put({
      type: actionTypes.GET_ORDER_SUCCESS,
      payload: result
    });  
  } catch (e) {
    yield put({ type: actionTypes.GET_ORDER_FAILURE, message: e.message });
  }
}

function* createOrder(action) {
  const orderClient = yield select(getOrderClient);
  const { data } = action.payload;
  try {
    yield call(orderClient.create, data);
    yield put({ type: actionTypes.CREATE_ORDER_SUCCESS });
  
  } catch (e) {
    yield put({ type: actionTypes.CREATE_ORDER_FAILURE, message: e.message });
  }
}

function* updateOrder(action) {
  const orderClient = yield select(getOrderClient);
  const { id, data } = action.payload;
  try {
    yield call(orderClient.update, id, data);
    yield put({ type: actionTypes.UPDATE_ORDER_SUCCESS });
  } catch (e) {
    yield put({ type: actionTypes.UPDATE_ORDER_FAILURE, message: e.message });
  }
}

function* deleteOrder(action) {
  const orderClient = yield select(getOrderClient);
  const { orderId } = action.payload;
  try {
    yield call(orderClient.delete, orderId);
    yield put({ type: actionTypes.DELETE_ORDER_SUCCESS });
    } catch (e) {
    yield put({ type: actionTypes.DELETE_ORDER_FAILURE, message: e.message });
  }
}

export default function* Profile() {
  yield takeEvery(actionTypes.GET_ORDERS, getOrders);
  yield takeEvery(actionTypes.GET_NEW_ORDERS, getOrders);
  yield takeEvery(actionTypes.GET_SCHEDULED_ORDERS, getOrders);
  yield takeEvery(actionTypes.GET_ASSIGNED_ORDERS, getOrders);
  yield takeEvery(actionTypes.GET_OPEN_ORDERS, getOrders);
  yield takeEvery(actionTypes.GET_ORDER, getOrder);
  yield takeEvery(actionTypes.CREATE_ORDER, createOrder);
  yield takeEvery(actionTypes.UPDATE_ORDER, updateOrder);
  yield takeEvery(actionTypes.DELETE_ORDER, deleteOrder);
}
