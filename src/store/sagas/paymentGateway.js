import { put, takeEvery, call, select } from 'redux-saga/effects';
import { get, sortBy } from 'lodash';

import { getPaymentGatewayClient } from './sagaSelectors';
import { actionTypes } from '../actions/paymentGateway';

function* getPaymentGateways(action) {
  const gatewayClient = yield select(getPaymentGatewayClient);
  const { params, success, error } = action.payload;
  try {
    const result = yield call(gatewayClient.list, params);
    const gateways = sortBy(get(result, 'data', []), 'id');
    yield put({
      type: actionTypes.GET_PAYMENT_GATEWAYS_SUCCESS,
      payload: gateways
    });
    if (success) {
      yield call(success);
    }
  } catch (e) {
    yield put({ type: actionTypes.GET_PAYMENT_GATEWAYS_FAILURE, payload: e });
    if (error) {
      yield call(error);
    }
  }
}

function* createPaymentGateway(action) {
  const { data, success, error } = action.payload;
  const creditCardClient = yield select(getPaymentGatewayClient);
  try {
    yield call(creditCardClient.create, {
      paymentGateway: { ...data }
    });
    yield put({
      type: actionTypes.CREATE_PAYMENT_GATEWAY_SUCCESS
    });
    if (success) {
      yield call(success);
    }
  } catch (e) {
    yield put({ type: actionTypes.CREATE_PAYMENT_GATEWAY_FAILURE, payload: e });
    if (error) {
      yield call(error);
    }
  }
}

function* deletePaymentGateway(action) {
  const { gatewayId, success, error } = action.payload;
  const creditCardClient = yield select(getPaymentGatewayClient);
  try {
    yield call(creditCardClient.delete, gatewayId);
    yield put({
      type: actionTypes.DELETE_PAYMENT_GATEWAY_SUCCESS
    });
    if (success) {
      yield call(success);
    }
  } catch (e) {
    yield put({ type: actionTypes.DELETE_PAYMENT_GATEWAY_FAILURE, payload: e });
    if (error) {
      yield call(error);
    }
  }
}

export default function* PaymentGatewaySaga() {
  yield takeEvery(actionTypes.GET_PAYMENT_GATEWAYS, getPaymentGateways);
  yield takeEvery(actionTypes.CREATE_PAYMENT_GATEWAY, createPaymentGateway);
  yield takeEvery(actionTypes.DELETE_PAYMENT_GATEWAY, deletePaymentGateway);
}
