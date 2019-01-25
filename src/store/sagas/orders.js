import { put, takeEvery, call, select } from 'redux-saga/effects';
import { get } from 'lodash';

import { actionTypes } from '../actions/orders';
import { getOrderClient } from './sagaSelectors';

function* getOrders(action) {
  const orderClient = yield select(getOrderClient);
  let successType = actionTypes.GET_ORDERS_SUCCESS;
  let failureType = actionTypes.GET_ORDERS_FAILURE;
  const { params, success, error } = action.payload;
  let result = null;
  try {
    result = yield call(orderClient.list, params);
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
      case actionTypes.GET_PAID_ORDERS: {
        successType = actionTypes.GET_PAID_ORDERS_SUCCESS;
        failureType = actionTypes.GET_PAID_ORDERS_FAILURE;
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
    if (success) {
      yield call(success);
    }  
  } catch (e) {
    yield put({ type: failureType, payload: result });
    if (error) {
      yield call(error);
    }
  }
}

function* getOrder(action) {
  const orderClient = yield select(getOrderClient);
  const { orderId, success, error } = action.payload;
  let result = null;
  try {
    result = yield call(orderClient.read, orderId);
    yield put({
      type: actionTypes.GET_ORDER_SUCCESS,
      payload: result
    });
    if (success) {
      yield call(success);
    }
  } catch (e) {
    yield put({ type: actionTypes.GET_ORDER_FAILURE, payload: result });
    if (error) {
      yield call(error);
    }
  }
}

function* createOrder(action) {
  const orderClient = yield select(getOrderClient);
  const { data, success, error } = action.payload;
  let result = null;
  try {
    result = yield call(orderClient.create, data);
    yield put({ type: actionTypes.CREATE_ORDER_SUCCESS });
    if (success) {
      yield call(success);
    }
  } catch (e) {
    yield put({ type: actionTypes.CREATE_ORDER_FAILURE, payload: result });
    if (error) {
      yield call(error);
    }
  }
}

function* updateOrder(action) {
  const orderClient = yield select(getOrderClient);
  const { orderId, data, success, error } = action.payload;
  let result = null;
  try {
    result = yield call(orderClient.update, orderId, data);
    yield put({ type: actionTypes.UPDATE_ORDER_SUCCESS });
    if (success) {
      yield call(success);
    }
  } catch (e) {
    yield put({ type: actionTypes.UPDATE_ORDER_FAILURE, payload: result });
    if (error) {
      yield call(error);
    }
  }
}

function* deleteOrder(action) {
  const orderClient = yield select(getOrderClient);
  const { orderId, success, error } = action.payload;
  let result = null;
  try {
    result = yield call(orderClient.delete, orderId);
    yield put({ type: actionTypes.DELETE_ORDER_SUCCESS });
    if (success) {
      yield call(success);
    }
  } catch (e) {
    yield put({ type: actionTypes.DELETE_ORDER_FAILURE, payload: result });
    if (error) {
      yield call(error);
    }
  }
}

export default function* OrderSaga() {
  yield takeEvery(actionTypes.GET_ORDERS, getOrders);
  yield takeEvery(actionTypes.GET_NEW_ORDERS, getOrders);
  yield takeEvery(actionTypes.GET_SCHEDULED_ORDERS, getOrders);
  yield takeEvery(actionTypes.GET_ASSIGNED_ORDERS, getOrders);
  yield takeEvery(actionTypes.GET_OPEN_ORDERS, getOrders);
  yield takeEvery(actionTypes.GET_PAID_ORDERS, getOrders);
  yield takeEvery(actionTypes.GET_ORDER, getOrder);
  yield takeEvery(actionTypes.CREATE_ORDER, createOrder);
  yield takeEvery(actionTypes.UPDATE_ORDER, updateOrder);
  yield takeEvery(actionTypes.DELETE_ORDER, deleteOrder);
}
