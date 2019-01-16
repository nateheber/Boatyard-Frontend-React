import { put, takeEvery, call, select } from 'redux-saga/effects';
import { get, isEmpty, sortBy } from 'lodash';

import { actions } from '../creditCards';
import { getCreditCardClient } from './sagaSelectors';

function* createRequest(action) {
  const { data, callback } = action.payload
  const creditCardClient = yield select(getCreditCardClient)
  yield call(creditCardClient.create, data)
  if (callback) {
    yield call(callback)
  }
}

function* fetchRequest(action) {
  const userId = action.payload
  const creditCardClient = yield select(getCreditCardClient)
  const results = yield call(creditCardClient.list, 1, isEmpty(userId) ? '' : `&creditCard[user_id]=${userId}`)
  const creditCards = sortBy(get(results, 'data', []), 'id')
  const included = get(results, 'included', [])
  yield put({
    type: actions.setCreditCards,
    payload: {
      creditCards,
      included
    }
  })
}

function* deleteRequest(action) {
  const {creditCardId, callback} = action.payload
  const creditCardClient = yield select(getCreditCardClient)
  yield call(creditCardClient.delete, creditCardId)
  if (callback) {
    yield call(callback)
  }
}

function* updateRequest(action) {
  const { creditCardId, data, callback } = action.payload
  const creditCardClient = yield select(getCreditCardClient)
  yield call(creditCardClient.update, creditCardId, data)
  if (callback) {
    yield call(callback)
  }
}

export default function* Profile() {
  yield takeEvery(actions.createCreditCard, createRequest);
  yield takeEvery(actions.fetchCreditCards, fetchRequest);
  yield takeEvery(actions.deleteCreditCard, deleteRequest);
  yield takeEvery(actions.updateCreditCard, updateRequest);
}
