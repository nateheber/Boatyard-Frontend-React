import { put, takeEvery, call, select } from 'redux-saga/effects';
import { get, sortBy } from 'lodash';

import { getCreditCardClient } from './sagaSelectors';
import { createSpreedlyClient } from 'api';
import { actionTypes } from '../actions/credit-cards';

function* getCreditCards(action) {
  const creditCardClient = yield select(getCreditCardClient);
  const { params, success, error } = action.payload;
  let result = null;
  try {
    result = yield call(creditCardClient.list, params);
    const creditCards = sortBy(get(result, 'data', []), 'id');
    yield put({
      type: actionTypes.GET_CREDIT_CARDS_SUCCESS,
      payload: creditCards
    });
    if (success) {
      yield call(success);
    }  
  } catch (e) {
    yield put({ type: actionTypes.GET_CREDIT_CARDS_FAILURE, payload: get(result, 'errors', []) });
    if (error) {
      yield call(error);
    }  
  }
}

function* createCreditCard(action) {
  const { data, success, error } = action.payload;
  const { cardNumber, cvv, year, month, firstName, lastName } = data;
  const spreedlyClient = createSpreedlyClient();
  const creditCardClient = yield select(getCreditCardClient);
  let result = null;
  try {
    result = yield call(spreedlyClient.post, '', {
      paymentMethod: {
        creditCard: {
          firstName,
          lastName,
          number: cardNumber,
          verificationValue: cvv,
          month: parseInt(month),
          year: parseInt(year)
        },
      }
    });
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
    };
    yield call(creditCardClient.create, { creditCard: passData });
    yield put({
      type: actionTypes.CREATE_CREDIT_CARD_SUCCESS,
    });
    if (success) {
      yield call(success);
    }  
  } catch (e) {
    yield put({ type: actionTypes.CREATE_CREDIT_CARD_FAILURE, payload: get(result, 'errors', []) });
    if (error) {
      yield call(error);
    }
  }
}

function* deleteCreditCard(action) {
  const { creditCardId, success, error } = action.payload;
  const creditCardClient = yield select(getCreditCardClient);
  let result = null;
  try {
    result = yield call(creditCardClient.delete, creditCardId);
    yield put({
      type: actionTypes.DELETE_CREDIT_CARD_SUCCESS
    });
    if (success) {
      yield call(success);
    }
  } catch (e) {
    yield put({ type: actionTypes.DELETE_CREDIT_CARD_FAILURE, payload: get(result, 'errors', []) });
    if (error) {
      yield call(error);
    }
  }
}

function* updateCreditCard(action) {
  const { creditCardId, data, success, error } = action.payload;
  const creditCardClient = yield select(getCreditCardClient);
  let result = null;
  try {
    result = yield call(creditCardClient.update, creditCardId, data);
    yield put({
      type: actionTypes.UPDATE_CREDIT_CARD_SUCCESS
    });
    if (success) {
      yield call(success);
    }
  } catch (e) {
    yield put({ type: actionTypes.UPDATE_CREDIT_CARD_FAILURE, payload: get(result, 'errors', []) });
    if (error) {
      yield call(error);
    }
  }
}

export default function* Profile() {
  yield takeEvery(actionTypes.GET_CREDIT_CARDS, getCreditCards);
  yield takeEvery(actionTypes.CREATE_CREDIT_CARD, createCreditCard);
  yield takeEvery(actionTypes.DELETE_CREDIT_CARD, deleteCreditCard);
  yield takeEvery(actionTypes.UPDATE_CREDIT_CARD, updateCreditCard);
}
