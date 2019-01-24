import { put, takeEvery, call, select } from 'redux-saga/effects';
import { get, isEmpty, hasIn } from 'lodash';
import { actions as toastrActions } from 'react-redux-toastr';

import { actions } from '../reducers/payments';
import { getPaymentClient } from './sagaSelectors';

function* createRequest(action) {
  const { data, callback } = action.payload
  const paymentClient = yield select(getPaymentClient)
  const result = yield call(paymentClient.create, { payment: data })
  if (hasIn(result, 'error')) {
    if (result.error.message === "undefined method `default_payment_gateway' for nil:NilClass") {
      const errorAction = toastrActions.add({
        type: 'error',
        title: 'Payment is not successful',
        message: 'Payment Gateway is not set for this provider',
        position: 'top-right',
        timeout: 4000,
      })
      yield put(toastrActions.clean())
      yield put(errorAction)
    } else {
      const errorAction = toastrActions.add({
        type: 'error',
        title: 'Payment is not successful',
        message: 'Payment failed due to unknown error',
        position: 'top-right',
        timeout: 4000,
      })
      yield put(toastrActions.clean())
      yield put(errorAction)
    }
  }

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
