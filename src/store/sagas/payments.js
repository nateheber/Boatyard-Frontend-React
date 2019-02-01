import { put, takeEvery, call, select } from 'redux-saga/effects';
import { get } from 'lodash';

import { actionTypes } from '../actions/payments';
import { getPaymentClient } from './sagaSelectors';

function* getPayments(action) {
  const paymentClient = yield select(getPaymentClient)
  const { params, success, error } = action.payload;
  try {
    const result = yield call(paymentClient.list, params);
    const payments = get(result, 'data', []);
    const { perPage, total } = result;
    yield put({
      type: actionTypes.GET_PAYMENTS_SUCCESS,
      payload: {
        payments,
        perPage,
        total,
      }
    });
    if (success) {
      yield call(success);
    }
  } catch (e) {
    yield put({ type: actionTypes.GET_PAYMENTS_FAILURE, payload: e });
    if (error) {
      yield call(error);
    }
  }
}

function* getPayment(action) {
  const { paymentId, success, error } = action.payload;
  const paymentClient = yield select(getPaymentClient);
  try {
    const result = yield call(paymentClient.read, paymentId);
    yield put({
      type: actionTypes.GET_PAYMENT_SUCCESS,
      payload: result
    });
    if (success) {
      yield call(success);
    }
  } catch (e) {
    yield put({ type: actionTypes.GET_PAYMENT_FAILURE, payload: e });
    if (error) {
      yield call(error);
    }
  }
}

function* createPayment(action) {
  const { data, success, error } = action.payload;
  const paymentClient = yield select(getPaymentClient);
  try {
    const result = yield call(paymentClient.create, data);
    yield put({
      type: actionTypes.CREATE_PAYMENT_SUCCESS,
      payload: result
    });
    if (success) {
      yield call(success);
    }
  } catch (e) {
    yield put({ type: actionTypes.CREATE_PAYMENT_FAILURE, payload: e });
    if (error) {
      yield call(error);
    }
  }
}

function* updatePayment(action) {
  const { paymentId, data, success, error } = action.payload;
  const paymentClient = yield select(getPaymentClient);
  try {
    const result = yield call(paymentClient.patch, paymentId, data);
    yield put({
      type: actionTypes.UPDATE_PAYMENT_SUCCESS,
      payload: result
    });
    if (success) {
      yield call(success);
    }
  } catch (e) {
    yield put({ type: actionTypes.UPDATE_PAYMENT_FAILURE, payload: e });
    if (error) {
      yield call(error);
    }
  }
}

function* deletePayment(action) {
  const { paymentId, success, error } = action.payload;
  const paymentClient = yield select(getPaymentClient);
  try {
    yield call(paymentClient.delete, paymentId);
    yield put({
      type: actionTypes.DELETE_PAYMENT_SUCCESS,
    });
    if (success) {
      yield call(success);
    }
  } catch (e) {
    yield put({ type: actionTypes.DELETE_PAYMENT_FAILURE, payload: e });
    if (error) {
      yield call(error);
    }
  }
}

export default function* Profile() {
  yield takeEvery(actionTypes.GET_PAYMENTS, getPayments);
  yield takeEvery(actionTypes.GET_PAYMENT, getPayment);
  yield takeEvery(actionTypes.CREATE_PAYMENT, createPayment);
  yield takeEvery(actionTypes.UPDATE_PAYMENT, updatePayment);
  yield takeEvery(actionTypes.DELETE_PAYMENT, deletePayment);
}
