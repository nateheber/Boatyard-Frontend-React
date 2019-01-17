import { put, takeEvery, call, select } from 'redux-saga/effects';
import { get, isEmpty } from 'lodash';

import { actions } from '../payments';
import { getPaymentClient } from './sagaSelectors';

function* createRequest(action) {
  const { data, callback } = action.payload
  const paymentClient = yield select(getPaymentClient)
  yield call(paymentClient.create, data)
  if (callback) {
    yield call(callback)
  }
}

function* fetchRequest(action) {
  const userId = action.payload
  const paymentClient = yield select(getPaymentClient)
  const results = yield call(paymentClient.list, 1, isEmpty(userId) ? '' : `&payment[user_id]=${userId}`)
  const payments = get(results, 'data', [])
  const included = get(results, 'included', [])
  yield put({
    type: actions.setPayments,
    payload: {
      payments,
      included
    }
  })
}

function* deleteRequest(action) {
  const {paymentId, callback} = action.payload
  const paymentClient = yield select(getPaymentClient)
  yield call(paymentClient.delete, paymentId)
  if (callback) {
    yield call(callback)
  }
}

function* updateRequest(action) {
  const { paymentId, data, callback } = action.payload
  const paymentClient = yield select(getPaymentClient)
  yield call(paymentClient.patch, paymentId, data)
  if (callback) {
    yield call(callback)
  }
}

export default function* Profile() {
  yield takeEvery(actions.createPayment, createRequest);
  yield takeEvery(actions.fetchPayments, fetchRequest);
  yield takeEvery(actions.deletePayment, deleteRequest);
  yield takeEvery(actions.updatePayment, updateRequest);
}
