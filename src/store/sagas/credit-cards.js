import { put, takeEvery, call, select } from 'redux-saga/effects';
import { get, sortBy } from 'lodash';

import { getCreditCardClient } from './sagaSelectors';
import { createSpreedlyClient } from 'api';
import { actionTypes } from '../actions/credit-cards';

function* getCreditCards(action) {
  const creditCardClient = yield select(getCreditCardClient);
  const { params, success, error } = action.payload;
  try {
    const result = yield call(creditCardClient.list, params);
    const creditCards = sortBy(get(result, 'data', []), 'id');
    yield put({
      type: actionTypes.GET_CREDIT_CARDS_SUCCESS,
      payload: creditCards
    });
    if (success) {
      yield call(success);
    }
  } catch (e) {
    yield put({ type: actionTypes.GET_CREDIT_CARDS_FAILURE, payload: e });
    if (error) {
      yield call(error, e);
    }
  }
}

function* createCreditCard(action) {
  const { data, success, error } = action.payload;
  const { card_number, cvv, year, month, first_name, last_name } = data;
  const spreedlyClient = createSpreedlyClient();
  const creditCardClient = yield select(getCreditCardClient);
  try {
    const result = yield call(spreedlyClient.post, '', {
      payment_method: {
        credit_card: {
          first_name,
          last_name,
          number: card_number,
          verification_value: cvv,
          month: parseInt(month),
          year: parseInt(year)
        },
      }
    });
    const {
      transaction: {
        paymentMethod: {
          cardType: name,
          month: expiration_month,
          year: expiration_year,
          token: response,
          lastFourDigits: last4
        }
      }
    } = result;
    const { user_id, child_account_id } = data;
    const passData = user_id ? {
      user_id,
      name,
      expiration_month,
      expiration_year,
      response,
      last4,
      is_default: false
    }: child_account_id ? {
      child_account_id,
      name,
      expiration_month,
      expiration_year,
      response,
      last4,
      is_default: false
    }: {
      name,
      expiration_month,
      expiration_year,
      response,
      last4,
      is_default: false
    };
    yield call(creditCardClient.create, { credit_card: passData });
    yield put({
      type: actionTypes.CREATE_CREDIT_CARD_SUCCESS,
    });
    if (success) {
      yield call(success);
    }
  } catch (e) {
    yield put({ type: actionTypes.CREATE_CREDIT_CARD_FAILURE, payload: e });
    if (error) {
      yield call(error, e);
    }
  }
}

function* deleteCreditCard(action) {
  const { creditCardId, success, error } = action.payload;
  const creditCardClient = yield select(getCreditCardClient);
  try {
    yield call(creditCardClient.delete, creditCardId);
    yield put({
      type: actionTypes.DELETE_CREDIT_CARD_SUCCESS
    });
    if (success) {
      yield call(success);
    }
  } catch (e) {
    yield put({ type: actionTypes.DELETE_CREDIT_CARD_FAILURE, payload: e });
    if (error) {
      yield call(error, e);
    }
  }
}

function* updateCreditCard(action) {
  const { creditCardId, data, success, error } = action.payload;
  const creditCardClient = yield select(getCreditCardClient);
  try {
    yield call(creditCardClient.update, creditCardId, data);
    yield put({
      type: actionTypes.UPDATE_CREDIT_CARD_SUCCESS
    });
    if (success) {
      yield call(success);
    }
  } catch (e) {
    yield put({ type: actionTypes.UPDATE_CREDIT_CARD_FAILURE, payload: e });
    if (error) {
      yield call(error, e);
    }
  }
}

export default function* CreditCardSaga() {
  yield takeEvery(actionTypes.GET_CREDIT_CARDS, getCreditCards);
  yield takeEvery(actionTypes.CREATE_CREDIT_CARD, createCreditCard);
  yield takeEvery(actionTypes.DELETE_CREDIT_CARD, deleteCreditCard);
  yield takeEvery(actionTypes.UPDATE_CREDIT_CARD, updateCreditCard);
}
