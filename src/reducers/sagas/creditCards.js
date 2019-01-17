import { put, takeEvery, call, select } from 'redux-saga/effects';
import { get, isEmpty, sortBy } from 'lodash';

import { actions } from '../creditCards';
import { getCreditCardClient } from './sagaSelectors';
import { createSpreedlyClient } from 'api';

function* createRequest(action) {
  const { data, callback } = action.payload
  const { cardNumber, country, cvv, year, month, firstName, lastName } = data;
  const spreedlyClient = createSpreedlyClient();
  const creditCardClient = yield select(getCreditCardClient);
  const result = yield call(spreedlyClient.post, '', {
    paymentMethod: {
      creditCard: {
        firstName,
        lastName,
        number: cardNumber,
        verificationValue: cvv,
        month: parseInt(month),
        year: parseInt(year) + 2000,
        country,
      },
    }
  })
  if (result.error) {
    yield put({ type: actions.setError })
  } else {
    const {
      transaction: {
        paymentMethod: {
          cardType: name,
          month: expirationMonth,
          year: expirationYear,
          token: response,
          lastFourDigits: last4,
        }
      }
    } = result;
    const { userId } = data;
    const passData = userId ? {
      userId,
      name,
      expirationMonth,
      expirationYear,
      response,
      last4,
      isDefault: false,
    }: {
      name,
      expirationMonth,
      expirationYear,
      response,
      last4,
      isDefault: false,
    }
    yield call(creditCardClient.create, { creditCard: passData });
    yield put({ type: actions.resetError })
    if (callback) {
      yield call(callback)
    }
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
